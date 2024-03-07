import axios from 'axios';

export const getProductsRequest = async () => {
    return axios({
      method: "get",
      url: "https://lexartlabs-backend.vercel.app/products",
      withCredentials: true,
    });
}

export const updateProductsRequest = async (payload) => {
    return axios({
      method: "put",
      url: "https://lexartlabs-backend.vercel.app/products/update",
      withCredentials: true,
      data: payload
    });
}

export const deleteProductsRequest = async (id) => {
    return axios({
      method: "delete",
      url: `https://lexartlabs-backend.vercel.app/products/delete/${id}`,
      withCredentials: true,
    });
}

export const createProductsRequest = async (payload) => {
    return axios({
      method: "post",
      url: `https://lexartlabs-backend.vercel.app/products/create`,
      withCredentials: true,
      data: payload
    });
}

export const searchProductsRequest = async (query) => {
    return axios({
      method: "get",
      url: `https://lexartlabs-backend.vercel.app/products/search?q=${query}`,
      withCredentials: true,
    });
}
