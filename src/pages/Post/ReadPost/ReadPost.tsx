import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../../components/Header/Header";
import { Comment } from "../../../components/Comment/Comment";
import { findPostByIdService } from "../../../services/post.services";
import Swal from "sweetalert2"
import { Loading } from "../../../components/Loading/Loading"

interface User {
  name: string;
  username: string;
  avatar: string;
}

interface Post {
  body: string;
  userId: string;
  user: User;
  comments?: Array<{ id: string; body: string; user: User }>;
}

interface Error {
  statusCode: number;
  message: string;
}

const ReadPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    console.error("Invalid id");
    return null;
  }

  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const findPostById = async () => {
      try {
        const postResponse = await findPostByIdService(id);
        if (postResponse.statusCode == 401) {
          return setError(postResponse)
        }
        setPost(postResponse);
      } catch (err) {
        console.error(err);
      }
    };

    findPostById();
  }, [id]);

  if (!post && !error) {
    return <Loading />
  }

  if ( error ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!"
    })

    return (
      <div className="text-white w-screen h-screen flex justify-center items-center">Error: {error.message}</div>
    ) 
  }

  return post 
    ?  (
      <article className="text-white w-[40vw] max-w-[600px] flex border border-zinc-800 border-t-0 border-b-0 flex-col m-auto">
        <Header title={`Post de ${post.user.username}`} />
        <div className="min-h-[80px] text-white flex flex-col tracking-wide border border-zinc-800 border-t-0 border-b-0 mt-[60px]">
          <div className="ml-1 w-full flex p-2">
            <div className="min-w-[48px]">
              <img
                src={post.user.avatar}
                className="h-[48px] w-[48px] rounded-full"
                alt={`${post.user.name}'s avatar`}
              />
            </div>
            <div className="ml-1">
              <div>
                <span className="text-sm">{post.user.name}</span>
                <span className="text-zinc-500 ml-1">@{post.user.username}</span>
              </div>
              <p className="text-sm max-w-[500px] break-words mt-1 w-[35vw] max-w-[520px] h-full">
                {post.body}
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-2 px-2">
            <button className="mr-4 text-lg hover:text-purple-500 transition">
              <i className="bi bi-heart hover:text-purple-500 transition"></i>
            </button>
          </div>
          {post.comments && post.comments.length > 0 ? (
            <>
              <h3 className="text-center">Comments</h3>
              {post.comments.map((comment) => (
                <Comment key={comment.id} props={comment} />
              ))}
            </>
          ) : (
            <h3 className="text-center">This post has no comments</h3>
          )}
        </div>
      </article>
    ) 
    : (
      <div className="text-white w-screen h-screen flex justify-center items-center">Invalid post</div>
    )
};

export { ReadPost };