import PropTypes from 'prop-types';
import { useState } from 'react';
import { GoChevronUp, GoChevronDown } from 'react-icons/go';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import EditForm from './EditForm';

const ProductsTable = ({ products, onSave, onDelete }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [editedProduct, setEditedProduct] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc',
  });

  const handleDelete = (id) => {
    onDelete(id);
  };

  const openEditModal = (product) => {
    setShowEditModal(true);
    setEditedProduct(product);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditedProduct(null);
  };

  const sortTable = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = products.slice().sort((a, b) => {
    if (sortConfig.key && a[sortConfig.key] && b[sortConfig.key]) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th>
              <button
                className='flex items-center'
                onClick={() => sortTable('name')}>
                Name
                {sortConfig.key === 'name' && (
                  <>
                    {sortConfig.direction === 'asc' ? (
                      <GoChevronUp />
                    ) : (
                      <GoChevronDown />
                    )}
                  </>
                )}
              </button>
            </th>
            <th>
              <button
                className='flex items-center'
                onClick={() => sortTable('brand')}>
                Brand
                {sortConfig.key === 'brand' && (
                  <>
                    {sortConfig.direction === 'asc' ? (
                      <GoChevronUp />
                    ) : (
                      <GoChevronDown />
                    )}
                  </>
                )}
              </button>
            </th>
            <th>
              <button
                className='flex items-center'
                onClick={() => sortTable('model')}>
                Model
                {sortConfig.key === 'model' && (
                  <>
                    {sortConfig.direction === 'asc' ? (
                      <GoChevronUp />
                    ) : (
                      <GoChevronDown />
                    )}
                  </>
                )}
              </button>
            </th>
            <th>
              <button
                className='flex items-center'
                onClick={() => sortTable('price')}>
                Price
                {sortConfig.key === 'price' && (
                  <>
                    {sortConfig.direction === 'asc' ? (
                      <GoChevronUp />
                    ) : (
                      <GoChevronDown />
                    )}
                  </>
                )}
              </button>
            </th>
            <th>
              <button
                className='flex items-center'
                onClick={() => sortTable('color')}>
                Color
                {sortConfig.key === 'color' && (
                  <>
                    {sortConfig.direction === 'asc' ? (
                      <GoChevronUp />
                    ) : (
                      <GoChevronDown />
                    )}
                  </>
                )}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.model}</td>
              <td>{product.price}</td>
              <td>{product.color}</td>
              <td>
                <button onClick={() => openEditModal(product)}>
                  <FiEdit />
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(product.id)}>
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {showEditModal && (
        <div className='fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center'>
          <EditForm
            product={editedProduct}
            onClose={closeEditModal}
            onSave={onSave}
          />
        </div>
      )}
    </div>
  );
};

ProductsTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ProductsTable;
