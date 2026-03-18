import { useState, FormEvent } from "react";
import { PostFormData } from "../types";

interface Props {
  onSubmit: (data: PostFormData) => Promise<boolean>;
}

export function PostForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!title.trim()) e.title = "Title is required";
    else if (title.trim().length > 200) e.title = "Max 200 characters";
    if (!body.trim()) e.body = "Body is required";
    return e;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitting(true);
    const ok = await onSubmit({ title: title.trim(), body: body.trim() });
    setSubmitting(false);
    if (ok) {
      setTitle("");
      setBody("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-mono uppercase tracking-widest text-amber-300/70 mb-1.5">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: undefined })); }}
          placeholder="What's on your mind?"
          className={`w-full bg-ink-700 border rounded-lg px-4 py-3 text-paper font-body text-sm placeholder-ink-600/60
            focus:outline-none focus:ring-2 transition-all
            ${errors.title
              ? "border-red-500/70 focus:ring-red-500/30"
              : "border-ink-600 focus:border-amber-400/60 focus:ring-amber-400/20"
            }`}
          maxLength={200}
          disabled={submitting}
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-400 font-body">{errors.title}</p>
        )}
        <p className="mt-1 text-xs text-ink-600/50 font-mono text-right">{title.length}/200</p>
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-widest text-amber-300/70 mb-1.5">
          Body
        </label>
        <textarea
          value={body}
          onChange={(e) => { setBody(e.target.value); setErrors((p) => ({ ...p, body: undefined })); }}
          placeholder="Write something worth reading..."
          rows={4}
          className={`w-full bg-ink-700 border rounded-lg px-4 py-3 text-paper font-body text-sm placeholder-ink-600/60
            focus:outline-none focus:ring-2 transition-all resize-none
            ${errors.body
              ? "border-red-500/70 focus:ring-red-500/30"
              : "border-ink-600 focus:border-amber-400/60 focus:ring-amber-400/20"
            }`}
          disabled={submitting}
        />
        {errors.body && (
          <p className="mt-1 text-xs text-red-400 font-body">{errors.body}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed
          text-ink-950 font-body font-medium text-sm rounded-lg px-6 py-3
          transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Publishing...
          </>
        ) : success ? (
          <>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Published!
          </>
        ) : (
          "Publish Post →"
        )}
      </button>
    </form>
  );
}
