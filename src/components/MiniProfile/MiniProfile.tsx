import React from "react";

interface MiniProfileProps {
  userId: string;
}

const MiniProfile: React.FC<MiniProfileProps> = ({  userId }) => {
  return (
    <div className="min-h-[80px] text-white flex tracking-wide p-2 items-center justify-evenly">
      <div>
         <img src="/favicon.svg" className="h-[48px] w-[48px] rounded-full"></img>
      </div>
      <div className="flex flex-col">
        <span className="text-sm">
          {userId.slice(1,15)}
        </span>
        <span className="text-zinc-500">
          @{userId.slice(1,10)}
        </span>
      </div>
      <div className="flex justify-center items-center">
         <button className="px-2 py-1 rounded-full bg-white text-black hover:bg-purple-600 hover:text-white transition">Follow</button>
      </div>
    </div>
  );
}

export { MiniProfile };
