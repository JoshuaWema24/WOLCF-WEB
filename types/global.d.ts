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
		// ministries: string[] | IMinistries[];

		createdAt: Date;
		updatedAt: Date;
	}

	interface IBlog {
		_id?: string;
		title: string;
		body: string;
		user: string | IUser;
		type: "News" | "Announcement" | "Other";

		likes?: string[] | IUser[];

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
		createdAt: Date;
		updatedAt: Date;
	}
}
