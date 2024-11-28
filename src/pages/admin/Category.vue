<template>
  <AdminLayout>
    <template #default>
      <v-container fluid class="cat-page">
        <!-- Header Section -->
        <v-row class="mb-4">
          <v-col>
            <v-toolbar flat color="white">
              <v-toolbar-title class="text-h5"
                >Categories Management</v-toolbar-title
              >
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="openDialog()">Add Product</v-btn>
            </v-toolbar>
          </v-col>
        </v-row>

        <!-- Catgories Table -->
        <v-table height="500px" fixed-header>
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Name</th>
              <th class="text-left">Image</th>
              <th class="text-left">Total items</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="categoryStore.categories.length > 0"
              v-for="item in categoryStore.categories"
              :key="item.name"
            >
              <td>{{ item.$id }}</td>
              <td>{{ item.name }}</td>
              <td>
                <img
                  :src="bucketStore.filePreview(item.thumbnail)"
                  alt=""
                  width="60px"
                />
              </td>
              <td>{{ item.products.length }}</td>
              <td>
                <v-icon small class="mr-2" @click="openDialog(item)"
                  >mdi-pencil</v-icon
                >
                <v-icon small @click="deleteCategory(item.$id)" color="red"
                  >mdi-delete</v-icon
                >
              </td>
            </tr>
          </tbody>
        </v-table>

        <!-- Product Form Dialog -->
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{
                isEditMode ? "Edit Product" : "Add Product"
              }}</span>
            </v-card-title>

            <v-card-text>
              <v-form ref="form" @submit.prevent="saveProduct">
                <v-file-input
                  v-model="thumbnailInput"
                  accept="image/*"
                  label="Thumbnail"
                ></v-file-input>

                <v-text-field
                  v-model="formData.name"
                  label="Product Name"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="dialog = false">Cancel</v-btn>
              <v-btn color="primary" @click="saveProduct">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Delete Confirmation Dialog -->
        <v-dialog v-model="deleteDialog" max-width="400px">
          <v-card>
            <v-card-title class="text-h5">Confirm Deletion</v-card-title>
            <v-card-text>
              Are you sure you want to delete this product?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="deleteDialog = false">Cancel</v-btn>
              <v-btn color="red" @click="confirmDeleteProduct">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </template>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
import { useBucketStore, useCategoryStore } from "@/stores";
import { computed, onMounted, ref } from "vue";

// Products data (simulated, replace with API data in real app)
const categoryStore = useCategoryStore();
const bucketStore = useBucketStore();
onMounted(async () => {
  try {
    await categoryStore.fetchCategories();
    console.log("Categories fetched:", categoryStore.categories);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// Handle files.
const thumbnailInput = ref(null);

// Form and dialog states
const dialog = ref(false);
const deleteDialog = ref(false);
const isEditMode = ref(false);
const form = ref(null);
const formData = ref({
  name: "",
  thumbnail: "",
});

let deleteCategoryID = null; // Holds product ID to be deleted

// File handle

// Validation rules
const rules = {
  required: (value) => !!value || "This field is required",
  positiveNumber: (value) => value > 0 || "Must be a positive number",
};

// Open Add/Edit Dialog
const openDialog = async (cat = null) => {
  isEditMode.value = !!cat; // Check if in edit mode

  if (cat) {
    formData.value = { ...cat }; // Load product data into form
    console.log(cat.thumbnail);
    thumbnailInput.value = await bucketStore.getFile(cat.thumbnail); // Load file
  } else {
    formData.value = {
      // Reset form fields
      name: "",
      thumbnail: "",
    };
    thumbnailInput.value = null; // Reset selected file
  }

  dialog.value = true; // Open the dialog
};

// Save Category (Add or Update)
const saveProduct = async () => {
  const isValid = form.value.validate(); // Validate the form
  if (!isValid) return; // Stop if validation fails

  try {
    // Prepare the category data
    const catData = { ...formData.value };

    if (isEditMode.value) {
      // check user change the thumbnail or not
      if (thumbnailInput.value.$id !== catData.thumbnail) {
        await bucketStore.deleteFile(catData.thumbnail);
        const newFile = await bucketStore.uploadFile(thumbnailInput.value);
        console.log("updatedFile: ", newFile);
        catData.thumbnail = newFile.$id; // Update the product's thumbnail with newly uploaded thumbnail.$id
      }

      // update product
      const updateCat = await categoryStore.updateCategory(
        catData.$id,
        {thumbnail:catData.thumbnail, name: catData.name}
      );
    } else {
      // Imgage uploaded task here.
      const uploadedFile = await bucketStore.uploadFile(thumbnailInput.value);
      catData.thumbnail = uploadedFile.$id;
      // Add a new product
      await categoryStore.addCategory(catData);
    }

    dialog.value = false; // Close the dialog after saving
  } catch (error) {
    console.error("Error saving category:", error);
  }
};

// Open Delete Confirmation Dialog
const deleteCategory = (id) => {
  deleteCategoryID = id;
  deleteDialog.value = true;
};

// Confirm Deletion
const confirmDeleteProduct = async () => {
  await categoryStore.deleteCategory(deleteCategoryID);
  deleteDialog.value = false;
};
</script>

<style scoped>
.crud-page {
  background-color: #f9f9f9;
  padding: 20px;
}
.v-btn {
  text-transform: none;
}
</style>
