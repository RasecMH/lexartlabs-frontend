import { useEffect, useState } from 'react';
import { validateRequest } from '../services/usersAPI';
import {
  deleteProductsRequest,
  getProductsRequest,
  searchProductsRequest,
  updateProductsRequest,
} from '../services/productsAPI';
import { useNavigate } from 'react-router-dom';
import ProductsTable from '../components/ProductsTable';
import Filter from '../components/Filter';
import SearchBar from '../components/SearchBar';
import NavBar from '../components/NavBar';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const auth = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        await validateRequest(token);
      } catch (error) {
        // navigate('/');
      }
    };

    const getProducts = async () => {
      try {
        const { data } = await getProductsRequest();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    auth();
    getProducts();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFilter = (products) => {
    setFilteredProducts(products);
  };

  const onSearch = async (query) => {
    try {
      const { data } = await searchProductsRequest(query);
      setFilteredProducts(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (product) => {
    try {
      const { data } = await updateProductsRequest(product);
      setFilteredProducts(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProductsRequest(id);
      setFilteredProducts((prevData) =>
        prevData.filter((item) => item.id !== id)
      );
      setProducts((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className='
    h-screen
    v-screen
    flex
    items-center
    aling-center
    justify-center
    hero
    bg-white
    '>
      <NavBar />
      <div className='bg-white text-black ml-5'>
        <Filter products={products} onFilter={onFilter} />
      </div>
      <div className='divider divider-horizontal'></div>
      <div className='flex flex-col items-center justify-center h-screen w-full'>
        <div className='w-3/4 bg-white text-black'>
          <div className='flex justify-between'>
            <button className='btn' onClick={() => navigate('/create-product')}>
              Add Product
            </button>
            <SearchBar onSearch={onSearch} />
          </div>
          <div className='divider'></div>

          <ProductsTable
            products={filteredProducts.length ? filteredProducts : products}
            onSave={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
