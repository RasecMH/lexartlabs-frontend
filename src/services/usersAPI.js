import axios from 'axios';

export const loginRequest = async ({email, password}) => {
    return axios({
      method: "post",
      url: "http://localhost:3001/users/login",
      withCredentials: true,
      data: {
        email,
        password
      },
    });
}

export const registerRequest = async ({email, password, name}) => {
  return axios({
      method: "post",
      url: "http://localhost:3001/users/register",
      withCredentials: true,
      data: {
        email,
        password,
        name
      },
    })
  
}

export const validateRequest = async () => {
  return axios({
      method: "get",
      url: "http://localhost:3001/users/validate",
      withCredentials: true
    })
  
}
