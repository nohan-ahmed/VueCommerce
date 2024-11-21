<template>
  <!-- App Bar -->
  <v-app-bar app color="primary" dark>
    <!-- Mobile Menu Toggle -->
    <v-app-bar-nav-icon
      @click="drawer = !drawer"
      class="d-sm-none"
    ></v-app-bar-nav-icon>

    <!-- Brand Logo -->
    <v-toolbar-title>
      <RouterLink
        to="/"
        class="font-weight-bold text-decoration-none text-blue-lighten-4"
        >E-Shop</RouterLink
      >
    </v-toolbar-title>

    <!-- Desktop Menu -->
    <v-spacer />
    <v-btn :to="{ name: 'Home' }" class="d-none d-sm-flex">Home</v-btn>
    <v-btn text class="d-none d-sm-flex">Shop</v-btn>
    <v-btn :to="{ name: 'About' }" text class="d-none d-sm-flex">About</v-btn>
    <v-btn :to="{ name: 'Contact' }" text class="d-none d-sm-flex"
      >Contact</v-btn
    >

    <!-- Wishlist Icon -->
    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
      <span class="icon-text">{{ wishlistStore.totalItems }}</span>
    </v-btn>

    <!-- Cart Icon -->
    <v-btn icon>
      <v-icon>mdi-cart</v-icon>
      <span class="icon-text">{{ cartStore.totalItems }}</span>
    </v-btn>

    <!-- User Account -->
    <v-menu width="250px">
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-account" variant="text" v-bind="props"></v-btn>
      </template>

      <v-list class="mt-2">
        <!-- authentication -->
        <v-list-item key="auth" v-if="authStore.isAuthenticated">
          <v-btn :to="{ name: 'Login' }">Profile</v-btn>
        </v-list-item>

        <v-list-item key="profile" v-else>
          <v-btn :to="{ name: 'Login' }">Sing-in / Sing-up</v-btn>
        </v-list-item>
        <hr />
        <v-list-item v-for="(item, i) in menuItems" :key="i">
          <RouterLink :to="{ name: item.title }" class="text-decoration-none"
            ><v-icon class="mr-2">{{ item.icon }}</v-icon
            >{{ item.title }}</RouterLink
          >
        </v-list-item>

        <!-- logout -->
        <v-list-item key="logout" v-if="authStore.isAuthenticated">
          <v-btn width="100%" @click="authStore.logoutUser()">Logout</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Dropdown Menu -->
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer v-model="drawer" app temporary class="d-sm-none">
    <v-list>
      <v-list-item link>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>Shop</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>About</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>Contact</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { reactive, ref } from "vue";

// manu items list
const menuItems = [
  { title: "Wishlist", icon: "mdi-heart" },
  { title: "Cart", icon: "mdi-cart" },
  { title: "Orders", icon: "mdi-clipboard-list-outline" },
];

// navbar
const drawer = ref(false);
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

// Define store
const authStore = useAuthStore();



</script>

<style scoped>
.icon-text {
  margin-top: -1rem;
  color: greenyellow;
  font-size: 12px;
  font-family: monospace;
}
</style>
