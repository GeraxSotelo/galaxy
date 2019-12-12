import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Star = new Schema(
  {
    name: { type: String, required: true },
    color: { type: String },
    galaxyName: { type: String, ref: "Galaxy", required: true }
    // galaxyId: { type: ObjectId, ref: "Galaxy", required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default Star;