<template>
  <!-- Sidebar Navigation -->
  <v-navigation-drawer v-model="drawer" app class="bg-primary">
    <v-list dense>
      <v-list-item>
        <v-list-item-title class="text-h6 text-white">
          Admin Dashboard
        </v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        link
        @click="navigate(item.route)"
      >
        <v-list-item-icon>
          <v-icon class="text-white">{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="text-white">{{
          item.title
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

        <!-- Top Toolbar -->
        <v-app-bar app color="white" elevation="1">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Admin Dashboard</v-toolbar-title>
      </v-app-bar>
</template>


<script setup >
import { ref } from 'vue';

// Sidebar Navigation Items
const navItems = ref([
  { title: "Dashboard", icon: "mdi-view-dashboard", route: "/admin/dashboard" },
  { title: "Products", icon: "mdi-cube-outline", route: "/admin/products" },
  { title: "Orders", icon: "mdi-cart-outline", route: "/admin/orders" },
  { title: "Customers", icon: "mdi-account-outline", route: "/admin/customers" },
  { title: "Settings", icon: "mdi-cog-outline", route: "/admin/settings" },
]);</script>
