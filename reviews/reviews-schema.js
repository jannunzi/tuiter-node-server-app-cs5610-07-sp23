import mongoose from "mongoose";
const reviewsSchema = new mongoose.Schema(
  {
    text: String,
    albumId: String,
    albumName: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { collection: "reviews" }
);

export default reviewsSchema;
