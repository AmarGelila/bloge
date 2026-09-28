import type { CommentCompProps } from "@/types";
import useAPIRequest from "@/hooks/apiRequest";
import { deleteCommentRequest } from "@/utils/requests";
import { useCallback } from "react";
import { useUser } from "@/store";
import { usePosts } from "@/store";
import { formatTimeAgo } from "@/utils/formatTime";
import toast from "react-hot-toast";
import EditBtn from "../editBtn";
import DeleteBtn from "../deleteBtn";

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
		<li className="relative rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm">
			{(isAuthor || isUserComment) && (
				<div className="flex justify-end gap-2">
					<DeleteBtn handleDelete={handleDelete} />

					{isUserComment && (
						<EditBtn
							isEditing={comment.id}
							setIsEditing={setIsEditing}
						/>
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
