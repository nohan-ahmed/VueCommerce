<template>
  <v-sheet class="mx-auto" elevation="8" max-width="1200">
    <v-slide-group v-model="model" class="pa-2" center-active show-arrows>
      <v-slide-group-item
        v-for="item in items"
        :key="item.$id"
        v-slot="{ isSelected, toggle }"
      >
        <v-card
          :color="isSelected ? 'primary' : 'grey-lighten-1'"
          class="ma-4"
          height="200"
          width="200"
          @click="toggle"
        >
          <v-img
            @click="$emit('riderectRoute', item)"
            :src="item.img ? bucketStore.filePreview(item.img) : null"
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200"
            cover
          >
            <v-card-sub-title class="text-white ml-2">{{
              item.name
            }}</v-card-sub-title>
          </v-img>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script setup>
import { useBucketStore } from "@/stores";
import { ref } from "vue";

// Define stores
const bucketStore = useBucketStore();

const model = ref(null);
const props = defineProps(["items"]);
</script>
