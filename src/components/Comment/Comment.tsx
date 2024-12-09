import React, { useState } from "react";
import { likeCommentService } from "../../services/post.services";

const Comment = ({ props }) => {
  const [comment, setComment] = useState<Comment | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [numberOfLikes, setNumberOfLikes] = useState(0); 
  const [likedComment, setLikedComment] = useState(false); 
  
  const likeComment = async () => {
    try {
      await likeCommentService(comment?.id);
      if (likedComment) {
        setNumberOfLikes((prevValue) => prevValue - 1);
      } else {
        setNumberOfLikes((prevValue) => prevValue + 1);
      }
      setLikedPost(!likedPost);
    } catch (err: any) {
      console.error(err.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to like the comment. Please try again!",
      });
    }
  };
  
  return (
    <div className="min-h-[80px] text-white flex tracking-wide border border-zinc-900 border-t-0 border-2">
      <div className="flex p-2 w-[85%]">
        <div>
           <img src={props.user.avatar} className="h-[48px] w-[48px] rounded-full"  onError={(e) => e.target.src = "/favicon.svg"}></img>
        </div>

        <div className="ml-1 w-[80%]">
          <div>
            <span className="text-sm">
              {props.user.name}
            </span>
            <span className="text-zinc-500 ml-1">
              @{props.user.username}
            </span>
          </div>
          <p className="text-sm max-w-[500px] break-words mt-1">{props.body}</p>
          <span className="text-zinc-500 block">{
          numberOfLikes > 1 
          ? `${numberOfLikes} Likes` 
          : (numberOfLikes == 0) ? `` 
          : `${numberOfLikes} Like` 
          }</span>
        </div>
      </div>

      <div className="flex justify-end w-[15%] justify-center min-h-full">
        <button
          className="text-lg hover:text-purple-500 transition flex justify-center items-center"
          onClick={likeComment}
        >
          {likedComment ? (
            <span id="likes" className="leading-none flex flex-col justify-center items-center">
              <i className="bi bi-heart-fill text-[23px] text-purple-500"></i>
            </span>
          ) : (
            <span id="likes" className="leading-none flex flex-col justify-center items-center">
              <i className="bi bi-heart text-[23px] text-zinc-400 hover:text-purple-500 transition"></i>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export { Comment };
