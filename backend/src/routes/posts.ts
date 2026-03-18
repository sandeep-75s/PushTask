import { Router } from "express";
import { getAllPosts, createPost, deletePost } from "../controllers/postController";

const router = Router();

router.get("/", getAllPosts);
router.post("/", createPost);
router.delete("/:id", deletePost);

export default router;
