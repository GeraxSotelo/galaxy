import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Galaxy = new Schema(
  {
    name: { type: String, required: true, unique: true },
    imgURL: { type: String }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Galaxy;
