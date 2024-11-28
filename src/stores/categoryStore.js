import databaseService from "@/appwrite/database";
import appwriteConf from "@/config/conf";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategoryStore = defineStore('categoryStore', () => {
  const categories = ref([])
  const category = ref(null)
  const error = ref(null)
  const loading = ref(false)
  const collectionID = appwriteConf.categoryCollectionID
  // Action
  const fetchCategories = async (queries = []) => {
    try {
      loading.value = true
      error.value = null
      const response = await databaseService.getListDocuments(collectionID, queries)
      categories.value = response.documents || []

    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }

  }

  const fetchCategoryById = async (categoryID) => {
    try {
      loading.value = true
      error.value = null
      category.value = await databaseService.getDocument(collectionID, categoryID)
    } catch (err) {
      error.value = err.message

    } finally {
      loading.value = false
    }
  }

  const addCategory = async (data) => {
    try {
      error.value = null
      const newCategory = await databaseService.createDocument(collectionID, data)
      categories.value.push(newCategory) // Update local state
      return category
    } catch (err) {
      error.value = err.message
    }
  }

  const updateCategory = async (categoryID, data) => {
    try {
      error.value = null
      const updatedCategory = await databaseService.updateDocument(collectionID, categoryID, data)
      // Update local state
      const index = categories.value.findIndex((cat) => cat.$id === categoryID);
      if (index !== -1) categories.value[index] = updatedCategory;

      return updatedCategory;
    } catch (err) {
      error.value = err.message
    }
  }

  const deleteCategory = async (categoryID) => {
    try {
      error.value = null
      await databaseService.deleteDocument(collectionID, categoryID)
      // Remove product from local state
      categories.value = categories.value.filter((cat) => cat.$id !== categoryID);

    } catch (err) {
      error.value = err.message
    }
  }

  return { categories, category, loading, error, fetchCategories, fetchCategoryById, addCategory, updateCategory, deleteCategory }

})
