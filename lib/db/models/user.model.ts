import { model, models, Schema } from "mongoose";

const userSchema = new Schema<IUser>(
	{
		clerkId: { type: String, required: true, unique: true, immutable: true },
		fname: { type: String, required: true },
		lname: { type: String, required: true },
		imageUrl: String,
		email: { type: String, required: true, unique: true },
		bio: String,
		homeTown: String,
		role: {
			type: String,
			required: true,
			enum: ["Member", "Admin", "Pastor"],
			default: "Member",
		},
		
	},
	{ timestamps: true }
);

export default models.User || model("User", userSchema);
