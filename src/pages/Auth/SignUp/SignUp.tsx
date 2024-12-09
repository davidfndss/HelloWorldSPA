import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { checkUsernameService, checkEmailService, signupService, ICreateUser } from "../../../services/user.services";
import { Loading } from "../../../components/Loading/Loading";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "./schemas/signup.schema";
import { ErrorSpan } from "../../../components/ErrorSpan/ErrorSpan";
import { debounce } from "lodash";
import Cookies from "js-cookie"

type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp: React.FC = () => {
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | "">("");
  const [usernameCheckLoading, setUsernameCheckLoading] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | "">("");
  const [emailCheckLoading, setEmailCheckLoading] = useState(false);
  const [nextPart, setNextPart] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false); // New state to track submission attempt

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, trigger } = useForm<Inputs>({ resolver: zodResolver(signupSchema) });
  const onSubmit: SubmitHandler<Inputs> = data => signupUser(data);

  const signupUser = async (data: ICreateUser) => {
    try {
      const response = await signupService(data)
      console.log(response)
      Cookies.set("atk", response.access_token, { expires: 1 }) // atk = access token // expires in 24 hours
      navigate("/")
    } catch (err) {
      err instanceof Error && console.error(err.message)
    }
  }

  const checkUsername = useCallback(debounce(async (username: string) => {
    setUsernameCheckLoading(true);
    const usernameSchema = z.string()
      .min(3, { message: "Nome de usuário muito curto" })
      .regex(/^[a-zA-Z0-9._]{3,}$/, { message: "Nome de usuário inválido. Use apenas letras, números, ponto (.) e sublinhado (_)" });
    let usernameValidation;
    try {
      usernameValidation = usernameSchema.parse(username);
    } catch {
      usernameValidation = false;
    }
    if (!usernameValidation) {
      setIsUsernameAvailable(false);
      setUsernameCheckLoading(false);
    } else {
      try {
        const response = await checkUsernameService(username);
        setIsUsernameAvailable(response.isAvailable);
      } catch (err) {
        err instanceof Error && console.error(err.message);
      } finally {
        setUsernameCheckLoading(false);
      }
    }
  }, 500), []); // debounce delay of 500ms

  const checkEmail = useCallback(debounce(async (email: string) => {
    setEmailCheckLoading(true);
    const emailSchema = z.string().email();
    let emailValidation;
    try {
      emailValidation = emailSchema.parse(email);
    } catch {
      emailValidation = false;
    }
    if (!emailValidation) {
      setIsEmailAvailable(false);
      setEmailCheckLoading(false);
    } else {
      try {
        const response = await checkEmailService(email);
        setIsEmailAvailable(response.isAvailable);
      } catch (err) {
        err instanceof Error && console.error(err.message);
      } finally {
        setEmailCheckLoading(false);
      }
    }
  }, 500), []); // debounce delay of 500ms

  const handleNextPart = async () => {
    const isUsernameValid = await trigger("username");
    const isEmailValid = await trigger("email");
    if (isUsernameAvailable && isEmailAvailable && isUsernameValid && isEmailValid) {
      setNextPart(true);
    }
  };

  return (
    <section className="h-full w-full min-h-screen flex justify-center items-center text-white flex-col">
      <article className="w-[90%] max-w-[600px] h-[600px] border-zinc-800 border-2 p-6 rounded-xl bg-zinc-900 flex flex-col justify-between items-center p-2 gap-3">
        <i onClick={() => navigate(-1)} className="bi bi-arrow-left relative right-[270px] text-xl cursor-pointer hover:text-purple-500 transition"></i>
        <div className="pt-4">
          <h1 className="text-3xl">Seja bem vindo ao <span className="text-purple-600">HelloWorld</span></h1>
          <p className="text-zinc-500 mt-2">Crie sua conta abaixo ↓</p>
        </div>

        {/* The signup screen have 2 steps, the first step is fulfill the username and email fields, and the next step is to fulfill the password and confirm-password fields*/}
        <form className="h-full flex flex-col justify-evenly items-center p-2 max-w-[300px]" onSubmit={handleSubmit(onSubmit)}>
          {
            nextPart === false
              ? (
                <>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col items-center gap-1">
                    <label htmlFor="password" className="text-start w-[90%]">Nome de usuário</label>
                      <div className="flex w-[90%]">
                        <input placeholder="Defina um nome de usuário" className="w-full bg-zinc-600 border border-zinc-500 p-2 rounded-right-sm border-r-0" {...register("username")} name="username" onInput={(e) => checkUsername((e.target as HTMLInputElement).value)}></input>
                        <span className="bg-zinc-600 h-full flex items-center px-2 rounded-left-sm min-w-[35px] border border-zinc-500 border-l-0">
                          {isUsernameAvailable === "" && !usernameCheckLoading && <i className="bi"> </i>}
                          {usernameCheckLoading && <Loading color="purple-500" size="sm" />}
                          {isUsernameAvailable && !usernameCheckLoading && <i className="bi bi-check-circle-fill text-green-600"></i>}
                          {isUsernameAvailable === false && !usernameCheckLoading && <i className="bi bi-x-circle-fill text-red-600 text-xl"></i>}
                        </span>
                      </div>
                      {errors.username && <ErrorSpan text={errors.username.message!} />}
                    </div>

                    <div className="flex flex-col items-center gap-1">
                    <label htmlFor="password" className="w-[90%] text-start">E-mail</label>
                        <div className="flex w-[90%]">
                          <input placeholder="Digite seu e-mail" className="w-[250px] bg-zinc-600 border border-zinc-500 p-2 rounded-right-sm border-r-0" {...register("email")} name="email" onInput={(e) => checkEmail((e.target as HTMLInputElement).value)}></input>
                          <span className="bg-zinc-600 h-full flex items-center px-2 rounded-left-sm min-w-[35px] border border-zinc-500 border-l-0">
                            {isEmailAvailable === "" && !emailCheckLoading && <i className="bi"> </i>}
                            {emailCheckLoading && <Loading color="purple-500" size="sm" />}
                            {isEmailAvailable && !emailCheckLoading && <i className="bi bi-check-circle-fill text-green-600"></i>}
                            {isEmailAvailable === false && !emailCheckLoading && <i className="bi bi-x-circle-fill text-red-600 text-xl"></i>}
                          </span>
                      </div>
                      {errors.email && <ErrorSpan text={errors.email.message!} />}
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    {
                      isUsernameAvailable === true && isEmailAvailable === true
                        ? <button className="w-[250px] border border-purple-600 rounded-full px-4 py-1 bg-purple-700 hover:bg-purple-500 transition" type="button" onClick={handleNextPart}>Avançar</button>
                        : <button className="w-[250px] border border-purple-600 rounded-full px-4 py-1 bg-purple-700 hover:bg-purple-500 transition opacity-40" type="button">Avançar</button>
                    }
                    <span>Já possui uma conta? <span onClick={() => navigate("/signin")} className="text-purple-600 cursor-pointer hover:text-purple-400 transition">Entrar</span></span>
                  </div>
                </>
              )
              : (
                <>
                  <div className="w-full">
                    <div className="flex flex-col items-center gap-1 w-full">
                      <label htmlFor="password" className="w-[90%] text-start">Senha</label>
                      <input placeholder="Senha" className="w-[90%] bg-zinc-600 border border-zinc-500 p-2 rounded" {...register("password")} name="password" type="password"></input>
                      {attemptedSubmit && errors.password && <ErrorSpan text={errors.password.message!} />}
                    </div>

                    <div className="flex flex-col items-center gap-1 w-full">
                      <label htmlFor="password" className="w-[90%] text-start mt-2">Confirme a senha</label>
                      <input placeholder="Confirmar senha" className="w-[90%] bg-zinc-600 border border-zinc-500 p-2 rounded" {...register("confirmPassword")} name="confirmPassword" type="password"></input>
                      {attemptedSubmit && errors.confirmPassword && <ErrorSpan text={errors.confirmPassword.message!} />}
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <button className="w-[250px] border border-purple-600 rounded-full px-4 py-1 bg-purple-700 hover:bg-purple-500 transition" type="submit" onClick={() => setAttemptedSubmit(true)}>Criar conta</button>
                    <span>Já possui uma conta? <span onClick={() => navigate("/signin")} className="text-purple-600 cursor-pointer hover:text-purple-400 transition">Entrar</span></span>
                  </div>
                </>
              )
          }
        </form>
      </article>
      <p className="text-zinc-700 text-xs w-[90vw] text-center w-full tracking-tight leading-4 mt-1">Ao utilizar o HelloWorld, você concorda com nossa política de privacidade e uso de cookies.</p>
    </section>
  );
}

export { SignUp }
