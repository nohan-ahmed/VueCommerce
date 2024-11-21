import appwriteConf from "@/config/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client()
  account;
  constructor() {
    this.client.setEndpoint(appwriteConf.endpoint);
    this.client.setProject(appwriteConf.projectID);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        return this.login({email, password})
      }
      return null;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUser(){
    try {
      return await this.account.get()
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw new Error(error.message);
    }
  }

}

const authService = new AuthService();
export default authService
