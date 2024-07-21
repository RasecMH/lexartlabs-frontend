import PropTypes from 'prop-types';
import { useState } from 'react';
import EditAddedProductForm from './EditAddedProductForm';
import { FiEdit } from 'react-icons/fi';

const AddedProductsPreview = ({ produtos, onEdit }) => {
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const handleOpenModal = (produto, index) => {
    if (produtoSelecionado !== null) {
      setProdutoSelecionado(null);
    } else {
      produto.index = index;
      setProdutoSelecionado(produto);
    }
  };

  const handleCloseModal = () => {
    setProdutoSelecionado(null);
  };

  const handleEdit = (editedProduct, index) => {
    onEdit(editedProduct, index);
  };

  return (
    <div className='w-full self-start'>
      {produtos.map((produto, index) => (
        <div key={index}>
          <button
            className='btn w-full'
            onClick={() => handleOpenModal(produto, index)}>
            {produto.name}
            <FiEdit />
          </button>
        </div>
      ))}
      {produtoSelecionado && (
        <div className='top-0 left-0 w-full h-full flex items-center justify-center z-50'>
          <div className='modal-box w-11/12 max-w-5xl bg-white'>
            <EditAddedProductForm
              product={produtoSelecionado}
              index={produtoSelecionado.index}
              onEdit={handleEdit}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

AddedProductsPreview.propTypes = {
  produtos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          price: PropTypes.number.isRequired,
          color: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default AddedProductsPreview;
