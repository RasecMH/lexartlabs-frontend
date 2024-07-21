export const getMinAndMaxPrice = (products) => {
  const allPrices = products.map((product) => product.price);
  let minPrice = 0;
  let maxPrice = 0;
  if (allPrices.length) {
    minPrice = Math.min(...allPrices);
    maxPrice = Math.max(...allPrices);
  }
  return { minPrice, maxPrice };
};
