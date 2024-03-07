import { useState } from 'react';
import PropTypes from 'prop-types';

function SearchBar({ onSearch }) {
  const [termoPesquisa, setTermoPesquisa] = useState('');

  const handleSearch = () => {
    onSearch(termoPesquisa);
  };

  return (
    <div className='bg-white'>
      <input
        type='text'
        className='input text-white'
        value={termoPesquisa}
        onChange={(e) => setTermoPesquisa(e.target.value)}
        placeholder='Pesquisar...'
      />
      <button className='btn' onClick={handleSearch}>
        Pesquisar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
