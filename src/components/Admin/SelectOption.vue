<template>
  <v-container>
    <v-select
      v-model="selectedItems"
      :items="fruits"
      label="Favorite Fruits"
      multiple
      @update:model-value="handleSelectionChange"
    >
      <!-- Select All Checkbox -->
      <template v-slot:prepend-item>
        <v-list-item @click="toggle">
          <template v-slot:prepend>
            <v-checkbox
              :indeterminate="likesSomeItems && !likesAllItems"
              :model-value="likesAllItems"
              color="indigo-darken-4"
            ></v-checkbox>
          </template>
          <v-list-item-title>Select All</v-list-item-title>
        </v-list-item>
        <v-divider class="mt-2"></v-divider>
      </template>

      <!-- Footer Section with Avatar -->
      <template v-slot:append-item>
        <v-divider class="mb-2"></v-divider>
        <v-list-item :subtitle="subtitle" :title="title" disabled>
          <template v-slot:prepend>
            <v-avatar color="primary" icon="mdi-food-apple"></v-avatar>
          </template>
        </v-list-item>
      </template>
    </v-select>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";


</script>

<style scoped>
.v-container {
  max-width: 600px;
}
</style>
