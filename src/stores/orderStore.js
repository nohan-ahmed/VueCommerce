import databaseService from "@/appwrite/database";
import appwriteConf from "@/config/conf";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useOrderStore = defineStore('orderStore', () => {
  const orders = ref([])
  const order = ref(null)
  const error = ref(null)
  const loading = ref(false)
  const collectionID = appwriteConf.ordersCollectionID
  // Action
  const fetchOrders = async (queries = []) => {
    try {
      loading.value = true
      error.value = null
      const response = await databaseService.getListDocuments(collectionID, queries)
      orders.value = response.documents || []
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }

  }

  const fetchOrderById = async (orderID) => {
    try {
      loading.value = true
      error.value = null
      order.value = await databaseService.getDocument(collectionID, orderID)
    } catch (err) {
      error.value = err.message

    } finally {
      loading.value = false
    }
  }

  const addOrder = async (data) => {
    try {
      error.value = null
      const newOrder = await databaseService.createDocument(collectionID, data)
      orders.value.push(newOrder)
      return newOrder
    } catch (err) {
      error.value = err.message
    }
  }

  const updateOrder = async (orderID, data) => {
    try {
      error.value = null
      const updatedOrder = await databaseService.updateDocument(collectionID, orderID, data)
      // Update local state
      const index = orders.value.findIndex((ord) => ord.$id === orderID);
      if (index !== -1) orders.value[index] = updatedOrder;

      return updatedOrder;
    } catch (err) {
      error.value = err.message
    }
  }

  const deleteOrder = async (orderID) => {
    try {
      error.value = null
      await databaseService.deleteDocument(collectionID, orderID)
      // Remove product from local state
      orders.value = orders.value.filter((ord) => ord.$id !== orderID);

    } catch (err) {
      error.value = err.message
    }
  }

  return { orders, order, loading, error, fetchOrders, fetchOrderById, addOrder, updateOrder, deleteOrder }

})
