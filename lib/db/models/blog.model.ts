import { eBlogCategory, eBlogTypes } from "@/constants/enums";
import { model, models, Schema } from "mongoose";

const blogSchema = new Schema<IBlog>(
	{
		title: { type: String, required: true },
		body: { type: String, required: true },
		author: { type: Schema.Types.ObjectId, ref: "User", required: true },
		category: {
			type: String,
			enum: eBlogCategory,
			default: eBlogCategory.OTHER,
		},
		type: {
			type: String,
			enum: eBlogTypes,
		},

		likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
		reads: [{ type: Schema.Types.ObjectId, ref: "User" }],
	},
	{ timestamps: true }
);

export default models.Blog || model("Blog", blogSchema);
