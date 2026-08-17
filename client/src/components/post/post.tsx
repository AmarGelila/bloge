import type { PostCompProps } from "@/types";
import DOMPurify from "dompurify";
import "react-quill-new/dist/quill.snow.css";
import { Link } from "react-router-dom";
import { formatTimeAgo } from "@/utils/formatTime";

function PostComp({ post, isUser }: PostCompProps) {
	const postDate = new Date(post.time);

	return (
		<article className="flex h-full flex-col space-y-4 rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm transition hover:shadow-lg">
			<div>
				<h3 className="line-clamp-2 text-lg font-semibold text-slate-900">
					{post.title}
				</h3>
				<time
					dateTime={postDate.toISOString()}
					className="text-sm text-slate-500 dark:text-slate-400"
				>
					{formatTimeAgo(postDate)}
				</time>
			</div>

			<div className="relative -mt-1">
				<div
					className="ql-editor max-h-44 overflow-hidden text-sm leading-6 text-slate-700 dark:text-slate-100"
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(post.content),
					}}
				/>
				<div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-white/95 to-transparent" />
			</div>

			<footer className="mt-auto flex flex-col gap-2 pt-2">
				{isUser ? (
					<Link
						className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800 dark:hover:text-blue-300"
						to={`/posts/${post.id}`}
					>
						Details
					</Link>
				) : (
					<Link
						to="/sign-in"
						className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:hover:text-slate-100"
					>
						Sign in to view details, like, and comment.
					</Link>
				)}
			</footer>
		</article>
	);
}

export default PostComp;
