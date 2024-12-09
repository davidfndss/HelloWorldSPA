import React from "react";

interface MiniProfileProps {
  username: string;
}

const MiniProfile: React.FC<MiniProfileProps> = ({  username }) => {
  return (
    <div className="min-h-[70px] text-white flex tracking-wide p-2 items-center justify-evenly pointer" onClick={() => { navigate(`/profile/${username}`) }}>
      <div>
         <img src="/favicon.svg" className="h-[48px] w-[48px] rounded-full"></img>
      </div>
      <div className="flex flex-col">
        <span className="text-sm">
          {username}
        </span>
        <span className="text-zinc-500">
          @{username}
        </span>
      </div>
      <div className="flex justify-center items-center">
         <button className="px-2 py-1 rounded-full bg-white text-black hover:bg-purple-600 hover:text-white transition">Ver Perfil</button>
      </div>
    </div>
  );
}

export { MiniProfile };
