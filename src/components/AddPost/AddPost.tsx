import React from "react";

const AddPost: React.FC = () => {
  return (
    <section className="min-w-[300px] w-[70vw] max-w-[600px] border border-zinc-900 border-t-0 mt-[50px] p-3 flex flex-col items-end border-2 sm:max-w-[400px] md:w-[40vw] md:max-w-[600px]">
      <div className="flex w-full">
        <img src="/favicon.svg" className="w-[48px] h-[48px] rounded-full"></img>
        <textarea className="bg-black text-white py-2 px-3 w-full resize-none" placeholder="O que ta acontecendo?"></textarea>
      </div>
      <button className="text-white mr-2 mt-1 py-1.5 px-4 bg-purple-600 rounded-full opacity-60">Post</button>
    </section>
  )
}

export { AddPost }