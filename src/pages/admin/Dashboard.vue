<template>
  <AdminLayout>
    <template #default>
      <v-container>
        <v-row v-if="loading" justify="center">
          <v-progress-circular
            indeterminate
            color="primary"
            size="64"
          ></v-progress-circular>
        </v-row>

        <v-row v-else>
          <!-- Dynamic Metrics -->
          <v-col cols="12" md="4" v-for="metric in metrics" :key="metric.title">
            <MetricCard
              :title="metric.title"
              :value="metric.value"
              :icon="metric.icon"
            />
          </v-col>

          <!-- Recent Orders Table -->
          <v-col cols="12">
            <v-card elevation="3" class="pa-4">
              <v-card-title class="text-h5">Recent Orders</v-card-title>
              <v-data-table
                :headers="orderHeaders"
                :items="recentOrders"
                class="elevation-1"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
import MetricCard from "@/components/Admin/MetricCard.vue"; // Reusable component
import { onMounted, ref } from "vue";
import { useCategoryStore } from "@/stores";

// Dashboard Metrics Data
const metrics = ref([]);

// Recent Orders Data
const recentOrders = ref([]);

// Order Table Headers
const orderHeaders = ref([
  { text: "Order ID", value: "id" },
  { text: "Customer", value: "customer" },
  { text: "Amount", value: "amount" },
  { text: "Status", value: "status" },
]);

// Simulate fetching data from an API
const loading = ref(true);
const fetchDashboardData = async () => {
  loading.value = true;
  setTimeout(() => {
    // Simulated data
    metrics.value = [
      { title: "Total Sales", value: "$120,000", icon: "mdi-currency-usd" },
      { title: "Total Orders", value: "1,250", icon: "mdi-cart" },
      { title: "Total Users", value: "8,750", icon: "mdi-account-group" },
    ];
    recentOrders.value = [
      {
        id: "ORD001",
        customer: "John Doe",
        amount: "$250.00",
        status: "Shipped",
      },
      {
        id: "ORD002",
        customer: "Jane Smith",
        amount: "$100.00",
        status: "Pending",
      },
      {
        id: "ORD003",
        customer: "Alice Johnson",
        amount: "$300.00",
        status: "Delivered",
      },
      {
        id: "ORD004",
        customer: "Bob Brown",
        amount: "$150.00",
        status: "Cancelled",
      },
    ];
    loading.value = false;
  }, 1000); // Simulated delay
};

const categoryStore = useCategoryStore();

onMounted(async () => {
  fetchDashboardData();
  await categoryStore.fetchCategories();
  console.log("categories: ", categoryStore.categories);
});
</script>
