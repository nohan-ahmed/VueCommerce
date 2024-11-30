<template>
  <Default>
    <template #header>
      <NavBar />
      <CarouselSlider />
    </template>

    <template #default>
      <div class="">
        <!-- Category section -->
        <section>
          <h2 class="mb-3 font-weight-bold ml-2">Shop by Category</h2>
          <CardSlider
            :items="categoryStore.categories"
            @riderectRoute="riderectRouteHandle"
          />
        </section>

        <!-- Use v-row and v-col for grid layout -->
        <div class="container">
          <h2 class="mt-10 font-weight-bold ml-2">Tranding products</h2>

          <v-row class="mt-3">
            <v-col
              v-for="product in productStore.products"
              cols="12"
              sm="4"
              md="3"
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
      </div>
    </template>
  </Default>
</template>

<script setup>
import CardSlider from "@/components/cardSlider.vue";
import NavBar from "@/components/NavBar.vue";
import Product from "@/components/Product.vue";
import Default from "@/layouts/Default.vue";
import router from "@/router";
import {
  useCartStore,
  useCategoryStore,
  useProductStore,
  useWishlistStore,
} from "@/stores";
import { onMounted, ref } from "vue";

// Define Props and emit defined here
const emit = defineEmits([
  "wishlist",
  "addToCart",
  "removeWishlist",
  "riderectRoute",
]);

// Storage defined
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const productStore = useProductStore();
const categoryStore = useCategoryStore();
//
onMounted(async () => {
  await productStore.fetchProducts();
  await categoryStore.fetchCategories();
  // console.log("products list: ", productStore.products);
});

// Event handling.
const riderectRouteHandle = (cat) => {
  router.push({ name: "Shop", params: { cat: cat.$id } });
};
</script>

<style scoped>
.container {
  margin-top: 20px;
  padding: 20px;
}
</style>
