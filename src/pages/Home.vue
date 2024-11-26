<template>
  <Default>
    <template #header>
      <NavBar />
      <CarouselSlider />
    </template>

    <template #default>
      <div class="container">
        <!-- Use v-row and v-col for grid layout -->
        <v-row>
          <v-col
            v-for="product in productStore.products"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <Product
              :product="product"
              @addToCart="cartStore.addToCart(product)"
              @wishlist="wishlistStore.addToWishlist(product)"
              @removeWishlist="wishlistStore.removeFromWishlist(product)"
            />
          </v-col>
        </v-row>
      </div>
    </template>
  </Default>
</template>

<script setup>
import CarouselSlider from "@/components/CarouselSlider.vue";
import NavBar from "@/components/NavBar.vue";
import Product from "@/components/Product.vue";
import Default from "@/layouts/Default.vue";
import { useCartStore, useProductStore, useWishlistStore } from "@/stores";
import { onMounted } from "vue";

// Props and emit defined here
const emit = defineEmits(["wishlist", "addToCart", "removeWishlist"]);

// Storage defined
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const productStore = useProductStore()

//
onMounted(async () => {
  await productStore.fetchProducts();
  console.log("products list: ", productStore.products);
});
</script>

<style scoped>
.container {
  margin-top: 20px;
  padding: 20px;
}
</style>
