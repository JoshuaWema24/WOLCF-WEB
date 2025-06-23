"use server";

import { revalidatePath } from "next/cache";
import { connectDb } from "../db/db";
import announcementModel from "../db/models/announcement.model";

//create announcement
export const createAnnouncement = async (
  newAnnouncement: IAnnouncement,
  pathname: string
) => {
  try {
    await connectDb();

    await announcementModel.create(newAnnouncement);
    revalidatePath(pathname);
  } catch (error: any) {
    throw new Error(error);
  }
};

//delete announcement
export const deleteAnnouncement = async (
  announcementId: string,
  pathname: string
) => {
  try {
    await connectDb();

    await announcementModel.findByIdAndDelete(announcementId);
    revalidatePath(pathname);
  } catch (error: any) {
    throw new Error(error);
  }
};

// update announcement
export const updateAnnouncement = async (
  updatedAnnouncement: IAnnouncement,
  pathname: string
) => {
  try {
    await connectDb();
    await announcementModel.findByIdAndUpdate(
      updatedAnnouncement._id,
      updatedAnnouncement
    );
    revalidatePath(pathname);
  } catch (error: any) {
    throw new Error(error);
  }
};

// get one announcement
export const getAnnouncement = async (announcementId: IAnnouncement["_id"]) => {
  try {
    await connectDb();

    const announcement = await announcementModel
      .findById(announcementId)
      .exec();
    return JSON.parse(JSON.stringify(announcement));
  } catch (error: any) {
    throw new Error(error);
  }
};

// get all announcements
export const getAnnouncements = async (): Promise<IAnnouncement[]> => {
  try {
    await connectDb();

    const announcements = await announcementModel.find().exec();
    return JSON.parse(JSON.stringify(announcements));
  } catch (error: any) {
    throw new Error(error);
  }
};
