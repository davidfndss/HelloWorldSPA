import React from "react";

const Comment = ({ props }) => {
  return (
    <div className="min-h-[80px] text-white flex flex-col tracking-wide border border-zinc-800 border-t-0 border-l-0 border-r-0 border-2 p-2">
      <div className="ml-1 w-full flex">
        <div>
           <img src={props.user.avatar} className="h-[48px] w-[48px] rounded-full"></img>
        </div>

        <div className="ml-1">
          <div>
            <span className="text-sm">
              {props.user.name}
            </span>
            <span className="text-zinc-500 ml-1">
              @{props.user.username}
            </span>
          </div>
          <p className="text-sm max-w-[500px] break-words mt-1">{props.body}</p>
        </div>
      </div>

      <div className="flex justify-end mt-2">
        <button className="mr-4">
          <i className="bi bi-heart text-lg hover:text-purple-500 transition"></i>
        </button>
      </div>

    </div>
  );
}

export { Comment };
