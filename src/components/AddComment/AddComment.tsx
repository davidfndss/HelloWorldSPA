import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form"
import { addCommentService } from "../../services/post.services"

const AddComment: React.FC = ({postId}) => {
  const context = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  if (!context) {
    return <div>Error: UserContext is not available</div>;
  }

  async function addComment(data) {
    try {
      await addCommentService(data, postId)
    } catch (err) {
      console.error(err.message)
    } 
    setTimeout(() => {window.scrollTo(0, document.body.scrollHeight)}, 100)
  }

   const { loggedUserInfo } = context;

  return loggedUserInfo 
    ? (
        <section className="min-w-[300px] w-[70vw] max-w-[600px] border border-zinc-900 border-t-0 flex border-2 sm:max-w-[400px] md:w-[40vw] md:max-w-[600px]">
          <form onSubmit={handleSubmit(addComment)} className="w-full flex">
            <div className="p-2 w-[85%] flex">
              <div className="flex w-full">
                  <img src="/favicon.svg" className="w-[48px] h-[48px] rounded-full"></img>
                  <textarea className="bg-black text-white py-2 px-1 w-full resize-none" placeholder="O que ta acontecendo?" {...register("body")}></textarea>
                </div>
            </div>
            <button className="text-zinc-400 text-[23px] min-w-[15%] flex items-center justify-center">
              <i className="bi bi-chat"></i>
            </button>
          </form>
        </section>
    )
    : (
      <div className="mt-[57px]"></div>
    )
}

export { AddComment }