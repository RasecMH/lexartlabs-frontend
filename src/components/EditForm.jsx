import PropTypes from 'prop-types';
import { useState } from 'react';

const EditForm = ({ product, onSave, onClose }) => {
  const [editedProduct, setEditedProduct] = useState({
    id: product.id,
    name: product.name,
    brand: product.brand,
    model: product.model,
    price: product.price,
    color: product.color,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedProduct);
    onClose();
  };

  return (
    <div className='modal-box bg-white text-white'>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='input input-bordered flex items-center gap-2'>
            Name:
            <input
              type='text'
              name='name'
              className='grow'
              value={editedProduct.name}
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
              value={editedProduct.brand}
              onChange={handleChange}
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
              value={editedProduct.model}
              onChange={handleChange}
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
              value={editedProduct.price}
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
              value={editedProduct.color}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type='submit' className='btn'>
          Save
        </button>
        <button type='button' className='btn' onClick={onClose}>
          Cancel
        </button>
      </form>

      <div className='mockup-code'>
        <pre>
          <code>{JSON.stringify(editedProduct, null, '\t')}</code>
        </pre>
      </div>
    </div>
  );
};

EditForm.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditForm;
