import { useState, useEffect, useCallback } from "react";
import { Post, PostFormData } from "../types";
import { postService } from "./api";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await postService.getAll();
      setPosts(data);
    } catch {
      setError("Could not load posts. Is the server running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const createPost = async (payload: PostFormData): Promise<boolean> => {
    try {
      const newPost = await postService.create(payload);
      setPosts((prev) => [newPost, ...prev]);
      return true;
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to create post.";
      setError(msg);
      return false;
    }
  };

  const deletePost = async (id: string): Promise<void> => {
    setDeletingId(id);
    try {
      await postService.remove(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      setError("Failed to delete post.");
    } finally {
      setDeletingId(null);
    }
  };

  return { posts, loading, error, deletingId, createPost, deletePost, refetch: fetchPosts };
}
