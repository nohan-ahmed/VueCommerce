<!-- src/components/FiltersPanel.vue -->
<template>
  <v-sheet class="pa-4 w-lg-25 w-25">
    <h3 class="text-h6 mb-4">Filters</h3>
    <!-- Category Filter -->
    <v-select
      v-model="filters.categories"
      :items="categories"
      label="Categories"
      multiple
      chips
    ></v-select>

    <!-- Price Filter -->
    <h4 class="text-h6 mb-2 text-center">Price Range</h4>
    <div class="d-md-flex ga-1">
      <v-text-field v-model.number="filters.minPrice" label="Min" prefix="$"></v-text-field>
      <v-text-field v-model.number="filters.maxPrice" label="Max" prefix="$"></v-text-field>
    </div>

    <!-- Rating Filter -->
    <h4 class="text-h6 text-center">Minimum Rating</h4>
    <v-slider
      v-model.number="filters.minRating"
      :min="0"
      :max="5"
      step="0.5"
      thumb-label="always"
      color="amber"
    ></v-slider>
  </v-sheet>
</template>

<script setup>
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";

// define v-model
const filters = defineModel();
console.log(filters);  // Should log the passed object directly

// Categories (Replace with dynamic data if available)
const categories = [
  { text: "Electronics", value: 1 },
  { text: "Clothing", value: 2 },
  { text: "Books", value: 3 },
];

// Responsive drawer control
const { lgAndUp } = useDisplay();

</script>
