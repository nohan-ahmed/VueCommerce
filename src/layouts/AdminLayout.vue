<template>
  <v-container fluid class="admin-dashboard">
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

    <!-- Main Content -->
    <v-main>
      <!-- Top Toolbar -->
      <v-app-bar app color="white" elevation="1">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Admin Dashboard</v-toolbar-title>
      </v-app-bar>

      <!-- Dashboard Content -->
       <slot>

       </slot>
    </v-main>
  </v-container>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";

// Sidebar open/close state
const drawer = ref(false); // Sidebar starts open

// Sidebar Navigation Items
const navItems = ref([
  { title: "Dashboard", icon: "mdi-view-dashboard", route: {name: 'Admin'}},
  { title: "Products", icon: "mdi-cube-outline", route: {name :'Crud'} },
  { title: "Orders", icon: "mdi-cart-outline", route:{name: 'Orders'} },
  {
    title: "Customers",
    icon: "mdi-account-outline",
    route: "/admin/customers",
  },
  { title: "Settings", icon: "mdi-cog-outline", route: "/admin/settings" },
]);


// Navigate to selected route
const navigate = (route) => {
  router.push(route)
  console.log(`Navigating to ${route}`);
};

</script>

<style scoped>
.admin-dashboard {
  background-color: #f5f5f5;
}
.bg-primary {
  background-color: #3f51b5 !important;
}
.v-list-item-title {
  font-size: 16px;
}
</style>
