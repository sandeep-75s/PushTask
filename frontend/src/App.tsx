import { useState } from "react";
import { usePosts } from "./hooks/usePosts";
import { PostForm } from "./components/PostForm";
import { PostCard } from "./components/PostCard";
import { SkeletonCard } from "./components/SkeletonCard";
import { ErrorBanner } from "./components/ErrorBanner";

export default function App() {
  const { posts, loading, error, deletingId, createPost, deletePost } = usePosts();
  const [localError, setLocalError] = useState<string | null>(null);

  const displayError = error || localError;

  return (
    <div className="min-h-screen bg-ink-950 text-paper font-body">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-300/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">

        {/* Header */}
        <header className="mb-12 animate-fade-up">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400/60">MyPustak</span>
            <span className="text-ink-700">·</span>
            <span className="text-xs font-mono text-ink-600/50">Post Manager</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-paper leading-tight">
            Your <span className="italic text-amber-400">Ideas</span>,<br />
            Organised.
          </h1>
          <p className="mt-3 text-paper/40 font-body text-sm max-w-md">
            A clean space to write, publish, and manage your posts. Powered by the MERN stack.
          </p>
        </header>

        {/* Error Banner */}
        {displayError && (
          <div className="mb-6">
            <ErrorBanner message={displayError} onDismiss={() => setLocalError(null)} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Sidebar: Create Form */}
          <aside className="lg:col-span-2 animate-fade-up" style={{ animationDelay: "100ms" }}>
            <div className="bg-ink-900 border border-ink-700 rounded-2xl p-6 sticky top-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <h2 className="text-sm font-mono uppercase tracking-widest text-amber-300/80">
                  New Post
                </h2>
              </div>
              <PostForm onSubmit={createPost} />
            </div>
          </aside>

          {/* Main: Posts List */}
          <main className="lg:col-span-3">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-mono uppercase tracking-widest text-ink-600/60">
                {loading ? "Loading..." : `${posts.length} Post${posts.length !== 1 ? "s" : ""}`}
              </h2>
              {!loading && posts.length > 0 && (
                <span className="text-xs font-mono text-ink-600/40">newest first</span>
              )}
            </div>

            <div className="space-y-3">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
              ) : posts.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-ink-700 rounded-xl">
                  <div className="text-4xl mb-3">📝</div>
                  <p className="font-display italic text-paper/30 text-lg">No posts yet.</p>
                  <p className="font-body text-paper/20 text-sm mt-1">Write your first one →</p>
                </div>
              ) : (
                posts.map((post, i) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    index={i}
                    onDelete={deletePost}
                    isDeleting={deletingId === post._id}
                  />
                ))
              )}
            </div>
          </main>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-ink-800 flex items-center justify-between">
          <span className="text-xs font-mono text-ink-700">MyPustak © {new Date().getFullYear()}</span>
          <span className="text-xs font-mono text-ink-700">MongoDB · Express · React · Node</span>
        </footer>
      </div>
    </div>
  );
}
