<!-- src/views/ShopPage.vue -->
<template>
  <v-container fluid>
    <!-- Filter Section -->
    <v-card class="mb-4" flat>
      <v-card-text>
        <v-row>
          <!-- Price Filter -->
          <v-col cols="12" sm="4">
            <v-range-slider
              v-model="filters.priceRange"
              :min="0"
              :max="1000"
              label="Price Range"
              thumb-label="always"
              color="primary"
            ></v-range-slider>
          </v-col>

          <!-- Category Filter -->
          <v-col cols="12" sm="4">
            <v-select
              v-model="filters.categories"
              :items="categories"
              label="Categories"
              multiple
              chips
            ></v-select>
          </v-col>

          <!-- Rating Filter -->
          <v-col cols="12" sm="4">
            <v-slider
              v-model="filters.minRating"
              :min="0"
              :max="5"
              label="Minimum Rating"
              thumb-label="always"
              step="0.5"
              color="amber"
            ></v-slider>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Product Grid -->
    <v-row>
      <v-col
        v-for="product in productStore.filteredProducts"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';
import ProductCard from '@/components/ProductCard.vue';

const productStore = useProductStore();
const filters = productStore.filters;

// Example category options (replace with API data if available)
const categories = [
  { text: 'Electronics', value: 1 },
  { text: 'Clothing', value: 2 },
  { text: 'Books', value: 3 },
];

// Fetch products on component mount
onMounted(async () => {
  await productStore.fetchProducts();
});
</script>

<style scoped>
.v-container {
  padding: 20px;
}
</style>
