import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { findUserByIdService } from "../../services/user.service";
import { UserContext } from "../../Context/UserContext";

const Aside: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);

  if (!context) {
    // Pode adicionar um fallback aqui se o contexto não estiver disponível
    return <div>Error: UserContext is not available</div>;
  }

  const { loggedUserInfo, setLoggedUserInfo } = context;

  const findUserById = async (id: string) => {
    try {
      const response = await findUserByIdService(id);
      setLoggedUserInfo(response);
    } catch (error) {
      console.error("Internal server error");
    }
  };

  useEffect(() => {
    const atk = Cookies.get("atk");
    if (atk) {
      const decoded: any = jwtDecode(atk);
      findUserById(decoded.sub);
    }
  }, []);

  return (
    <aside className="w-[20vw] max-w-[275px] h-screen text-white p-5 flex flex-col justify-between fixed left-[10vw] hidden md:block md:border-yellow-500 border">
      <div className="p-1 flex flex-col justify-center items-center gap-1">
        <nav className="text-purple-600 w-full ml-7 cursor-pointer">
          <i className="bi bi-globe-americas text-2xl"></i>
          <span className="ml-4 text-xl tracking-wide">HelloWorld</span>
        </nav>
        <nav className="w-full ml-7 cursor-pointer hover:text-purple-500 transition">
          <i className="bi bi-house-fill text-2xl"></i>
          <span className="ml-4 text-xl tracking-wide">Home</span>
        </nav>
        <nav className="w-full ml-7 cursor-pointer hover:text-purple-500 transition">
          <i className="bi bi-person-fill text-[28px]"></i>
          <span className="ml-3 text-xl tracking-wide">Profile</span>
        </nav>
        <button className="bg-purple-600 rounded-full text-lg p-1 w-full max-w-[225px] mt-3 hover:bg-purple-500 transition">Post</button>
      </div>

      {loggedUserInfo ? (
        <div className="p-1 flex justify-between items-center" onClick={() => navigate(`/profile/${loggedUserInfo.username}`)}>
          <div className="flex cursor-pointer">
          <img 
            src={loggedUserInfo.avatar} 
            className="h-[48px] w-[48px] rounded-full" 
            onError={(e) => e.target.src = "/favicon.svg"} 
            alt="Avatar"
          />
            <div className="flex flex-col ml-1">
              <span className="text-sm">{loggedUserInfo.name}</span>
              <span className="text-sm text-zinc-500">{loggedUserInfo.username}</span>
            </div>
          </div>
          <button>
            <i className="bi bi-three-dots text-[25px] rounded-full h-10 w-10 text-center hover:text-purple-500 transition"></i>
          </button>
        </div>
      ) : (
        <div className="p-1 flex justify-between items-center" onClick={() => navigate("/signin")}>
          <div className="flex cursor-pointer">
            <img src="/favicon.svg" className="h-[48px] w-[48px] rounded-full"></img>
            <div className="flex flex-col ml-1">
              <span className="text-sm">Faça login</span>
              <span className="text-sm text-zinc-500">@Faça_login</span>
            </div>
          </div>
          <button>
            <i className="bi bi-three-dots text-[25px] rounded-full h-10 w-10 text-center hover:text-purple-500 transition"></i>
          </button>
        </div>
      )}
    </aside>
  );
};

export { Aside };