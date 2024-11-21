import appwriteConf from "@/config/conf";
import { Client, Storage, ID } from "appwrite";
class BucketService {
  client = new Client();
  bucket;
  constructor() {
    this.client.setEndpoint(appwriteConf.endpoint);
    this.client.setProject(appwriteConf.projectID);
    this.bucket = new Storage(this.client);
  }

  async uploadFile(file, permissions = ["read", "write"]) {
    try {
      const fileID = ID.unique();
      const uploadedFile = await this.bucket.uploadFile(
        appwriteConf.bucketID, // bucketId
        fileID, // fileId
        file, // file
        permissions // permissions (optional)
      );
      return uploadedFile;
    } catch (err) {
      console.error(err);
    }
  }

  async updateFile(fileID) {
    try {
      const updatedFile = await this.bucket.updateFile(
        appwriteConf.bucketID,
        fileID,
      );
      return updatedFile;
    } catch (err) {
      console.error(err);
    }
  }

  async deleteFile(fileID) {
    try {
      return await this.bucket.deleteFile(
        appwriteConf.bucketID,
        fileID
      );
    } catch (err) {
      console.error(err);
    }
  }

  getFilePreview(fileID) {
    try {
      const filePreview = this.bucket.getFilePreview(
        appwriteConf.bucketID, // bucketId
        fileID, // fileId
      );
      return filePreview;
    } catch (err) {
      console.error(err);
    }
  }


}

