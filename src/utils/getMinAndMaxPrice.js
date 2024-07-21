export const getMinAndMaxPrice = (products) => {
  const allPrices = products.map((product) => parseFloat(product.price));
  let minPrice = 0;
  let maxPrice = 0;
  if (allPrices.length > 0) {
    minPrice = Math.min(...allPrices);
    maxPrice = Math.max(...allPrices);
  }
  console.log(allPrices);
  return { minPrice, maxPrice };
};
