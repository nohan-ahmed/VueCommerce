import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCartStore = defineStore('cartStore', () => {
  const items = ref([])
  
  const allCartItems = computed(()=>items.value)
  const totalItems = computed(()=>items.value.length)

  const addToCart = (item) => {
    items.value.push(item)
  }

  const removeFromCart = (itemId) => {
    items.value = items.value.filter(item => item.id !== itemId)
  }

  return {
    items,
    allCartItems,
    totalItems,
    addToCart,
    removeFromCart
  }
})
