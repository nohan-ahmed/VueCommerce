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
import { Client, Account } from "appwrite";

onMounted(async () => {
  // const client = new Client().setProject(appwriteConf.projectID); // Your project ID

  // const account = new Account(client);

  // const promise = account.createEmailPasswordSession(
  //   "mluv5603@gmail.com",
  //   "Password123@"
  // );

  // promise.then(
  //   function (response) {
  //     console.log(response); // Success
  //   },
  //   function (error) {
  //     console.log(error); // Failure
  //   }
  // );


});
</script>
