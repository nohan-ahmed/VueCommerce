import { defineStore } from 'pinia';
import { ref } from 'vue';
import bucketService from '@/appwrite/bucket'; // Import your existing service
import appwriteConf from '@/config/conf';
import { Field } from 'vee-validate';

export const useBucketStore = defineStore('bucketStore', () => {
  const files = ref([]);         // Holds the list of files
  const loading = ref(false);    // Tracks loading state
  const error = ref(null);       // Tracks errors

  // Fetch all files from the bucket
  const fetchFiles = async (queries = []) => {
    try {
      loading.value = true;
      error.value = null;
      files.value = await bucketService.listFiles(queries);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const getFile = async (fileID) => {
    try {
      error.value = null
      console.log(fileID);
      return await bucketService.getFile(fileID)

    } catch (err) {
      error.value = err.message
      console.log(err)
    }
  }

  // Upload a new file to the bucket
  const uploadFile = async (file) => {
    try {
      loading.value = true;
      error.value = null;
      const uploadedFile = await bucketService.uploadFile(file);
      files.value.push(uploadedFile);  // Update local state
      return uploadedFile
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateFile = async (fileID) => {
    try {
      error.value = null
      const updatedFile = await bucketService.updateFile(fileID)
      return updatedFile
    } catch (err) {
      error.value = err.message
    }
  }

  // Delete a file from the bucket
  const deleteFile = async (fileID) => {
    try {
      error.value = null;
      await bucketService.deleteFile(fileID);
      files.value = files.value.filter(file => file.$id !== fileID); // Remove from local state
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const filePreview = (fileID) => {
    try {
      error.value = null
      loading.value = true
      const url = bucketService.getFilePreview(fileID)
      return url
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    files,
    loading,
    error,
    fetchFiles,
    getFile,
    uploadFile,
    updateFile,
    deleteFile,
    filePreview
  };
});
