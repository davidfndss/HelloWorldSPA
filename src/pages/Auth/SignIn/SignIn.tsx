import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "./schemas/signin.schemas";
import { ErrorSpan } from "../../../components/ErrorSpan/ErrorSpan";
import { signinService } from "../../../services/auth.service"
import Cookies from "js-cookie"
 
type Inputs = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const [ errorsList, setErrorsList ] = useState<string[]>([])
  
  const signin = async (data: {email: string, password: string}) => {
    try {
      const response = await signinService(data)
      if ( response.statusCode == 404 || response.statusCode == 401) {
        return setErrorsList((prevArray) => [...prevArray, "Usuário ou senha inválidos"])
      }
      if (response.access_token) {
        Cookies.set("atk", response.access_token)
        navigate("/")
      }
    } catch (error) {
      console.error("internal server error")
    }
  } 

  const { register, handleSubmit, formState: { errors }, trigger } = useForm<Inputs>({ resolver: zodResolver(signinSchema) });
  const onSubmit: SubmitHandler<Inputs> = data => signin(data);

  return (
    <section className="h-full w-full min-h-screen flex justify-center items-center text-white">
      <article className="w-[600px] h-[600px] border-zinc-800 border-2 p-6 rounded-xl bg-zinc-900 flex flex-col justify-between items-center p-2 gap-3">
        <i onClick={() => navigate(-1)} className="bi bi-arrow-left relative right-[270px] text-xl cursor-pointer hover:text-purple-500 transition"></i>
        <div className="pt-4">
          <h1 className="text-3xl">Seja bem vindo de volta 🌎</h1>
          <p className="text-zinc-500 w-[285px] mt-1">Faça login abaixo ↓</p>
        </div>
        
        <div className="h-full flex flex-col justify-center items-center p-2">
          <form className="flex flex-col h-full justify-evenly items-center gap-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="w-full text-start">E-mail</label>
              <input placeholder="E-mail" className="w-[285px] bg-zinc-600 border border-zinc-500 p-2 rounded" {...register("email")}></input>
              {errors.email && <ErrorSpan text={errors.email.message!} />}
              <label htmlFor="password" className="w-full text-start">Senha</label>
              <input placeholder="Senha" className="w-[285px] bg-zinc-600 border border-zinc-500 p-2 rounded" {...register("password")}></input>
              {errors.password && <ErrorSpan text={errors.password.message!} />}
              {errorsList && errorsList.map((err) => <ErrorSpan text={err} /> )}
            </div>
            
            
            <div className="flex flex-col gap-3">
              <button className="w-[250px] border border-purple-600 rounded-full px-4 py-1 bg-purple-700 hover:bg-purple-500 transition">Entrar</button>
              <span>Ainda não tem uma conta? <span onClick={() => navigate("/signup")} className="text-purple-600 cursor-pointer hover:text-purple-400 transition">Criar uma</span></span>
            </div>
          </form>
        </div>
      </article>
    </section>
  )
}

export { SignIn }