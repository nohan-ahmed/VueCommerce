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
          <v-col cols="12" sm="6" md="4" lg="3">
            <Product
              :product="product"
              @addToCart="cartStore.addToCart(product)"
              @wishlist="wishlistStore.addToWishlist(product)"
              @removeWishlist="wishlistStore.removeFromWishlist(product)"
            />
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3">
            <Product :product="product" />
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3">
            <Product :product="product" />
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3">
            <Product :product="product" />
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3">
            <Product :product="product" />
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3">
            <Product :product="product" />
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3">
            <Product :product="product" />
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
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";


// normal code
const product = {
  id: 1,
  discount: 40,
  name: "Product 1",
  regular_price: 200,
  price: 100,
  thumbnail:
    "https://template.getbazaar.io/_next/image?url=%2Fassets%2Fimages%2FGift%20Shop%2FProduct%204.png&w=1920&q=75",
  category: "tech",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et velit vel sapien consectetur gravida.",
  reviews: {
    rating: 4.5,
    count: 100,
  },
};

const emit = defineEmits(["wishlist", "addToCart", 'removeWishlist']);

const cartStore = useCartStore();
const wishlistStore = useWishlistStore();


</script>

<style scoped>
.container {
  margin-top: 20px;
  padding: 20px;
}
</style>
