import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('token')


export const loginRequest = async ({email, password}) => {
    return axios({
      method: "post",
      url: "https://lexartlabs-backend.vercel.app/users/login",
      data: {
        email,
        password
      }
    });
}

export const registerRequest = async ({email, password, name}) => {
  return axios({
      method: "post",
      url: "https://lexartlabs-backend.vercel.app/users/register",
      data: {
        email,
        password,
        name
      }
    })
  
}

export const validateRequest = async () => {
  return axios({
      method: "get",
      url: "https://lexartlabs-backend.vercel.app/users/validate",
      headers: {
        Authorization: token
      }
    })
  
}
