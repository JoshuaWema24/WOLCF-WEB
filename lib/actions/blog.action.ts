"use server";
 
import { revalidatePath } from "next/cache";
import { connectDb } from "../db/db";
import userModel from "../db/models/user.model";
import blogModel from "../db/models/blog.model";

export const createBlog = async (newBlog: IBlog, pathname: string) => {
    try {
        await connectDb();

        await userModel.create(newBlog);
        revalidatePath(pathname);
    } catch (error: any) {
        throw new Error(error);   
    }
}
 export const deleteBlog = async (blogId: string, pathname: string) => {
    try {
        await connectDb();

        await userModel.findByIdAndDelete(blogId);
        revalidatePath(pathname);
    } catch (error: any) {
        throw new Error(error);
    }
 }

 export const updateBlog = async (updatedBlog: IBlog, pathname: string) => {
    try {
            await connectDb();

            await blogModel.findByIdAndUpdate(updatedBlog._id, updatedBlog)

            revalidatePath(pathname)
             
    } catch (error: any) {
        throw new Error(error);
        
    }
 };

 //get on blog
 export const  getBlog = async(blogId: IBlog["_id"]) => {
    try {
        await connectDb();

 const user = await userModel
      .findOne()
      .or([{ _id: blogId }])
      .exec();
     return JSON.parse(JSON.stringify(user));
    } catch (error:any) {
        throw new Error(error);  
    }
 }

 // get all blogs
  export const getAllBlog = async() => {
    try {
        await connectDb();

        await connectDb();
        const blog = await blogModel.find().exec();
        return JSON.parse(JSON.stringify(blog));
    } catch (error: any) {
        throw new Error(error);
    }
  }