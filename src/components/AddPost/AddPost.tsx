import React, { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { addPostService } from "../../services/post.services";
import { useForm, SubmitHandler } from "react-hook-form";

const AddPost: React.FC = () => {
  const context = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [targetValue, setTargetValue] = useState()

  async function addPost(data) {
    try {
      await addPostService(data)
    } catch (err) {
      console.error(err.message)
    } 
    setTimeout(() => {window.scrollTo(0, document.body.scrollHeight)}, 100)
  }
  
  if (!context) {
    return <div>Error: UserContext is not available</div>;
  }

   const { loggedUserInfo } = context;

  return loggedUserInfo 
    ? (
        <form onSubmit={handleSubmit(addPost)} className="min-w-[300px] w-[70vw] max-w-[600px] border border-zinc-900 border-t-0 mt-[50px] p-3 flex flex-col items-end border-2 sm:max-w-[400px] md:w-[40vw] md:max-w-[600px]">
          <div className="flex w-full">
            <img src="/favicon.svg" className="w-[48px] h-[48px] rounded-full"></img>
            <textarea onInput={e => setTargetValue(e.target.value)} className="bg-black text-white py-2 px-3 w-full resize-none" placeholder="O que ta acontecendo?" {...register("body")}></textarea>
          </div>
          <button className={ targetValue == 0 || targetValue == null ? "text-white mr-2 mt-1 py-1.5 px-4 bg-purple-600 rounded-full opacity-60 transition" : "text-white mr-2 mt-1 py-1.5 px-4 bg-purple-600 rounded-full transition" }>Postar</button>
        </form>
    )
    : (
      <div className="mt-[57px]"></div>
    )
}

export { AddPost }