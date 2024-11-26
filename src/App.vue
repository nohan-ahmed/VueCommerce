<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
import { onMounted } from "vue";
import databaseService from "./appwrite/database";
import appwriteConf from "./config/conf";
import authService from "./appwrite/auth";
import { useReviewStore } from "./stores";
import { Client, Account, Databases, ID } from "appwrite";

// onMounted(async () => {
//   const client = new Client()
//     .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
//     .setProject("673c5df6003c7e4c5d27"); // Your project ID

//   const databases = new Databases(client);

//   const result = await databases.updateDocument(
//     appwriteConf.databaseID, // databaseId
//     appwriteConf.productsCollectionID, // collectionId
//     '674566f1001b276593f6', // documentId
//     {
//       categories: ["6745659700117781fc72"],

//       quantity: 1,
//     } // data
//   );

//   console.log(result);
// });

// onMounted(async () => {
//   const reviewStore = useReviewStore();
//   await reviewStore.fetchReviews();
//   console.log('Reviews: ',reviewStore.reviews);
// });
</script>
