import { model, models, Schema } from "mongoose";

const sermonSchema = new Schema<ISermon>(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
		gallery: [String],
		media: String,
		transcript: [
			{
				type: String,
				required: true,
			},
		],
	},
	{ timestamps: true }
);

export default models.Sermon || model("Sermon", sermonSchema);
