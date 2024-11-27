import appwriteConf from "@/config/conf";
import { Client, Storage, ID } from "appwrite";
export class BucketService {
  client = new Client();
  bucket;
  constructor() {
    this.client.setEndpoint(appwriteConf.endpoint);
    this.client.setProject(appwriteConf.projectID);
    this.bucket = new Storage(this.client);
  }

  async listFiles(queries = []) {
    try {
      const fiels = await this.bucket.listFiles(
        appwriteConf.bucketID, // bucketId
        queries, // queries (optional)
      );
      return fiels
    } catch (err) {
      console.error(err);
      // throw err
    }
  }

  async uploadFile(file) {
    try {
      const uploadedFile = await this.bucket.createFile(
        appwriteConf.bucketID, // bucketId
        ID.unique(), // fileId
        file, // file
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
      const filePreview = this.bucket.getFileView(
        appwriteConf.bucketID, // bucketId
        fileID, // fileId
      );
      return filePreview;
    } catch (err) {
      console.error(err);
    }
  }


}

const bucketService = new BucketService();
export default bucketService
