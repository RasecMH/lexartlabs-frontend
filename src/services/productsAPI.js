import axios from 'axios';

export const getProductsRequest = async () => {
  const token = localStorage.getItem('token');

  return axios({
    method: 'get',
    url: 'https://lexartlabs-backend.vercel.app/products',
    withCredentials: true,

    headers: {
      Authorization: token,
    },
  });
};

export const updateProductsRequest = async (payload) => {
  const token = localStorage.getItem('token');

  return axios({
    method: 'put',
    url: 'https://lexartlabs-backend.vercel.app/products/update',
    data: payload,
    withCredentials: true,

    headers: {
      Authorization: token,
    },
  });
};

export const deleteProductsRequest = async (id) => {
  const token = localStorage.getItem('token');

  return axios({
    method: 'delete',
    url: `https://lexartlabs-backend.vercel.app/products/delete/${id}`,
    withCredentials: true,

    headers: {
      Authorization: token,
    },
  });
};

export const createProductsRequest = async (payload) => {
  const token = localStorage.getItem('token');

  return axios({
    method: 'post',
    url: `https://lexartlabs-backend.vercel.app/products/create`,
    withCredentials: true,

    data: payload,
    headers: {
      Authorization: token,
    },
  });
};

export const searchProductsRequest = async (query) => {
  const token = localStorage.getItem('token');

  return axios({
    method: 'get',
    url: `https://lexartlabs-backend.vercel.app/products/search?q=${query}`,
    withCredentials: true,

    headers: {
      Authorization: token,
    },
  });
};
