import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Planet = new Schema(
  {
    name: { type: String, required: true },
    starName: { type: String, ref: "Star", required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default Planet;