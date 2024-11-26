import databaseService from "@/appwrite/database";
import appwriteConf from "@/config/conf";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useReviewStore = defineStore('reviewStore', () => {
  // State
  const reviews = ref([]); // Holds the list of reviews.
  const review = ref(null); // Holds a single review.
  const loading = ref(false); // Tracks loading state
  const error = ref(null); // Tracks any errors
  const collectionID = appwriteConf.reviewsCollectionID

  // Actions
  const fetchReviews = async (queries = []) => {
    try {
      loading.value = true
      error.value = null;
      console.log("Collection id: ", collectionID);
      const response = await databaseService.getListDocuments(collectionID, queries)
      reviews.value = response.documents || [];
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }


  const fetchReviewById = async (reviewID) => {
    try {
      loading.value = true
      error.value = null
      review.value = await databaseService.getDocument(collectionID, reviewID)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }


  const addReview = async (data) => {
    try {
      error.value = null
      const newReview = await databaseService.createDocument(collectionID, data)
      reviews.value.push(newReview) // Update local state
      return newReview
    } catch (err) {
      error.value = err.message
    }
  }

  const updateReview = async (reviewID, data) => {
    try {
      error.value = null
      const updatedReview = await databaseService.updateDocument(collectionID, reviewID, data)
      // Update local state
      const index = reviews.value.findIndex((rev) => rev.$id === reviewID);
      if (index !== -1) reviews.value[index] = updatedReview;
      return updatedReview;

    } catch (err) {
      error.value = err.message

    }
  }

  const deleteReview = async (reviewID) => {
    try {
      error.value = null
      await databaseService.deleteDocument(collectionID, reviewID)
      // Remove product from local state
      reviews.value = reviews.value.filter((rev) => rev.$id !== reviewID)
    } catch (err) {
      error.value = err.message
    }
  }
  // Return state and actions
  return { reviews, review, error, loading, fetchReviews, fetchReviewById, addReview, updateReview, deleteReview}
})
