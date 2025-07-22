/* eslint-disable no-useless-catch */
import { Client, Databases, Storage, Query, ID } from "appwrite";
import { conf } from "../config/conf.js";

export class Service {
   client = new Client();
   databases;
   bucket;

   constructor() {
      this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProject);
      this.bucket = new Storage(this.client);
      this.databases = new Databases(this.client);
   }

   // database services 
   async createPost({ title, slug, content, featuredImage, status, userId }) {
      try {
         return await this.databases.createDocument(
            conf.appwriteDatabase,
            conf.appwriteCollection,
            slug,
            { title, content, featuredImage, status, userId },
         );
      } catch (error) {
         throw error;
      }
   }
   async updatePost({ title, slug, content, featuredImage, status }) {
      try {
         return await this.databases.updateDocument(
            conf.appwriteDatabase,
            conf.appwriteCollection,
            slug,
            { title, content, featuredImage, status },
         );
      } catch (error) {
         throw error;
      }
   }
   async deletePost(slug) {
      try {
         return await this.databases.deleteDocument(
            conf.appwriteDatabase,
            conf.appwriteCollection,
            slug,
         );
      } catch (error) {
         throw error;
      }
   }

   async getPost(slug) {
      try {
         return await this.databases.getDocument(
            conf.appwriteDatabase,
            conf.appwriteCollection,
            slug,
         );
      } catch (e) {
         throw e;
      }
   }

   async getPosts(queries = [Query.equal("status", "active")]) {
      try {
         return await this.databases.listDocuments(
            conf.appwriteDatabase,
            conf.appwriteCollection,
            queries,
         );
      } catch (e) {
         throw e;
      }
   }

   // file uploading services
   async uploadFile(file) {
      try {
         return await this.bucket.updateFile(conf.appwriteBucket, ID.unique(), file);
      } catch (e) {
         throw e;
      }
   }

   async deleteFile(fileId) {
      try {
         await this.bucket.deleteFile(conf.appwriteBucket, fileId);
         return true
      } catch (e) {
         throw e;
      }
   }

   getFilePreview(fileId) {
         return this.bucket.getFilePreview(conf.appwriteBucket, fileId)
   }
}

const service = new Service();
export default service;
