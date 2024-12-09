import Cookies from "js-cookie"
const baseUrl = "https://helloworldapi-lthq.onrender.com"

export interface ICreateUser {
  username: string;
  email: string;
  password: string;
}

const checkUsernameService = (username: string) => {
  const response = fetch(`${baseUrl}/user/check-username`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
  },
    body: JSON.stringify({
      username: username
    })
  }).then(res => res.json())
  return response
} 

const checkEmailService = (email: string) => {
  const response = fetch(`${baseUrl}/user/check-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
  },
    body: JSON.stringify({
      email: email
    })
  }).then(res => res.json())
  return response
} 

const signupService = (body: ICreateUser) => {
  const response = fetch(`${baseUrl}/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
  },
    body: JSON.stringify({
      username: body.username,
      email: body.email,
      password: body.password
    })
  }).then(res => res.json())
  return response
}

const findUserByIdService = (id: string) => {
  const token = Cookies.get("atk")
  const response = fetch(`${baseUrl}/user/find-by-id/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }).then(res => res.json())
  return response
}

const findUserByUsernameService = (username: string) => {
  const token = Cookies.get("atk")
  const response = fetch(`${baseUrl}/user/find-by-username/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }).then(res => res.json())
  return response
}

export {
  baseUrl,
  checkUsernameService,
  checkEmailService,
  signupService,
  findUserByIdService,
  findUserByUsernameService
}