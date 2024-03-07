import axios from 'axios';

const token = localStorage.getItem("token")


export const getProductsRequest = async () => {
    return axios({
      method: "get",
      url: "https://lexartlabs-backend.vercel.app/products",
      headers: {
        Authorization: token
      }
    });
}

export const updateProductsRequest = async (payload) => {
    return axios({
      method: "put",
      url: "https://lexartlabs-backend.vercel.app/products/update",
      data: payload,
      headers: {
        Authorization: token
      }
    });
}

export const deleteProductsRequest = async (id) => {
    return axios({
      method: "delete",
      url: `https://lexartlabs-backend.vercel.app/products/delete/${id}`,
    });
}

export const createProductsRequest = async (payload) => {
    return axios({
      method: "post",
      url: `https://lexartlabs-backend.vercel.app/products/create`,
      data: payload,
      headers: {
        Authorization: token
      }
    });
}

export const searchProductsRequest = async (query) => {
    return axios({
      method: "get",
      url: `https://lexartlabs-backend.vercel.app/products/search?q=${query}`,
      headers: {
        Authorization: token
      }
    });
}
