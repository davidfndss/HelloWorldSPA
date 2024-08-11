import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { findUserByIdService } from "../../services/user.service";
import { UserContext } from "../../Context/UserContext";
import { LoadingContext } from "../../Context/LoadingContext";
import { Loading } from "../Loading/Loading";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  // to fix: 
  // const userContext = useContext(UserContext);
  // const loadingContext = useContext(LoadingContext)

  // if (!userContext) {
  //   // Pode adicionar um fallback aqui se o contexto não estiver disponível
  //   return <div>Error: UserContext is not available</div>;
  // }

  // if (!loadingContext) { 
  //   return <div>Error: LoadingContext is not available</div>;
  // }

  // const { loggedUserInfo, setLoggedUserInfo } = userContext;
  // const { loading, setLoading } = loadingContext;

  // const findUserById = async (id: string) => {
  //   try {
  //     setLoading(true)
  //     //const response = await findUserByIdService(id);
  //     setLoggedUserInfo(response);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false)
  //   }
  // };

  // useEffect(() => {
  //   const atk = Cookies.get("atk");
  //   if (atk) {
  //     const decoded: any = jwtDecode(atk);
  //     findUserById(decoded.sub);
  //   }
  // }, []);

  // if (loading) {
  //   return ( <Loading /> )
  // }

  return (
    <footer className="w-screen h-[10vh] max-h-[60px] flex justify-center items-center z-10 text-white p-5 fixed bottom-0 bg-black  md:hidden">
        <div className="min-w-[300px] w-[70vw] h-[10vh] max-h-[60px] flex items-center justify-evenly border border-zinc-900 border-2 border-b-0 sm:max-w-[400px]">
          <nav className="cursor-pointer hover:text-purple-500 transition">
              <i className="bi bi-house-fill text-[28px]"></i>
            </nav>
            <nav className="cursor-pointer hover:text-purple-500 transition">
              <i className="bi bi-search text-[28px]"></i>
            </nav>
            {loggedUserInfo ? (
                <img 
                  src={loggedUserInfo.avatar} 
                  className="h-[40px] w-[40px] rounded-full" 
                  onError={(e) => e.target.src = "/favicon.svg"} 
                  alt="Avatar"
                  onClick={() => navigate(`/profile/${loggedUserInfo.username}`)}
                />
            ) : (
                <button>
                  <button className="text-white mr-2 mt-1 py-1.5 px-4 bg-purple-600 rounded-full opacity-60">Entrar</button>
                </button>
          )}
        </div>
    </footer>
  );
};

export { Navbar };