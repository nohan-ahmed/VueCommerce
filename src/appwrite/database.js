import appwriteConf from "@/config/conf";
import { Client, Databases, ID, Query } from "appwrite";

export class DatabaseService {
  client = new Client()
  database;
  constructor() {
    this.client.setEndpoint(appwriteConf.endpoint);
    this.client.setProject(appwriteConf.projectID);
    this.database = new Databases(this.client);
  }

  async getDocument(collectionID, documentID, queries = []) {
    try {
      const document = await this.database.getDocument(
        appwriteConf.databaseID, // databaseId
        collectionID, // collectionId
        documentID, // documentId
        queries // queries (optional)
      );
      return document;
    } catch (err) {
      console.error(err);
    }
  }

  async getListDocuments(collectionID, queries) {
    try {
      const documents = await this.database.listDocuments(
        appwriteConf.databaseID, // databaseId
        collectionID, // collectionId
        queries,

      );
      return documents;
    } catch (err) {
      console.error(err);
    }
  }

  async createDocument(collectionID, data) {
    try {
      const document = await this.database.createDocument(
        appwriteConf.databaseID, // databaseId
        collectionID, // collectionId
        ID.unique(), // documentId
        data, // data
        ["read('any')"] // permissions (optional)
      );
      return document;
    } catch (err) {
      console.error(err);
    }
  }

  async updateDocument(collectionID, documentID, data) {
    try {
      const updatedDocument = await this.database.updateDocument(
        appwriteConf.databaseID, // databaseId
        collectionID, // collectionId
        documentID, // collectionId
        ID.unique(), // documentId
        data, // data
        ["read('any')"] // permissions (optional)
      );
      return updatedDocument;
    } catch (err) {
      console.error(err);
    }
  }

  async deleteDocument(collectionID, documentID) {
    try {
      return await this.database.deleteDocument(
        appwriteConf.databaseID, // databaseId
        collectionID, // collectionId
        documentID // documentId
      );
    } catch (err) {
      console.error(err);
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService
