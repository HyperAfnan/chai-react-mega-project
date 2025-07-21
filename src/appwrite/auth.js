/* eslint-disable no-useless-catch */
import { Client, Account, ID } from "appwrite";
import { conf } from "../config/conf.js";

export class AuthService {
   client = new Client();
   account;

   constructor() {
      this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProject);

      this.account = new Account(this.client);
   }

   async createAccount({ email, password, name }) {
      try {
         const userAccount = await this.account.create(
            ID.unique(),
            email,
            password,
            name,
         );

         if (userAccount) return this.login(email, password);
         else return userAccount;

      } catch (e) {
         throw e;
      }
   }
   async login({ email, password }) {
      try {
         return await this.account.createEmailPasswordSession(email, password);
      } catch (error) {
         throw error;
      }
   }

   async logout() {
      try {
         return this.account.deleteSessions()
      } catch (error) {
         throw error;
      }
   }

   async getUserInfo() {
      try {
         return await this.account.get();
      } catch (error) {
         throw error;
      }
   }
}

const authService = new AuthService();

export default authService;
