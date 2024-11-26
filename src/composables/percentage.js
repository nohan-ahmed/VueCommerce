/**
 * Calculate the discount value and percentage.
 *
 * @param {number} regular_price - The original price of the product.
 * @param {number} price - The discounted price of the product.
 * @returns {object} - An object containing the discount value and percentage.
 */

export default function useCalculateDiscount(regular_price, price) {
  if (regular_price <= 0 || price < 0 || price > regular_price) {
    throw new Error("Invalid prices provided.");
  }

  const discountValue = regular_price - price;
  const discountPercentage = (discountValue / regular_price) * 100;

  return {
    discountValue: discountValue,
    discountPercentage: discountPercentage.toFixed(2)
  };
}
