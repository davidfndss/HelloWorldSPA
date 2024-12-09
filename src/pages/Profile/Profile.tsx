import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import { findUserByUsernameService } from "../../services/user.services"
import { LoadingScreen } from "../../components/Loading/LoadingScreen";
import { Header } from "../../components/Header/Header";
import { Aside } from "../../components/Aside/Aside";
import { UserContext } from "../../Context/UserContext";

const Profile: React.FC = () => {
  const { username } = useParams()
  const { loggedUserInfo } = useContext(UserContext);
  const [ userInfo, setUserInfo ] = useState()
  const [ error, setError ] = useState()
  const [ menuActive, setMenuActive] = useState<boolean>(false)
  const navigate = useNavigate()

  async function findUserByUsername() {
    try {
      const userResponse = await findUserByUsernameService(username)

      if (userResponse.statusCode == 401) {
        setError(userResponse)
      } else {
        setUserInfo(userResponse)
      }
      
    } catch (error) {
      console.error(error)
    }
  } 
  
  useEffect(() => {
    findUserByUsername()
  }, [username])

  if (error) {
    if (error.statusCode === 401) {
      navigate("/signin");
      return null; 
    }

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message || "Something went wrong!",
    });

    return (
      <div className="text-white w-screen h-screen flex justify-center items-center">
        Error: {error.message}
      </div>
    );
  }

  if (!userInfo && !error) {
    return <LoadingScreen />
  }
  
  return (
    <section className="min-w-[300px] text-white w-[70vw] max-w-[600px] flex flex-col m-auto sm:max-w-[400px] md:w-[40vw] md:max-w-[600px]">
      <Header title={`Perfil de ${userInfo.username}`} />
      <article className="min-h-[240px] text-white flex-col tracking-wide mt-[56px]">
        <div className="absolute min-w-[300px] w-[70vw] max-w-[600px] flex flex-col sm:max-w-[400px] md:w-[40vw] md:max-w-[600px]">
          <div id="background" className="w-full h-[120px] overflow-hidden">
              <img 
                 src={userInfo.background == null ? "/img/purple-background.jpg" : userInfo.background} 
                 className={ userInfo.background == null ? "h-full w-full filter brightness-90" : "h-full w-full" }
                 onError={(e) => e.target.src = "/img/purple-background.jpg"} 
                 alt="Background"
               />
          </div>
          <div id="user-info" className="w-full border-2 border-zinc-900 h-[120px] flex flex-col text-sm md:text-md">
            <div className="ml-[100px] flex justify-between items-center">
              <div>
                <span className="text-zinc-50 text-[14px]">{userInfo.name}</span>
                <span className="ml-1 text-zinc-500 text-[14px]">@{userInfo.username}</span>
              </div>
              {
                menuActive ?
                  <div className="flex items-center">
                    <button className="mr-1 mt-1 rounded-[100%] p-1 px-1.5 pointer hover:text-purple-500 transition text-[20px]" onClick={() => navigate("/logout")}>
                      <i className="bi bi-box-arrow-right text-red-500"></i>
                    </button>
                    <button className="mr-1 mt-1 rounded-[100%] p-1 px-1.5 pointer hover:text-purple-500 transition text-[18px]">
                      <i className="bi bi-pencil-square"></i>
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
            <span className="ml-[100px] mt-2 max-w-[200px] sm:w-[60%] sm:max-w-[300px]">Olá, meu nome é {userInfo.username} e eu estou usando o HelloWorld!</span>
          </div>
        </div>
        
        <div style={{zIndex: 10}} className="border-2 border-zinc-800 rounded-full mt-[80px] w-[84px] h-[84px] relative bg-black ml-2">
          <img 
             src={userInfo.avatar} 
             className="h-[80px] w-[80px] rounded-full"
             onError={(e) => e.target.src = "/favicon.svg"} 
             alt="Avatar"
           />
        </div>
        
      </article>
      <Aside />
    </section>
  );
}

export { Profile };