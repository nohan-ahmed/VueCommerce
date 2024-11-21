import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref([])

  const allWishlistItems = computed(() => items.value)
  const totalItems = computed(() => items.value.length)

  const addToWishlist = (item) => {
    console.log('add...', item);
    items.value.push(item)
  }

  const removeFromWishlist = (product) => {
    console.log('remove...', product);
    items.value = items.value.filter(item => item.id !== product.id)
  }

  const isWishlist = (product) => {
    return items.value.some(item => item.id === product.id)
  }

  return {
    items,
    allWishlistItems,
    totalItems,
    addToWishlist,
    removeFromWishlist,
    isWishlist,
  }
})
