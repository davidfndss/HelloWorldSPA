import React from "react";
import { Post } from "../Post/Post"
import { useState, useEffect } from "react"
import axios from "axios"
import { getPostsService } from "../../services/post.services";

interface IPost {
  body: string;
  id: string;
  userId: string;
  user: {
    name: string;
    username: string;
    avatar: string;
  }
}

const Feed: React.FC = () => {
  const [ postsList, setPostsList ] = useState([])

  useEffect(() => {
    try {
      getPosts()
    } catch (err) {
      console.error(err)
    }
  },[])

  const getPosts = async () => {
    try {
      const postsResponse = await getPostsService()
      setPostsList(postsResponse.results)
      return postsResponse
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section className="min-w-[300px] w-[70vw] h-full border border-zinc-900 border-2 border-t-0 border-b-0 sm:max-w-[400px] md:w-[40vw] md:max-w-[600px]">
      {
        postsList && postsList.map((item: IPost) => {
          return <Post 
            key={item.id}
            id={item.id}
            body={item.body} 
            userId={item.userId}
            name={item.user.name}
            username={item.user.username}
            avatar={item.user.avatar}
          />
        })
      }
    </section>
  )
}

export { Feed }