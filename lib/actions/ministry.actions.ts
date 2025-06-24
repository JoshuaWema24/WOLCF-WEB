"use server";

import { revalidatePath } from "next/cache";
import { connectDb } from "../db/db";
import ministryModel from "../db/models/ministry.model";

export const createMinistry = async (
	newMinistry: IMinistry,
	pathname: string
): Promise<void> => {
	try {
		await connectDb();

		await ministryModel.create(newMinistry);
		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};
export const deleteMinistry = async (
	ministryId: string,
	pathname: string
): Promise<void> => {
	try {
		await connectDb();

		await ministryModel.findByIdAndDelete(ministryId);
		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};
export const updateMinistry = async (
	updatedMinistry: IMinistry,
	pathname: string
): Promise<void> => {
	try {
		await connectDb();
		await ministryModel.findByIdAndUpdate(updatedMinistry._id, updatedMinistry);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getMinistry = async (ministryId: string): Promise<IMinistry> => {
	try {
		await connectDb();

		const ministry = await ministryModel.findById(ministryId).exec();

		return JSON.parse(JSON.stringify(ministry));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getMinistries = async (): Promise<IMinistry[]> => {
	try {
		await connectDb();

		const ministries = await ministryModel.find().exec();
		return JSON.parse(JSON.stringify(ministries));
	} catch (error: any) {
		throw new Error(error);
	}
};
