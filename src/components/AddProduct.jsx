import { useState } from 'react';
import PropTypes from 'prop-types';
import BulkAddProductForm from './BulkAddProductForm';
import AddedProductsPreview from './AddedProductsPreview';
import OldAddProductForm from './OldAddProductForm';
import NewAddProductForm from './NewAddProductForm';

function AddProduct({ onAdd }) {
  const [modalAberto, setModalAberto] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const handleOpenModal = () => {
    setModalAberto(true);
  };

  const handleCloseModal = () => {
    setModalAberto(false);
  };

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
    handleCloseModal();
  };

  return (
    <div>
      <button className='btn' onClick={handleOpenModal}>
        Add Product
      </button>
      {modalAberto && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
          <div className='modal-box w-11/12 max-w-5xl bg-white'>
            <h1 className='text-center text-2xl mb-5'>SELECIONE A ESTRUTURA</h1>
            <div role='tablist' className='tabs tabs-bordered text-black'>
              <input
                type='radio'
                name='my_tabs_1'
                role='tab'
                className='tab text-black'
                aria-label='Estrutura 1'
              />
              <div role='tabpanel' className='tab-content p-10'>
                <OldAddProductForm
                  onAdd={handleAddSingleProduct}
                  onClose={handleCloseModal}
                />
              </div>

              <input
                type='radio'
                name='my_tabs_1'
                role='tab'
                className='tab text-black'
                aria-label='Estrutura 2'
              />
              <div role='tabpanel' className='tab-content p-10'>
                <NewAddProductForm
                  onAdd={handleAddSingleProduct}
                  onClose={handleCloseModal}
                />
              </div>

              <input
                type='radio'
                name='my_tabs_1'
                role='tab'
                className='tab text-black'
                aria-label='Bulk - Estrutura 3'
              />
              <div role='tabpanel' className='tab-content p-10'>
                <div className='flex items-center'>
                  <BulkAddProductForm
                    onClose={handleCloseModal}
                    onAdd={handleAdd}
                  />
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

AddProduct.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddProduct;
