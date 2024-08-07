import { useState } from 'react';
import PropTypes from 'prop-types';

function FiltroProdutos({ products, onFilter, minPrice, maxPrice }) {
  const [filtroCores, setFiltroCores] = useState([]);
  const [filtroMarcas, setFiltroMarcas] = useState([]);
  const [filtroPrecoMin, setFiltroPrecoMin] = useState(minPrice);
  const [filtroPrecoMax, setFiltroPrecoMax] = useState(maxPrice);

  const coresDisponiveis = [
    ...new Set(products.map((product) => product.color)),
  ];
  const marcasDisponiveis = [
    ...new Set(products.map((product) => product.brand)),
  ];

  const handleFilter = () => {
    const filteredProducts = products.filter((product) => {
      const corMatch =
        filtroCores.length === 0 || filtroCores.includes(product.color);
      const marcaMatch =
        filtroMarcas.length === 0 || filtroMarcas.includes(product.brand);
      const precoMinMatch =
        filtroPrecoMin === 0 ||
        parseFloat(product.price) >= parseFloat(filtroPrecoMin);
      const precoMaxMatch =
        filtroPrecoMax === 0 ||
        parseFloat(product.price) <= parseFloat(filtroPrecoMax);
      return corMatch && marcaMatch && precoMinMatch && precoMaxMatch;
    });
    onFilter(filteredProducts);
  };

  return (
    <div>
      <h2>Filtrar Produtos</h2>
      <div>
        <label>Cor:</label>
        <div>
          {coresDisponiveis.map((cor) => (
            <div key={cor}>
              <input
                type='checkbox'
                id={cor}
                value={cor}
                checked={filtroCores.includes(cor)}
                onChange={() => {
                  setFiltroCores((prevCores) =>
                    prevCores.includes(cor)
                      ? prevCores.filter((c) => c !== cor)
                      : [...prevCores, cor]
                  );
                }}
              />
              <label htmlFor={cor}>{cor}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label>Marca:</label>
        <div>
          {marcasDisponiveis.map((marca) => (
            <div key={marca}>
              <input
                type='checkbox'
                id={marca}
                value={marca}
                checked={filtroMarcas.includes(marca)}
                onChange={() => {
                  setFiltroMarcas((prevMarcas) =>
                    prevMarcas.includes(marca)
                      ? prevMarcas.filter((m) => m !== marca)
                      : [...prevMarcas, marca]
                  );
                }}
              />
              <label htmlFor={marca}>{marca}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label>Preço Mínimo:</label>
        <input
          type='number'
          value={filtroPrecoMin || minPrice}
          className='text-white'
          onChange={(e) => setFiltroPrecoMin(e.target.value)}
        />
      </div>
      <div>
        <label>Preço Máximo:</label>
        <input
          type='number'
          value={filtroPrecoMax || maxPrice}
          className='text-white'
          onChange={(e) => setFiltroPrecoMax(e.target.value)}
        />
      </div>
      <button onClick={handleFilter}>Filtrar</button>
    </div>
  );
}

FiltroProdutos.propTypes = {
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
  onFilter: PropTypes.func.isRequired,
  minPrice: PropTypes.number.isRequired,
  maxPrice: PropTypes.number.isRequired,
};

export default FiltroProdutos;
