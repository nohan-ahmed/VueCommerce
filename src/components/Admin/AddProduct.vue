<template>
  <v-container>
    <v-card>
      <v-card-title>Add New Product</v-card-title>
      <v-card-text>
        <form @submit.prevent="submit">
          <!-- Name -->
          <v-text-field
            v-model="form.name"
            label="Product Name"
            :rules="[rules.required]"
          ></v-text-field>

          <!-- Regular Price -->
          <v-text-field
            v-model.number="form.regular_price"
            label="Regular Price"
            type="number"
            :rules="[rules.required, rules.positive]"
          ></v-text-field>

          <!-- Price -->
          <v-text-field
            v-model.number="form.price"
            label="Price"
            type="number"
            :rules="[rules.required, rules.positive]"
            @input="calculateDiscount"
          ></v-text-field>

          <!-- Discount -->
          <v-text-field
            v-model="form.discount"
            label="Discount (%)"
            readonly
          ></v-text-field>

          <!-- Quantity -->
          <v-text-field
            v-model.number="form.quantity"
            label="Quantity"
            type="number"
            :rules="[rules.required, rules.nonNegative]"
          ></v-text-field>

          <!-- Thumbnail -->
          <v-file-input
            v-model="form.thumbnail"
            label="Thumbnail"
            accept="image/*"
            :rules="[rules.required]"
          ></v-file-input>

          <!-- Category -->
          <v-select
            v-model="form.category"
            :items="categories"
            label="Category"
            :rules="[rules.required]"
          ></v-select>

          <!-- User -->
          <v-text-field
            v-model="form.user"
            label="User"
            :rules="[rules.required]"
          ></v-text-field>

          <!-- Submit Button -->
          <v-btn type="submit" color="primary" class="mt-4" :loading="loading">
            Submit
          </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";


// Form Data
const form = ref({
  id: "", // Can be auto-generated if needed
  name: "",
  regular_price: null,
  price: null,
  discount: 0,
  user: "",
  category: "",
  created_at: null,
  quantity: null,
  thumbnail: null, // File object for upload
});

// Category Options
const categories = ref(["Electronics", "Clothing", "Books", "Accessories"]);

// Validation Rules
const rules = {
  required: (v) => !!v || "This field is required",
  positive: (v) => v > 0 || "Must be a positive number",
  nonNegative: (v) => v >= 0 || "Must not be negative",
};

// Loading State
const loading = ref(false);

// Calculate Discount
const calculateDiscount = () => {
  if (form.value.regular_price && form.value.price) {
    const discount =
      ((form.value.regular_price - form.value.price) /
        form.value.regular_price) *
      100;
    form.value.discount = discount.toFixed(2); // Rounded to 2 decimals
  } else {
    form.value.discount = 0;
  }
};

// Upload Thumbnail to Firebase Storage
// const uploadThumbnail = async (file) => {
//   if (!file) throw new Error("No file selected");
// console.log(file.name);
//   const fileRef = storageRef(storage, `thumbnails/${file.name}`);
//   const snapshot = await uploadBytes(fileRef, file); // Upload file
//   const downloadURL = await getDownloadURL(snapshot.ref); // Get file URL
//   return downloadURL;
// };

// Submit Form
const submit = async () => {
  // try {
  //   loading.value = true;

  //   // Upload thumbnail if a file is selected
  //   if (form.value.thumbnail) {
  //     // const fileURL = await uploadThumbnail(form.value.thumbnail);
  //     // form.value.thumbnail = fileURL; // Replace file object with the URL
  //     console.log(form.thumbnail.name);
  //   }

  //   // Add timestamp
  //   form.value.created_at = serverTimestamp();

  //   // Save product data to Firestore
  //   const productData = { ...form.value };
  //   await addDoc(collection(db, "products"), productData);

  //   alert("Product added successfully!");
  //   resetForm();
  // } catch (error) {
  //   console.error("Error adding product:", error);
  //   alert("Failed to add product.");
  // } finally {
  //   loading.value = false;
  // }
};

// Reset Form
const resetForm = () => {
  form.value = {
    id: "",
    name: "",
    regular_price: null,
    price: null,
    discount: 0,
    user: "",
    category: "",
    created_at: null,
    quantity: null,
    thumbnail: null,
  };
};
</script>

<style scoped>
/* Optional: Custom Styles */
</style>
