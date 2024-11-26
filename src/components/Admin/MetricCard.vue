<template>
  <v-card class="pa-5" elevation="2" >
    <v-card-title class="text-h6 d-flex align-center">
      <v-icon class="mr-2">{{ icon }}</v-icon>
      {{ title }}
    </v-card-title>
    <v-card-text class="text-h4 font-weight-bold">
      {{ value }}
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  title: String,
  value: String,
  icon: String,
});
</script>

<style scoped>
.v-card {
  background-color: grey-darken-4;
}
</style>
