import { model, models, Schema } from "mongoose";

const applicationSchema = new Schema<IApplication>(
	{
		admins: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
		],
		mainCarouselImgs: [
			{
				type: String,
			},
		],
	},
	{ timestamps: true }
);

export default models.Application || model("Application", applicationSchema);
