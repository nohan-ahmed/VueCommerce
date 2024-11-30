<template>
  <Default>
    <template #default>
      <v-container fluid>
        <v-row>
          <!-- Filters Panel on the left -->
          <FiltersPanel v-model="filters" />

          <!-- Product Grid -->
          <v-col>
            <v-row>
              <v-col
                v-for="product in productStore.products"
                :key="product.id"
                cols="12"
                sm="6"
                md="4"
                lg="4"
              >
                <Product :product="product" />
              </v-col>
            </v-row>

            <!-- Pagination Component -->
            <v-pagination
              v-model="currentPage"
              :length="totalPages"
              @update:modelValue="handlePageChange"
              class="mt-4"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </Default>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { useProductStore } from "@/stores/productStore";
import FiltersPanel from "@/components/FiltersPanel.vue";
import Default from "@/layouts/Default.vue";
import Product from "@/components/Product.vue";
import { Query } from "appwrite";

// Define store
const productStore = useProductStore();

// Filters state
const filters = ref({
  minPrice: 0,
  maxPrice: 30,
  categories: [],
  minRating: 0,
});

// Pagination state
const currentPage = ref(1);
const itemsPerPage = 2; // Adjust based on preference

// Calculate total pages
const totalPages = computed(() => {
  return Math.ceil(productStore.totalProducts / itemsPerPage);
});

// Build query dynamically based on filters and pagination
const buildQuery = () => {
  let queryArray = [];

  // Add price filter (restored original logic)
  queryArray.push(
    Query.and([
      Query.lessThan("price", filters.value.maxPrice),
      Query.greaterThan("price", filters.value.minPrice),
    ])
  );

  // Add rating filter
  if (filters.value.minRating > 0) {
    queryArray.push(
      Query.greaterThanOrEqual("average_rating", filters.value.minRating)
    );
  }

  // Add pagination filters
  queryArray.push(Query.limit(itemsPerPage));
  queryArray.push(Query.offset((currentPage.value - 1) * itemsPerPage));

  return queryArray;
};

// Fetch products based on current filters and pagination
const fetchProducts = async () => {
  const queries = buildQuery();
  await productStore.fetchProducts(queries);
};

// Handle page change
const handlePageChange = (page) => {
  currentPage.value = page;
  fetchProducts(); // Fetch new page data
};

// Watch filters and refetch products when they change
watch(
  filters,
  () => {
    currentPage.value = 1; // Reset to first page on filter change
    fetchProducts();
  },
  { deep: true, immediate: true }
);

// Fetch products on component mount
onMounted(fetchProducts);
</script>
