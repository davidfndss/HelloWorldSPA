import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { findUserByIdService } from "../../services/user.services";
import { UserContext } from "../../Context/UserContext";

const Aside: React.FC = () => {
  const [ menuActive, setMenuActive ] = useState<boolean>(false)
  const navigate = useNavigate();
  const context = useContext(UserContext);

  if (!context) {
    return <div>Error: UserContext is not available</div>;
  }

  const { loggedUserInfo, setLoggedUserInfo } = context;

  const findUserById = async (id: string) => {
    try {
      const response = await findUserByIdService(id);
      if (response.statusCode == 401) {
        Cookies.remove("atk")
        navigate("/signin")
      } else {
        setLoggedUserInfo(response);
      }
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
    <aside className="text-white min-w-[300px] w-[70vw] p-5 flex justify-around fixed border-zinc-900 border-2 border-b-0 border bottom-0 bg-black sm:max-w-[400px] md:w-[40vw] md:max-w-[600px] lg:min-w-[0px] lg:h-screen lg:w-[20vw] lg:max-w-[275px] lg:left-[9vw] lg:flex-col lg:border-none lg:justify-between lg:mr-[100px]">
      <div className="flex flex-col justify-center items-center gap-1 lg:p-1">
        <nav className="text-purple-600 w-full ml-7 cursor-pointer hidden lg:block">
          <i className="bi bi-globe-americas text-2xl"></i>
          <span className="ml-4 text-xl tracking-wide">HelloWorld</span>
        </nav>
        <nav className="w-full cursor-pointer hover:text-purple-500 transition lg:ml-7" onClick={() => {
          navigate("/")
        }}>
          <i className="bi bi-house-fill text-2xl"></i>
          <span className="ml-4 text-xl tracking-wide hidden lg:inline">Home</span>
        </nav>
        <nav className="w-full ml-7 cursor-pointer hover:text-purple-500 transition hidden lg:block" onClick={() => {navigate(`/profile/${loggedUserInfo.username}`)}}>
          <i className="bi bi-person-fill text-[28px]"></i>
          <span className="ml-3 text-xl tracking-wide">Perfil</span>
        </nav>
        {
          loggedUserInfo 
            ? (
               <button className="bg-purple-600 rounded-full text-lg p-1 w-full max-w-[225px] mt-3 hover:bg-purple-500 transition hidden lg:block">Postar</button>
            )
            : (
              <button className="bg-purple-600 rounded-full text-lg p-1 w-full max-w-[225px] mt-3 hover:bg-purple-500 transition hidden lg:block" onClick={() => navigate("/signin")}>Entrar</button>
            )
        }
      </div>

      <button className="lg:hidden">
        <i className="bi bi-search text-2xl transition hover:text-purple-500"></i>
      </button>

      <div className="hidden lg:block">
        {loggedUserInfo ? (
          <div className="p-1 flex justify-between items-center">
            <div className="flex cursor-pointer w-full"  onClick={() => navigate(`/profile/${loggedUserInfo.username}`)}>
            <img 
              src={loggedUserInfo.avatar} 
              className="h-[48px] w-[48px] rounded-full"
              onError={(e) => e.target.src = "/favicon.svg"} 
              alt="Avatar"
            />
              <div className="flex flex-col ml-1">
                <span className="text-sm hidden lg:block">{loggedUserInfo.name}</span>
                <span className="text-sm text-zinc-500 hidden lg:block">{loggedUserInfo.username}</span>
              </div>
            </div>
            {
              menuActive ?
                <div className="flex items-center">
                  <button className="mr-1 mt-1 rounded-[100%] p-1 px-1.5 pointer hover:text-purple-500 transition text-[20px]" onClick={() => navigate("/logout")}>
                    <i className="bi bi-box-arrow-right text-red-500"></i>
                  </button>
                  <button className="mr-1 mt-1 rounded-[100%] p-1 px-1.5 pointer hover:text-purple-500 transition text-[20px]" onClick={() => setMenuActive(!menuActive)}>
                    <i className="bi bi-x-circle"></i>
                  </button>
                </div>
              :
                <button className="mr-2 mt-1 rounded-[100%] p-1 px-1.5 pointer hover:text-purple-500 transition text-[20px]" onClick={() => setMenuActive(!menuActive)}>
                  <i className="bi bi-three-dots"></i>
                </button>
            }
          </div>
        ) : (
          null
        )}
      </div>

      <div className="lg:hidden">
        {
          loggedUserInfo 
            ? (
              <img 
                src={loggedUserInfo.avatar} 
                className="h-[40px] w-[40px] rounded-full" 
                onError={(e) => e.target.src = "/favicon.svg"} 
                alt="Avatar"
                onClick={() => {navigate(`/profile/${loggedUserInfo.username}`)}}
              />
            ) 
            : (
              <button className="lg:hidden" onClick={() => navigate("/signin")}>
                <i className="bi bi-box-arrow-in-right text-3xl text-purple-500"></i>
              </button>
            )
        }
      </div>
      
    </aside>
  );
};

export { Aside };