import PropTypes from 'prop-types';
import { useState } from 'react';

const BulkAddProductForm = ({ onAdd }) => {
  const [newProduct, setNewProduct] = useState({ data: [{}] });

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
    onAdd(newProduct);
    const newProductData = {
      name: '',
      brand: '',
      model: '',
      data: [{ price: '', color: '' }],
    };
    setNewProduct(newProductData);
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
              onChange={handleChange}
              required
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
              onChange={handleChange}
              required
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
              onChange={handleChange}
              required
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

        <div className='flex justify-between my-3'>
          <button type='submit' className='btn'>
            Save to Queue
          </button>
        </div>
        <details className='dropdown w-full'>
          <summary className='btn w-full'>Json</summary>
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

BulkAddProductForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BulkAddProductForm;
