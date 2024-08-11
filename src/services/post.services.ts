import Cookies from "js-cookie"

const baseUrl = "https://helloworldapi-lthq.onrender.com"
console.log(baseUrl)

const getPostsService = () => {
  const response = fetch(`${baseUrl}/post`, {
    method: 'GET'
  }).then(res => res.json())
  return response
} 

const findPostByIdService = (id: string) => {
  const token = Cookies.get("atk")
  const response = fetch(`${baseUrl}/post/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json())
  return response
} 

export {
  getPostsService,
  findPostByIdService
}