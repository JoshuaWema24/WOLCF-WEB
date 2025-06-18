import { model, models, Schema } from "mongoose";

const commentSchema = new Schema<IComment>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		item: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		isHidden: {
			type: Boolean,
			default: false,
		},
		likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
		refComment: {
			type: Schema.Types.ObjectId,
			ref: "Comment",
		},
	},
	{ timestamps: true }
);

export default models.Comment || model("Comment", commentSchema);
