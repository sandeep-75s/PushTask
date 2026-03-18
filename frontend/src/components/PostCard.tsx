import { Post } from "../types";

interface Props {
  post: Post;
  onDelete: (id: string) => void;
  isDeleting: boolean;
  index: number;
}

export function PostCard({ post, onDelete, isDeleting, index }: Props) {
  const date = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article
      className="group bg-ink-800 border border-ink-700 hover:border-amber-400/30 rounded-xl p-6
        transition-all duration-300 animate-fade-up"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both", opacity: 0 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-amber-400/50 shrink-0">#{String(index + 1).padStart(2, "0")}</span>
            <span className="text-xs font-mono text-ink-600/50">{date}</span>
          </div>
          <h2 className="font-display text-lg text-paper leading-snug mb-2 group-hover:text-amber-200 transition-colors">
            {post.title}
          </h2>
          <p className="text-sm font-body text-paper/60 leading-relaxed line-clamp-3">{post.body}</p>
        </div>

        <button
          onClick={() => onDelete(post._id)}
          disabled={isDeleting}
          aria-label="Delete post"
          className="shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100
            p-2 rounded-lg border border-ink-600 hover:border-red-500/60 hover:bg-red-500/10
            text-ink-600/60 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed
            transition-all duration-200"
        >
          {isDeleting ? (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          )}
        </button>
      </div>
    </article>
  );
}
