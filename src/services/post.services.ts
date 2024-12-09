import Cookies from "js-cookie"
import { AddPost } from "../components/AddPost/AddPost"

const baseUrl = "https://helloworldapi-lthq.onrender.com"

const getPostsService = () => {
  const response = fetch(`${baseUrl}/post`, {
    method: 'GET'
  }).then(res => res.json())
  return response
} 

const addPostService = (data) => {
  console.log(JSON.stringify(data))
  const token = Cookies.get("atk")
  const response = fetch(`${baseUrl}/post`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }).then(res => {
    console.log(res.body)
    return res.json()
  } );
  return response;
}

const findPostByIdService = (id: string) => {
  const token = Cookies.get("atk")
  const response = fetch(`${baseUrl}/post/find-by-id/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json())
  return response
} 

const likePostService = (id: string) => {
  const token = Cookies.get("atk")
  const response = fetch(`${baseUrl}/like/post/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  return response
}

const addCommentService = (data, postId) => {
  const token = Cookies.get("atk")
  const response = fetch(`${baseUrl}/comment/${postId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  return response
}

const likeCommentService = (id: string) => {
  const token = Cookies.get("atk")
  const response = fetch(`${baseUrl}/like/comment/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  return response
}

export {
  getPostsService,
  addPostService,
  findPostByIdService,
  likePostService,
  addCommentService,
  likeCommentService
}