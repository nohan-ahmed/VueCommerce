import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import databaseService from '@/appwrite/database';
import appwriteConf from '@/config/conf';
import { useCalculateDiscount } from '@/composables';

export const useProductStore = defineStore('productStore', () => {
  // State
  const products = ref([]); // Holds the list of products
  const product = ref(null); // Holds a single product
  const loading = ref(false); // Tracks loading state
  const error = ref(null); // Tracks any errors
  const collectionID = appwriteConf.productsCollectionID

  // Actions
  const fetchProducts = async (queries = []) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await databaseService.getListDocuments(collectionID, queries);
      products.value = response.documents || [];
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchProductById = async (productID) => {
    try {
      loading.value = true;
      error.value = null;
      product.value = await databaseService.getDocument(collectionID, productID);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const addProduct = async (data) => {
    try {
      error.value = null;
      // Calculate discount
      const { discountValue, discountPercentage } = useCalculateDiscount(
        data.regular_price,
        data.price
      );
      data.discount = parseFloat(discountPercentage)

      const newProduct = await databaseService.createDocument(collectionID, data);
      // console.log('add new product: ', newProduct);
      products.value.push(newProduct); // Update local state
      return newProduct;
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const updateProduct = async (productID, { thumbnail, name, regular_price, price, categories, description, quantity }) => {
    try {
      error.value = null;
      // Calculate discount
      const discount = parseFloat(useCalculateDiscount(regular_price, price).discountPercentage);
      // Update the doc
      const updatedProduct = await databaseService.updateDocument(collectionID, productID, { thumbnail, name, regular_price, price, discount, categories, description, quantity });
      // Update local state
      const index = products.value.findIndex((prod) => prod.$id === productID);
      if (index !== -1) products.value[index] = updatedProduct;

      return updatedProduct;
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };
  
  const deleteProduct = async (productID) => {
    try {
      error.value = null;

      await databaseService.deleteDocument(collectionID, productID);
      // Remove product from local state
      products.value = products.value.filter((prod) => prod.$id !== productID);
    } catch (err) {
      error.value = err.message;
      // throw err;
    }
  };

  // Function to update average rating in the product document
  async function updateAverageRating(productID) {
    try {
      error.value = null
      // Find the product in the local state to avoid an additional fetch
      const productToUpdate = products.value.find((prod) => prod.$id === productID);
      if (!productToUpdate) {
        throw new Error('Product not found in local state');
      }

      // Extract reviews array from the product
      const reviews = productToUpdate.reviews || [];

      // Check if there are reviews
      if (reviews.length === 0) {
        console.log("No reviews available for this product.");
        return; // No update needed if there are no reviews
      }

      // Calculate the average rating directly
      const totalRatingSum = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
      const averageRating = parseFloat((totalRatingSum / reviews.length).toFixed(2));

      // Check if the average rating has changed to avoid unnecessary updates
      if (productToUpdate.average_rating === averageRating) {
        console.log("Average rating is already up-to-date.");
        return;
      }

      // Update the product document with the new average rating
      const updatedProduct = await databaseService.updateDocument(
        collectionID,
        productID,
        { average_rating: averageRating } // Update only the average_rating field
      );

      // Update the local state with the new average rating
      const index = products.value.findIndex((prod) => prod.$id === productID);
      if (index !== -1) products.value[index].average_rating = averageRating;

      console.log(`Average rating updated successfully: ${averageRating}`);
      return updatedProduct;
    } catch (err) {
      error.value = err.message
      console.error("Error updating average rating:", error);
    }
  }

  const isStoke = (product) => {
    if (product.quantity === 0) {
      return "OUTOFSTOCK"
    }
    else if (product.quantity <= 3 && product.quantity > 0) {
      return 'LOWSTOCK'
    }
    return 'INSTOCK'
  }


  // Return state and actions
  return {
    products,
    product,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    updateAverageRating,
    isStoke
  };
});
