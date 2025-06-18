import { model, models, Schema } from "mongoose";

const blogSchema = new Schema<IBlog>(
	{
		title: { type: String, required: true },
		body: { type: String, required: true },
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		type: {
			type: String,
			default: "Other",
			enum: ["News", "Announcement", "Other"],
		},
		likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
	},
	{ timestamps: true }
);

export default models.Blog || model("Blog", blogSchema);
