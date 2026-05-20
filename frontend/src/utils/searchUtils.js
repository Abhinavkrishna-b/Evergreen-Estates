//utils contain the functions that don't render the UI   

export const parsePriceRange = (rangeString) => {
  let minPrice = '';
  let maxPrice = '';

  switch (rangeString) {
    case 'Under ₹1L':
      maxPrice = '100000';
      break;
    case '₹1L - ₹50L':
      minPrice = '100000';
      maxPrice = '5000000';
      break;
    case '₹50L - ₹1Cr':
      minPrice = '5000000';
      maxPrice = '10000000';
      break;
    case '₹1Cr+':
      minPrice = '10000000';
      break;
    default:
      // Includes 'All' or empty string
      break;
  }

  return { minPrice, maxPrice };
};