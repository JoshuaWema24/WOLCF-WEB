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
		_id: number;
		title: string;
		body: string;
		user: string | IUser;
		type: "News" | "Announcement" | "Other";

		likes: string[];

		createdAt: Date;
		updatedAt: Date;
	}

	interface ISermon {
		_id: number;
		title: string;
		author: IUser | string;
		transcript: string;
		media?: string;
		gallery?: string[];

		likes: string[];

		createdAt: Date;
		updatedAt: Date;
	}

	interface IComment {
		_id: number;

		item: string | ISermon | IBlog;
		user: string | IUser;
		body: string;
		refComment: string | IComment;

		likes: string[];

		isHidden?: boolean;

		createdAt: Date;
		updatedAt: Date;
	}
}
