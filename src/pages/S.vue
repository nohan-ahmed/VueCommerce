<template>
  <h2>Category {{ name }}</h2>
</template>

<script setup>
import { useRoute } from 'vue-router';

const name = useRoute.name
</script>
<style scoped></style>
