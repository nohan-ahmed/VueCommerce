<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
import { onMounted, ref } from "vue";
import appwriteConf from "./config/conf";

import {
  Client,
  Account,
  Databases,
  ID,
  Storage,
  ImageGravity,
  ImageFormat,
} from "appwrite";


// onMounted(async () => {
//   const reviewStore = useReviewStore();
//   await reviewStore.fetchReviews();
//   console.log('Reviews: ',reviewStore.reviews);
// });
</script>
