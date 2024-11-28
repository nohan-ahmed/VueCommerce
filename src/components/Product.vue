<template>
  <div>
    <v-hover v-slot="{ isHovering, props }">
      <v-card class="mx-auto" max-width="344" v-bind="props">
        <template v-slot:loader="{ isActive }">
          <v-progress-linear
            :active="isActive"
            color="deep-purple"
            height="4"
            indeterminate
          ></v-progress-linear>
        </template>

        <span class="discount">{{ product.discount }}% off</span>
        <v-img height="250" :src="bucketStore.filePreview(product.thumbnail)" cover></v-img>

        <v-card-item>
          <v-card-title>{{ product.name }}</v-card-title>

          <v-card-subtitle>
            <span class="me-1">{{ product.category }}</span>

            <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          </v-card-subtitle>
        </v-card-item>

        <v-card-text>
          <v-row align="center" class="mx-0">
            <v-rating
              :model-value="product.average_rating"
              color="amber"
              density="compact"
              size="small"
              half-increments
              readonly
            ></v-rating>

            <div class="text-grey ms-4">
              {{ product.average_rating }} ({{ product.reviews.length }})
            </div>
          </v-row>

          <div class="my-4 text-subtitle-1 price">
            <s style="color: #868fa3">${{ product.regular_price }}</s>
            ${{ product.price }}
          </div>
        </v-card-text>

        <v-overlay
          location="bottom center"
          origin="overlap"
          :model-value="!!isHovering"
          class="align-center justify-center"
          scrim="#036358"
          contained
        >
          <div class="overlay-content">
            <button>
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12Z"
                    fill="#000000"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21.83 11.2807C19.542 7.15186 15.8122 5 12 5C8.18777 5 4.45796 7.15186 2.17003 11.2807C1.94637 11.6844 1.94361 12.1821 2.16029 12.5876C4.41183 16.8013 8.1628 19 12 19C15.8372 19 19.5882 16.8013 21.8397 12.5876C22.0564 12.1821 22.0536 11.6844 21.83 11.2807ZM12 17C9.06097 17 6.04052 15.3724 4.09173 11.9487C6.06862 8.59614 9.07319 7 12 7C14.9268 7 17.9314 8.59614 19.9083 11.9487C17.9595 15.3724 14.939 17 12 17Z"
                    fill="#000000"
                  ></path>
                </g>
              </svg>
            </button>

            <button v-if="wishlistStore.isWishlist(product)==true" @click="$emit('removeWishlist', product)">
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z"
                    fill="#e0b000"
                  ></path>
                </g>
              </svg>
            </button>

            <button v-else @click="$emit('wishlist', product)">
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 64.00 64.00"
                xmlns="http://www.w3.org/2000/svg"
                stroke-width="6.4"
                stroke="#000000"
                fill="none"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M9.06,25C7.68,17.3,12.78,10.63,20.73,10c7-.55,10.47,7.93,11.17,9.55a.13.13,0,0,0,.25,0c3.25-8.91,9.17-9.29,11.25-9.5C49,9.45,56.51,13.78,55,23.87c-2.16,14-23.12,29.81-23.12,29.81S11.79,40.05,9.06,25Z"
                  ></path>
                </g>
              </svg>
            </button>

            <button @click="$emit('addToCart', product)">
              <svg
                width="25px"
                height="25px"
                fill="#000000"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M19,14a1,1,0,0,0,.949-.684l2-6A1,1,0,0,0,21,6H7V2A1,1,0,0,0,6,1H3A1,1,0,0,0,3,3H5V17a1,1,0,0,0,1,1H18a1,1,0,0,0,0-2H7V14ZM7,8H19.613l-1.334,4H7ZM6.5,19A1.5,1.5,0,1,1,5,20.5,1.5,1.5,0,0,1,6.5,19Zm10,0A1.5,1.5,0,1,1,15,20.5,1.5,1.5,0,0,1,16.5,19Z"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
        </v-overlay>
      </v-card>
    </v-hover>
  </div>
</template>

<script setup>
import { useBucketStore, useReviewStore } from "@/stores";
import { useWishlistStore } from "@/stores/wishlistStore";

const props = defineProps(["product"]);
const wishlistStore = useWishlistStore();
const reviewStore = useReviewStore()
const bucketStore = useBucketStore()
</script>

<style scoped>
.price {
  color: #d54e64;
}

.discount {
  position: absolute;
  top: 4px;
  left: 5px !important;
  z-index: 5;
  background: #d23f57;
  padding: 2px 13px;
  color: #f0f8ff9c;
  border-radius: 6px;
  font-size: 0.9rem;
}

.overlay-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  padding: 5px 15px;
  gap: 7px;
  border-radius: 10px;
  z-index: 10;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
