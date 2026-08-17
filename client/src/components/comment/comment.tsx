import type { CommentCompProps } from "@/types";
import useAPIRequest from "@/hooks/apiRequest";
import { deleteCommentRequest } from "@/utils/requests";
import { useCallback } from "react";
import { useUser } from "@/store";
import { usePosts } from "@/store";
import { formatTimeAgo } from "@/utils/formatTime";
import toast from "react-hot-toast";
import { Bin, Edit } from "@/assets/icons";

function Comment({ comment, isAuthor, setIsEditing }: CommentCompProps) {
	const { user } = useUser();
	const deleteComment = usePosts((state) => state.deleteComment);
	const isUserComment = comment.userId === user?.id;
	const commentDate = new Date(comment.time);

	const { execute: deleteExecute } = useAPIRequest(deleteCommentRequest);
	const handleDelete = useCallback(async () => {
		await deleteExecute(comment.postId, comment.id);
		deleteComment(Number(comment.postId), Number(comment.id));
		toast.success("Comment Deleted Successfully");
	}, [comment.id, comment.postId, deleteComment, deleteExecute]);

	return (
		<li className="rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm">
			{(isAuthor || isUserComment) && (
				<div className="mb-2 flex justify-end gap-2">
					{isAuthor ? (
						<button
							className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-900/60"
							type="button"
							onClick={handleDelete}
						>
							<Bin />
							Delete
						</button>
					) : null}

					{isUserComment && (
						<button
							className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
							type="button"
							onClick={() => setIsEditing(comment.id)}
						>
							<Edit />
							Edit
						</button>
					)}
				</div>
			)}

			<p className="wrap-break-word leading-relaxed text-slate-700 dark:text-slate-100">
				{comment.content}
			</p>

			<time
				dateTime={commentDate.toISOString()}
				title={commentDate.toLocaleString()}
				className="block text-xs text-slate-400 dark:text-slate-500"
			>
				{formatTimeAgo(commentDate)}
			</time>
		</li>
	);
}

export default Comment;
