import { eAnnouncementDurations } from "@/constants/enums";
import { model, models, Schema } from "mongoose";

const announcementSchema = new Schema<IAnnouncement>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		duration: {
			type: String,
			enum: eAnnouncementDurations,
			default: eAnnouncementDurations.ONE_WEEK,
		},
		userTags: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],

		isHidden: {
			types: Boolean,
			default: false,
		},
		isPinned: {
			types: Boolean,
			default: false,
		},
		date: Date,
	},
	{ timestamps: true }
);

export default models.Announcement || model("Announcement", announcementSchema);
