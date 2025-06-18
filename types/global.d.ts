import {
	eAnnouncementDurations,
	eBlogCategory,
	eBlogTypes,
} from "@/constants/enums";

export {};

declare global {
	interface IUser {
		_id?: string;
		clerkId: string;
		username: string;
		fname: string;
		lname: string;
		imageUrl?: string;
		email: string;

		bio?: string;
		homeTown?: string;

		role: "Member" | "Admin" | "Pastor";

		createdAt: Date;
		updatedAt: Date;
	}

	interface IBlog {
		_id?: string;
		author: string | IUser;
		title: string;
		body: string;
		category?: eBlogCategory;
		type: eBlogTypes;

		likes?: string[] | IUser[];
		reads?: string[] | IUser[];

		createdAt: Date;
		updatedAt: Date;
	}

	interface IAnnouncement {
		_id?: string;
		user: IUser | string;
		title: string;
		body: string;
		date?: Date;
		duration?: eAnnouncementDurations;
		userTags?: IUser[] | string[];

		isHidden?: boolean;
		isPinned?: boolean;

		createdAt: Date;
		updatedAt: Date;
	}

	interface ISermon {
		_id?: string;
		title: string;
		author: IUser | string;
		transcript: string[];
		media?: string;
		gallery?: string[];

		isHidden?: boolean;

		likes?: string[] | IUser[];

		createdAt: Date;
		updatedAt: Date;
	}

	interface IComment {
		_id?: string;

		item: string | ISermon | IBlog;
		user: string | IUser;
		body: string;
		refComment?: string | IComment;

		likes?: string[] | IUser[];

		isHidden?: boolean;

		createdAt: Date;
		updatedAt: Date;
	}

	interface IMinistries {
		_id?: string;
		leader: string | IUser;

		banner?: string;
		description: string;
		roles: string[];

		members?: string[] | IUser[];
		meet?: string; // ? interval when ministries meet.

		createdAt: Date;
		updatedAt: Date;
	}

	interface IApplication {
		_id?: string;

		admins: IUser[] | string[];
		mainCarouselImgs?: string[];

		createdAt: Date;
		updatedAt: Date;
	}
}
