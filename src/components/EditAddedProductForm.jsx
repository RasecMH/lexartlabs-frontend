import PropTypes from 'prop-types';
import { useState } from 'react';

const EditAddedProductForm = ({ product, index, onEdit, onClose }) => {
  const [newProduct, setNewProduct] = useState({
    name: product.name,
    brand: product.brand,
    model: product.model,
    data: product.data,
  });

  const handleAddInputChange = (index, e) => {
    const { name, value } = e.target;
    const newInputs = [...newProduct.data];
    newInputs[index][name] = value;

    setNewProduct((prevProduct) => ({
      ...prevProduct,
      data: newInputs,
    }));
  };

  const handleAddInput = () => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      data: [...prevProduct.data, {}],
    }));
  };

  const handleRemoveInput = (index) => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      data: prevProduct.data.filter((item, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmitSingleProduct = (e) => {
    e.preventDefault();
    onEdit(newProduct, index);
    onClose();
  };

  return (
    <div className='bg-white text-white z-50 flex items-center justify-center'>
      <form onSubmit={handleSubmitSingleProduct}>
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
              value={newProduct.brand}
              required
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
              value={newProduct.model}
              required
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          {newProduct.data?.map((value, index) => (
            <div key={index} className='m-2 indicator'>
              {newProduct.data.length > 1 && (
                <span
                  className='indicator-item badge badge-primary'
                  onClick={() => handleRemoveInput(index)}>
                  Remove
                </span>
              )}
              <div>
                <div>
                  <label className='input input-bordered flex items-center gap-2'>
                    Price:
                    <input
                      type='number'
                      name='price'
                      className='input text-white'
                      value={value.price}
                      required
                      onChange={(e) => handleAddInputChange(index, e)}
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
                      value={value.color}
                      required
                      onChange={(e) => handleAddInputChange(index, e)}
                    />
                  </label>
                </div>
                {index === newProduct.data.length - 1 && (
                  <button
                    className='btn w-full'
                    type='button'
                    onClick={handleAddInput}>
                    Add Price and Color
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button type='submit' className='btn'>
          Save
        </button>
        <button type='button' className='btn' onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

EditAddedProductForm.propTypes = {
  index: PropTypes.number.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        price: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditAddedProductForm;
