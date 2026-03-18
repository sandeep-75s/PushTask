import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    body: {
      type: String,
      required: [true, "Body is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Post = mongoose.model<IPost>("Post", PostSchema);
