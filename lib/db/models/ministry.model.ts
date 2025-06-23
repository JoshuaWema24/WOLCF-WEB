import { model, models, Schema } from "mongoose";

const ministrySchema = new Schema<IMinistry>(
  {
    leader: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    banner: String,
    description: {
      type: String,
      required: true,
    },
    meet: String,
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    roles: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export default models.Ministry || model("Ministry", ministrySchema);
