import { useEffect, useState } from 'react';
import { validateRequest } from '../services/usersAPI';
import { createProductsRequest } from '../services/productsAPI';
import { useNavigate } from 'react-router-dom';
import OldAddProductForm from '../components/OldAddProductForm';
import NewAddProductForm from '../components/NewAddProductForm';
import BulkAddProductForm from '../components/BulkAddProductForm';
import AddedProductsPreview from '../components/AddedProductsPreview';
import NavBar from '../components/NavBar';

const CreateProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [structureType, setStructureType] = useState('structure1');

  const navigate = useNavigate();
  useEffect(() => {
    const auth = async () => {
      try {
        const token = localStorage.getItem('token');
        await validateRequest(token);
      } catch (error) {
        navigate('/');
      }
    };

    auth();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddSingleProduct = (product) => {
    onAdd(product);
  };

  const handleAdd = (newProduct) => {
    setAllProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const handleEdit = (newProduct, index) => {
    const newAllProducts = [...allProducts];
    newAllProducts[index] = newProduct;
    setAllProducts(newAllProducts);
  };

  const handleAddAllProducts = () => {
    onAdd(allProducts);
    setAllProducts([]);
  };

  const onAdd = async (product) => {
    try {
      await createProductsRequest(product);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStructure = (newStructure) => {
    setStructureType(newStructure);
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
      <div className='  w-1/5'>
        <ul className='menu bg-base-200 w-full rounded-box'>
          <li>
            <a
              onClick={() => handleChangeStructure('structure1')}
              className={structureType === 'structure1' ? 'active' : ''}>
              Estrutura 1
            </a>
          </li>
          <li>
            <a
              onClick={() => handleChangeStructure('structure2')}
              className={structureType === 'structure2' ? 'active' : ''}>
              Estrutura 2
            </a>
          </li>
          <li>
            <a
              onClick={() => handleChangeStructure('structure3')}
              className={structureType === 'structure3' ? 'active' : ''}>
              Estrutura 3
            </a>
          </li>
          <li>
            <a onClick={() => navigate('/dashboard')}>Cancel</a>
          </li>
        </ul>
      </div>
      <div className='divider divider-horizontal'></div>
      <div className='flex flex-col items-center justify-center h-screen w-2/3'>
        <div className=' w-full h-full flex items-center justify-center z-50'>
          {structureType === 'structure1' && (
            <OldAddProductForm onAdd={handleAddSingleProduct} />
          )}

          {structureType === 'structure2' && (
            <NewAddProductForm onAdd={handleAddSingleProduct} />
          )}

          {structureType === 'structure3' && (
            <div className='flex items-center'>
              <BulkAddProductForm onAdd={handleAdd} />
              <div className='divider divider-horizontal'></div>
              <AddedProductsPreview
                produtos={allProducts}
                onEdit={handleEdit}
              />
              <div className='divider divider-horizontal'></div>
              <div className='w-full'>
                <details className='dropdown w-full'>
                  <summary className='btn w-full'>Json Preview</summary>
                  <div className='mockup-code'>
                    <pre>
                      <code>{JSON.stringify(allProducts, null, '\t')}</code>
                    </pre>
                  </div>
                </details>
                <button
                  className='btn w-full mt-4'
                  onClick={handleAddAllProducts}>
                  Create Products
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
