<template>
  <Default>
    <template #default>
      <v-container fluid class="about-page">
        <v-row class="hero-section" justify="center" align="center">
          <v-col cols="12" md="6" class="text-center">
            <h1 class="display-2 font-weight-bold">About Us</h1>
            <p class="subtitle-1 mt-3">
              Welcome to [Your E-commerce Name], your one-stop shop for
              [highlight your products/services]. We are committed to providing
              the best shopping experience for our customers.
            </p>
          </v-col>
          <v-col cols="12" md="6">
            <v-img
              src="https://via.placeholder.com/600x400"
              alt="About Us Image"
              class="rounded-lg"
              height="300"
            ></v-img>
          </v-col>
        </v-row>

        <v-divider class="my-10"></v-divider>

        <v-row class="mission-vision" justify="center" align="center">
          <v-col cols="12" md="4" class="text-center">
            <v-icon large color="primary">mdi-heart-outline</v-icon>
            <h3 class="headline mt-3">Our Mission</h3>
            <p class="body-1">
              To deliver high-quality, sustainable, and affordable products that
              exceed your expectations.
            </p>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon large color="primary">mdi-eye-outline</v-icon>
            <h3 class="headline mt-3">Our Vision</h3>
            <p class="body-1">
              To be the leading online retailer known for exceptional service
              and customer satisfaction.
            </p>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon large color="primary">mdi-earth-outline</v-icon>
            <h3 class="headline mt-3">Our Values</h3>
            <p class="body-1">
              Innovation, customer focus, sustainability, and community
              engagement are at our core.
            </p>
          </v-col>
        </v-row>

        <v-divider class="my-10"></v-divider>

        <v-row class="team-section" justify="center">
          <v-col cols="12" class="text-center">
            <h2 class="display-1 font-weight-bold">Meet Our Team</h2>
            <p class="subtitle-1 mt-2">
              Our dedicated professionals work tirelessly to bring you the best.
            </p>
          </v-col>

          <v-col
            cols="12"
            md="3"
            v-for="member in team"
            :key="member.name"
            class="text-center"
          >
            <v-avatar size="100">
              <v-img :src="member.image" :alt="member.name"></v-img>
            </v-avatar>
            <h4 class="headline mt-3">{{ member.name }}</h4>
            <p class="body-2">{{ member.role }}</p>
          </v-col>
        </v-row>

        <v-divider class="my-10"></v-divider>

        <v-row class="cta-section" justify="center" align="center">
          <v-col cols="12" md="6" class="text-center">
            <h2 class="display-1 font-weight-bold">Join Us Today!</h2>
            <p class="subtitle-1 mt-2">
              Explore our wide range of products and experience unmatched
              convenience. Shop now and see the difference.
            </p>
            <v-btn color="primary" large class="mt-4"> Shop Now </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </Default>
</template>
<script setup>
import Default from "@/layouts/Default.vue";
const team = [
  {
    name: "Jane Doe",
    role: "CEO & Founder",
    image: "https://via.placeholder.com/100",
  },
  {
    name: "John Smith",
    role: "Chief Marketing Officer",
    image: "https://via.placeholder.com/100",
  },
  {
    name: "Alice Brown",
    role: "Lead Developer",
    image: "https://via.placeholder.com/100",
  },
  {
    name: "Mark Wilson",
    role: "Customer Success Manager",
    image: "https://via.placeholder.com/100",
  },
];
</script>

<style scoped>
.about-page {
  background-color: #f9f9f9;
  padding: 20px;
}
.hero-section {
  background-color: #fff;
  padding: 40px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.mission-vision {
  padding: 40px 20px;
}
.team-section {
  background-color: #fff;
  padding: 40px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.cta-section {
  padding: 40px 20px;
}
</style>
