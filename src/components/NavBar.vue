<template>
  <!-- App Bar -->
  <v-app-bar app color="primary" dark>
    <!-- Mobile Menu Toggle -->
    <v-app-bar-nav-icon
      @click="drawer = !drawer"
      class="d-sm-none"
    ></v-app-bar-nav-icon>

    <!-- Brand Logo -->
    <v-toolbar-title class="mr-4">
      <RouterLink
        to="/"
        class="font-weight-bold text-decoration-none text-blue-lighten-4"
      >
        E-Shop
      </RouterLink>
    </v-toolbar-title>

    <!-- Search Bar (Desktop Only) -->
    <v-text-field
      v-model="searchQuery"
      class="d-none d-sm-flex mx-4"
      placeholder="Search products..."
      density="comfortable"
      prepend-inner-icon="mdi-magnify"
      hide-details
      solo-inverted
      flat
      clearable
      @keyup.enter="handleSearch"
    />

    <!-- Desktop Menu -->
    <v-spacer />
    <v-btn :to="{ name: 'Home' }" class="d-none d-sm-flex">Home</v-btn>
    <v-btn text class="d-none d-sm-flex">Shop</v-btn>
    <v-btn :to="{ name: 'About' }" text class="d-none d-sm-flex">About</v-btn>
    <v-btn :to="{ name: 'Contact' }" text class="d-none d-sm-flex"
      >Contact</v-btn
    >

    <!-- Mobile Search Icon -->
    <v-btn icon class="d-sm-none" @click="showMobileSearch = !showMobileSearch">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

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
      <!-- User menu as before -->
      <v-list class="mt-2">
        <v-list-item key="auth" v-if="authStore.isAuthenticated">
          <v-btn :to="{ name: 'Profile' }">Profile</v-btn>
        </v-list-item>

        <v-list-item key="profile" v-else>
          <v-btn :to="{ name: 'Login' }">Sign-in / Sign-up</v-btn>
        </v-list-item>
        <hr />
        <v-list-item v-for="(item, i) in menuItems" :key="i">
          <RouterLink :to="{ name: item.title }" class="text-decoration-none">
            <v-icon class="mr-2">{{ item.icon }}</v-icon>
            {{ item.title }}
          </RouterLink>
        </v-list-item>

        <!-- Logout -->
        <v-list-item key="logout" v-if="authStore.isAuthenticated">
          <v-btn width="100%" @click="authStore.logoutUser()">Logout</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>

  <!-- Mobile Search Bar Modal -->
  <v-dialog v-model="showMobileSearch" width="90%">
    <v-card>
      <v-card-title class="d-flex align-center">
        <v-text-field
          v-model="searchQuery"
          label="Search products..."
          density="compact"
          autofocus
          prepend-inner-icon="mdi-magnify"
          clearable
          @keyup.enter="handleSearch"
        ></v-text-field>
        <v-btn icon @click="showMobileSearch = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
  </v-dialog>

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
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";

// Stores
const authStore = useAuthStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

// Search functionality
const searchQuery = ref("");
const showMobileSearch = ref(false);

const handleSearch = () => {
  if (searchQuery.value.trim() !== "") {
    console.log("Searching for:", searchQuery.value);
    // Implement search logic or route navigation here
  }
};

// Mobile drawer
const drawer = ref(false);
</script>

<style scoped>
.icon-text {
  margin-top: -1rem;
  color: greenyellow;
  font-size: 12px;
  font-family: monospace;
}

</style>
