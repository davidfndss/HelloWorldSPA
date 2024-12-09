import React from "react";
import { useNavigate } from "react-router-dom"

interface PostProps {
  id: string;
  body: string;
  userId: string;
  name: string;
  username: string;
  avatar: string;
}

const Post: React.FC<PostProps> = ({ id, body, name, username, avatar }) => {
  const navigate = useNavigate()
  
  return (
    <div onClick={() => navigate(`/post/${id}`)} className="min-h-[80px] text-white flex tracking-wide border border-zinc-900 border-t-0 border-l-0 border-r-0 border-2 p-2 cursor-pointer">
      
      <div className="ml-1 w-full flex w-[85%] border">
        <div className="min-w-[48px]">
           <img src="/favicon.svg" className="h-[48px] w-[48px] rounded-full"></img>
        </div>
        
        <div className="ml-1">
          <div>
            <span className="text-sm">
              {name}
            </span>
            <span className="text-sm text-zinc-500 ml-1">
              @{username}
            </span>
          </div>
          <p className="text-sm break-words h-full w-[55vw] sm:max-w-[300px] md:w-[30vw] md:max-w-[500px]">{body}</p>
        </div>
      </div>
      
      <div className="flex justify-evenly mt-2 border w-[15%]">
        <button>
          <i className="bi bi-heart hover:text-purple-500 transition"></i>
        </button>
      </div>
      
    </div>
  );
}

export { Post };
