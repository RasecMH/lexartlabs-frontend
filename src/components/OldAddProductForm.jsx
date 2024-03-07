import PropTypes from 'prop-types';
import { useState } from 'react';

const OldAddProductForm = ({ onAdd, onClose }) => {
  const [newProduct, setNewProduct] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      details: {
        ...prevProduct.details,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newProduct);
    onClose();
  };

  return (
    <div className='modal-box bg-white text-white z-50'>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='input input-bordered flex items-center gap-2'>
            Name:
            <input
              type='text'
              name='name'
              className='grow'
              value={newProduct.name}
              required
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label className='input input-bordered flex items-center gap-2'>
            Brand:
            <input
              type='text'
              name='brand'
              className='input text-white'
              value={newProduct.details?.brand}
              required
              onChange={handleDetailsChange}
            />
          </label>
        </div>
        <div>
          <label className='input input-bordered flex items-center gap-3'>
            Model:
            <input
              type='text'
              name='model'
              className='grow'
              value={newProduct.details?.model}
              required
              onChange={handleDetailsChange}
            />
          </label>
        </div>
        <div>
          <label className='input input-bordered flex items-center gap-2'>
            Price:
            <input
              type='number'
              name='price'
              className='input text-white'
              value={newProduct.price}
              required
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label className='input input-bordered flex items-center gap-2'>
            Color:
            <input
              type='text'
              name='color'
              className='input text-white'
              value={newProduct.details?.color}
              required
              onChange={handleDetailsChange}
            />
          </label>
        </div>
        <div className='flex justify-between my-3'>
          <button type='submit' className='btn'>
            Create Product
          </button>
          <button type='button' className='btn' onClick={onClose}>
            Cancel
          </button>
        </div>
        <details className='dropdown w-full'>
          <summary className='btn w-full'>Json Preview</summary>
          <div className='mockup-code'>
            <pre>
              <code>{JSON.stringify(newProduct, null, '\t')}</code>
            </pre>
          </div>
        </details>
      </form>
    </div>
  );
};

OldAddProductForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OldAddProductForm;
