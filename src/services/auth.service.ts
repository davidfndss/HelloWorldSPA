import { baseUrl } from "../services/user.services"

export interface ISigninUser {
  email: string;
  password: string;
}

const signinService = (body: ISigninUser) => {
  const response = fetch(`${baseUrl}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
  },
    body: JSON.stringify({
      email: body.email,
      password: body.password
    })
  }).then(res => res.json())
  return response
}

export { signinService }