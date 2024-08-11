import React from "react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="min-w-[300px] w-[70vw] border border-zinc-900 border-t-0 text-white p-3 fixed bg-black flex justify-between items-center z-10 border-2 sm:max-w-[400px] md:w-[40vw] md:max-w-[600px]">
      <h1 className="text-[20px]"> {title} </h1>
      <i className="bi bi-rocket-takeoff-fill text-lg text-purple-600"></i>
    </header>
  )
}

export { Header }