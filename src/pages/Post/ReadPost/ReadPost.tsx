import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components/Header/Header";
import { Comment } from "../../../components/Comment/Comment";
import { findPostByIdService, likePostService } from "../../../services/post.services";
import Swal from "sweetalert2";
import { LoadingScreen } from "../../../components/Loading/LoadingScreen";
import { UserContext } from "../../../Context/UserContext";
import { Aside } from "../../../components/Aside/Aside";
import { AddComment } from "../../../components/AddComment/AddComment";

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
  likes: Array<User>; 
}

interface Error {
  statusCode: number;
  message: string;
}

const ReadPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loggedUserInfo } = useContext(UserContext);
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [numberOfLikes, setNumberOfLikes] = useState(0); 
  const [likedPost, setLikedPost] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedUserInfo === null) {
      navigate("/signin");
    }
  }, [loggedUserInfo, navigate]);

  const checkLike = (likes: User[]) => {
    const foundLikeOnPost = likes.find((obj) => loggedUserInfo?.username === obj.username);
    setLikedPost(!!foundLikeOnPost);
  };

  const likePost = async () => {
    try {
      await likePostService(post.id);
      if (likedPost) {
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
        text: "Failed to like the post. Please try again!",
      });
    }
  };

  useEffect(() => {
    const findPostById = async () => {
      try {
        const postResponse = await findPostByIdService(id);
        if (postResponse.statusCode === 401) {
          setError(postResponse);
        } else {
          setPost(postResponse);
          checkLike(postResponse.likes);
          setNumberOfLikes(postResponse.likes.length);
        }
      } catch (err: any) {
        console.error(err);
        setError({ statusCode: 500, message: "An unexpected error occurred." });
      }
    };

    findPostById();
  }, [id]);

  if (!post && !error) {
    return <LoadingScreen />;
  }

  if (error) {
    if (error.statusCode === 401) {
      navigate("/signin");
      return null; 
    }

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message || "Something went wrong!",
    });

    return (
      <div className="text-white w-screen h-screen flex justify-center items-center">
        Error: {error.message}
      </div>
    );
  }

  return post ? (
    <section className="min-w-[300px] text-white w-[70vw] max-w-[600px] flex flex-col m-auto sm:max-w-[400px] md:w-[40vw] md:max-w-[600px]">
      <Header title={`Post de ${post.user.username}`} />
      <div className="min-h-[80px] text-white flex tracking-wide border-2 border-zinc-900 border-t-0 mt-[56px]">
        <div className="w-[85%] flex p-2 min-h-80px">
          <div className="min-w-[48px]">
            <img
              src={post.user.avatar}
              className="h-[48px] w-[48px] rounded-full"
              onError={(e) => (e.currentTarget.src = "/favicon.svg")}
              alt={`${post.user.name}'s avatar`}
            />
          </div>
          <div className="ml-1">
            <div>
              <span className="text-sm">{post.user.name}</span>
              <span className="text-zinc-500 ml-1">@{post.user.username}</span>
            </div>
            <p className="text-sm max-w-[500px] break-words mt-1 w-[35vw] max-w-[520px]">
              {post.body}
            </p>
            <span className="text-zinc-500 block">{numberOfLikes > 1 ? `${numberOfLikes} Likes` : `${numberOfLikes} Like` }</span>
          </div>
        </div>
        <div className="flex justify-end px-2 w-[15%] justify-center min-h-full">
          <button
            className="text-lg hover:text-purple-500 transition flex justify-center items-center"
            onClick={likePost}
          >
            {likedPost ? (
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
      {post.comments && post.comments.length > 0 ? (
        <>
          <h3 className="text-center border-2 border-zinc-900 border-t-0">{post.comments.length > 1 ? `${post.comments.length} Comentários` : `${post.comments.length} Comentário` }</h3>
          <AddComment postId={post.id}/>
          {post.comments.map((comment) => (
            <Comment key={comment.id} props={comment} />
          ))}
        </>
      ) : (
        <h3 className="text-center text-zinc-600 border border-zinc-900 border-t-0 border-2">
          • Esse post não tem comentários ainda •
          <AddComment postId={post.id}/>
        </h3>
      )}
      <Aside />
    </section>
  ) : (
    <div className="text-white w-screen h-screen flex justify-center items-center">
      Post inválido
    </div>
  );
};

export { ReadPost };
