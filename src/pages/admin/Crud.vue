<template>
  <AdminLayout>
    <template #default>
      <v-container fluid class="crud-page">
        <!-- Header Section -->
        <v-row class="mb-4">
          <v-col>
            <v-toolbar flat color="white">
              <v-toolbar-title class="text-h5"
                >Product Management</v-toolbar-title
              >
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="openDialog()">Add Product</v-btn>
            </v-toolbar>
          </v-col>
        </v-row>

        <!-- Products Table -->
        <v-table height="500px" fixed-header>
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Name</th>
              <th class="text-left">Image</th>
              <th class="text-left">Price</th>
              <th class="text-left">Category</th>
              <th class="text-left">Reviews</th>
              <th class="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="productStore.products.length > 0"
              v-for="item in productStore.products"
              :key="item.name"
            >
              <td>{{ item.$id }}</td>
              <td>{{ item.name }}</td>
              <td><img :src="bucketStore.filePreview(item.thumbnail)" alt="" width="60px" /></td>
              <td>${{ item.price }}</td>
              <td>{{ item.categories[0].name }}</td>
              <td>
                <v-card-text>
                  <v-row align="start" class="mx-0">
                    <v-rating
                      :model-value="item.average_rating"
                      color="amber"
                      density="compact"
                      size="small"
                      half-increments
                      readonly
                    ></v-rating>

                    <div class="text-grey ms-4">
                      {{ item.average_rating }} ({{ item.reviews.length }})
                    </div>
                  </v-row>
                </v-card-text>
              </td>
              <td>{{ productStore.isStoke(item) }}</td>
              <td>
                <v-icon small class="mr-2" @click="openDialog(item)"
                  >mdi-pencil</v-icon
                >
                <v-icon small @click="deleteProduct(item.$id)" color="red"
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
                <v-text-field
                  v-model.number="formData.regular_price"
                  label="Regular price"
                  type="number"
                  :rules="[rules.required, rules.positiveNumber]"
                ></v-text-field>

                <v-text-field
                  v-model.number="formData.price"
                  label="price"
                  type="number"
                  :rules="[rules.required, rules.positiveNumber]"
                ></v-text-field>

                <!-- Select categories -->
                <v-select
                  v-model="selectedItems"
                  :items="categoryStore.categories"
                  item-title="name"
                  item-value="$id"
                  label="Select categories"
                  multiple
                  @update:model-value="handleSelectionChange"
                >
                  <!-- Select All Checkbox -->
                  <template v-slot:prepend-item>
                    <v-list-item @click="toggle">
                      <template v-slot:prepend>
                        <v-checkbox
                          :indeterminate="likesSomeItems && !likesAllItems"
                          :model-value="likesAllItems"
                          color="indigo-darken-4"
                        ></v-checkbox>
                      </template>
                      <v-list-item-title>Select All</v-list-item-title>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                  </template>

                  <!-- Footer Section with Avatar -->
                  <template v-slot:append-item>
                    <v-divider class="mb-2"></v-divider>
                    <v-list-item :subtitle="subtitle" :title="title" disabled>
                      <template v-slot:prepend>
                        <v-avatar
                          color="primary"
                          icon="mdi-food-apple"
                        ></v-avatar>
                      </template>
                    </v-list-item>
                  </template>
                </v-select>

                <!-- text fields -->
                <v-textarea
                  v-model="formData.description"
                  label="Product description"
                  variant="outlined"
                ></v-textarea>

                <v-text-field
                  v-model.number="formData.quantity"
                  label="Quantity"
                  type="number"
                  :rules="[rules.required, rules.positiveNumber]"
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
import { useBucketStore, useCategoryStore, useProductStore } from "@/stores";
import { computed, onMounted, ref, watch } from "vue";

// Products data (simulated, replace with API data in real app)
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const bucketStore = useBucketStore();
onMounted(async () => {
  try {
    await categoryStore.fetchCategories();
    console.log("Categories fetched:", categoryStore.categories);
    await productStore.fetchProducts();
    console.log("Products fetched:", productStore.products);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// Handle files.
const thumbnailInput = ref(null);

// Select categories
const selectedItems = ref([]);
// watch(thumbnailInput, async() => {
//   // console.log(selectedItems.value, "...");
//   const result = await bucketStore.uploadFile(thumbnailInput)
//   console.log("After file uploaded: ", result);
// });

// Computed properties
const likesAllItems = computed(
  () => selectedItems.value.length === categoryStore.categories.length
);

const likesSomeItems = computed(
  () => selectedItems.value.length > 0 && !likesAllItems.value
);

const title = computed(() => {
  if (likesAllItems.value) return "Holy smokes, someone call the fruit police!";
  if (likesSomeItems.value) return "Fruit Count";
  return "How could you not like fruit?";
});

const subtitle = computed(() => {
  if (likesAllItems.value) return "All Categories selected!";
  if (likesSomeItems.value) return `${selectedItems.value.length} selected`;
  return "Go ahead, make a selection above!";
});

// Toggle function for Select All checkbox
const toggle = () => {
  if (likesAllItems.value) {
    selectedItems.value = []; // Deselect all
  } else {
    selectedItems.value = [...categoryStore.categories]; // Select all
  }
};

// Handle manual changes from the dropdown
const handleSelectionChange = (newValue) => {
  selectedItems.value = newValue;
};

// Form and dialog states
const dialog = ref(false);
const deleteDialog = ref(false);
const isEditMode = ref(false);
const form = ref(null);
const formData = ref({
  thumbnail:"",
  name: "",
  regular_price: 0,
  price: 0,
  quantity: 0,
  description: "",
});

let deleteProductId = null; // Holds product ID to be deleted

// File handle

// Validation rules
const rules = {
  required: (value) => !!value || "This field is required",
  positiveNumber: (value) => value > 0 || "Must be a positive number",
};

// Open Add/Edit Dialog
// Open Add/Edit Dialog
const openDialog = (product = null) => {
  isEditMode.value = !!product; // Check if in edit mode

  if (product) {
    formData.value = { ...product }; // Load product data into form
    selectedItems.value = product.categories.map((category) => category.$id); // Load categories
  } else {
    formData.value = {
      // Reset form fields
      name: "",
      regular_price: 0,
      price: 0,
      quantity: 0,
      description: "",
    };
    selectedItems.value = []; // Reset selected categories
  }

  dialog.value = true; // Open the dialog
};

// Save Product (Add or Update)
const saveProduct = async () => {
  const isValid = form.value.validate(); // Validate the form
  if (!isValid) return; // Stop if validation fails

  try {
    // Prepare the product data
    const productData = {
      ...formData.value,
      categories: selectedItems.value, // Include selected categories
    };
    // Imgage uploaded task here.
    const uploadedFile = await bucketStore.uploadFile(thumbnailInput.value);
    productData.thumbnail = uploadedFile.$id

    if (isEditMode.value) {
      const updateProduct = await productStore.updateProduct(
        productData.$id,
        productData
      );
    } else {
      // Add a new product
      await productStore.addProduct(productData);
      console.log("After file uploaded: ", uploadedFile);
    }

    dialog.value = false; // Close the dialog after saving
  } catch (error) {
    console.error("Error saving product:", error);
  }
};

// Open Delete Confirmation Dialog
const deleteProduct = (id) => {
  deleteProductId = id;
  deleteDialog.value = true;
};

// Confirm Deletion
const confirmDeleteProduct = async () => {
  await productStore.deleteProduct(deleteProductId);
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
