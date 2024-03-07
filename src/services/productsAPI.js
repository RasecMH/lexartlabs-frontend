import axios from 'axios';

export const getProductsRequest = async () => {
    return axios({
      method: "get",
      url: "http://localhost:3001/products",
      withCredentials: true,
    });
}

export const updateProductsRequest = async (payload) => {
    return axios({
      method: "put",
      url: "http://localhost:3001/products/update",
      withCredentials: true,
      data: payload
    });
}

export const deleteProductsRequest = async (id) => {
    return axios({
      method: "delete",
      url: `http://localhost:3001/products/delete/${id}`,
      withCredentials: true,
    });
}

export const createProductsRequest = async (payload) => {
    return axios({
      method: "post",
      url: `http://localhost:3001/products/create`,
      withCredentials: true,
      data: payload
    });
}

export const searchProductsRequest = async (query) => {
    return axios({
      method: "get",
      url: `http://localhost:3001/products/search?q=${query}`,
      withCredentials: true,
    });
}
