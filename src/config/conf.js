const appwriteConf = {
  // Your Appwrite configuration here
  endpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
  projectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  databaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  bucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  categoryCollectionID: String(import.meta.env.VITE_APPWRITE_CATEGORY_COLLECTION_ID),
  ordersCollectionID: String(import.meta.env.VITE_APPWRITE_ORDERS_COLLECTION_ID),
  productsCollectionID: String(import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID),
  reviewsCollectionID: String(import.meta.env.VITE_APPWRITE_REVIEWS_COLLECTION_ID),
}

export default appwriteConf
