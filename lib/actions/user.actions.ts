"use server";

import { revalidatePath } from "next/cache";
import { connectDb } from "../db/db";
import userModel from "../db/models/user.model";

//create user.
export const createUser = async (
	newUser: IUser,
	pathname: string
): Promise<void> => {
	try {
		await connectDb();

		await userModel.create(newUser);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};

// delete user
export const deleteUser = async (
	userId: string,
	pathname: string
): Promise<void> => {
	try {
		await connectDb();

		await userModel.findByIdAndDelete(userId);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};

//update user
export const updateUser = async (
	updatedUser: IUser,
	pathname: string
): Promise<void> => {
	try {
		await connectDb();

		await userModel.findByIdAndUpdate(updatedUser._id, updatedUser);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};

// get one user.
export const getUser = async (userId: IUser["_id"]): Promise<IUser> => {
	try {
		await connectDb();

		const user = await userModel.findById(userId).exec();

		return JSON.parse(JSON.stringify(user));
	} catch (error: any) {
		throw new Error(error);
	}
};

//get all users.
export const getUsers = async (): Promise<IUser[]> => {
	try {
		await connectDb();
		const users = await userModel.find().exec();
		return JSON.parse(JSON.stringify(users));
	} catch (error: any) {
		throw new Error(error);
	}
};
