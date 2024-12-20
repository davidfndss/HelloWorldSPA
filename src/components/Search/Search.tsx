import React from "react";
import { MiniProfile } from "../MiniProfile/MiniProfile"

const Search: React.FC = () => {
  return (
    <section className="w-[20vw] max-w-[360px] text-white p-5 fixed flex flex-col gap-2 right-[10vw] hidden lg:block">
      <div className="w-full flex">
        <input className="bg-zinc-950 border border-zinc-800 rounded-right p-2 px-3 border-r-0 border-2 w-full"></input>
        <button className="bg-zinc-950 border border-zinc-800 rounded-left p-2 px-3 border-l-0 border-2">
          <i className="bi bi-search"></i> 
        </button>
      </div>
      <div className="border border-zinc-800 border-2 rounded-xl p-2 bg-zinc-900 mt-2">
        <h1 className="ml-4">Perfis populares</h1>
        <MiniProfile username="durden" />
        <MiniProfile username="durden" />
        <MiniProfile username="durden" />
        <MiniProfile username="durden" />
      </div>
      <p className="text-zinc-700 text-sm text-center w-full tracking-tight leading-4 mt-2">Este projeto foi feito para fins educacionais e respeita os devidos direitos autorais e de propriedade intelectual</p>
    </section>
  )
}

export { Search }