import { Request, Response } from "express";
import { Post } from "../models/Post";

// GET /posts — return all posts (newest first)
export const getAllPosts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch posts", error });
  }
};

// POST /posts — create a new post
export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      res.status(400).json({ success: false, message: "Title and body are required" });
      return;
    }

    const post = await Post.create({ title: title.trim(), body: body.trim() });
    res.status(201).json({ success: true, data: post });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e: any) => e.message);
      res.status(400).json({ success: false, message: messages.join(", ") });
    } else {
      res.status(500).json({ success: false, message: "Failed to create post", error });
    }
  }
};

// DELETE /posts/:id — delete a post by id
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      res.status(404).json({ success: false, message: `Post not found` });
      return;
    }

    res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete post", error });
  }
};
