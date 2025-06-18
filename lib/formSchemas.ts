import { eAnnouncementDurations, eBlogCategory } from "@/constants/enums";
import { z } from "zod";

export const blogZodSchema = z.object({
	title: z.string().min(2).max(500),
	body: z.string().min(2).max(10000),
	type: z.nativeEnum(eBlogCategory).default(eBlogCategory.OTHER),
});

export const announcementSchema = z.object({
	title: z.string().min(2).max(500),
	body: z.string().min(2).max(10000),
	date: z.string().optional(),
	duration: z
		.nativeEnum(eAnnouncementDurations)
		.default(eAnnouncementDurations.ONE_WEEK),
});
