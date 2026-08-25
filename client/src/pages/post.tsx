import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import "react-quill-new/dist/quill.snow.css";
import type { Comment, IsEditing } from "@/types";
import { useUser } from "@/store";
import { usePosts } from "@/store";
import useAPIRequest from "@/hooks/apiRequest";
import {
	deletePostRequest,
	likePostRequest,
	unlikePostRequest,
} from "@/utils/requests";
import Modal from "@/components/Modal";
import EditPost from "@/components/post/edit.tsx";
import CommentComp from "@/components/comment/comment";
import EditComment from "@/components/comment/edit.tsx";
import NewComment from "@/components/comment/new";
import Error from "./error";
import { formatTimeAgo } from "@/utils/formatTime";
import toast from "react-hot-toast";
import { Like, Unlike } from "@/assets/icons";
import Header from "@/components/header";

function PostPage() {
	const { postId: strPostId } = useParams();
	const postId = parseInt(strPostId ?? "", 10);
	const navigate = useNavigate();
	const [isEditing, setIsEditing] = useState<IsEditing>(false);

	const { user, updateLikes } = useUser();
	const post = usePosts((state) => state.getPostById(Number(postId)));
	const likePost = usePosts((state) => state.likePost);
	const unlikePost = usePosts((state) => state.unlikePost);
	const deletePost = usePosts((state) => state.deletePost);

	const { execute: deleteExecute, errorMessage: err1 } =
		useAPIRequest(deletePostRequest);
	const { execute: likeExecute, errorMessage: err2 } =
		useAPIRequest(likePostRequest);
	const { execute: unlikeExecute, errorMessage: err3 } =
		useAPIRequest(unlikePostRequest);

	const postDate = new Date(post?.time || "");
	const isUser = Boolean(user?.id);
	const isAuthor = Boolean(user?.isAuthor);
	const isLiked =
		user?.likedPosts.find((ele) => ele.id === postId) !== undefined;
	const errorMessage = err1 || err2 || err3;

	const handleDelete = useCallback(async () => {
		await deleteExecute(postId);
		deletePost(postId);
		navigate("/");
		toast.success("Post Deleted Successfully");
	}, [deleteExecute, deletePost, navigate, postId]);

	const handleLike = useCallback(async () => {
		likePost(postId);
		updateLikes(postId);
		await likeExecute(postId);
	}, [likeExecute, postId, likePost, updateLikes]);

	const handleUnlike = useCallback(async () => {
		unlikePost(postId);
		updateLikes(postId);
		await unlikeExecute(postId);
	}, [unlikeExecute, postId, unlikePost, updateLikes]);

	if (!isUser) navigate("/sign-in");
	if (isNaN(postId)) return <Error message="Invalid Post ID" />;
	if (errorMessage) return <Error message={errorMessage} />;

	return (
		<>
			<div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 transition-colors">
				<div className="mx-auto max-w-7xl">
					{isEditing === "post" && (
						<Modal setIsOpen={setIsEditing}>
							<EditPost
								postId={Number(postId)}
								title={post?.title as string}
								content={post?.content as string}
								setIsEditing={setIsEditing}
							/>
						</Modal>
					)}
					{typeof isEditing === "number" && (
						<Modal setIsOpen={setIsEditing}>
							<EditComment
								postId={Number(postId)}
								commentId={isEditing}
								setIsEditing={setIsEditing}
							/>
						</Modal>
					)}
					<Header />
					{post && (
						<article className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
							<section className="space-y-4 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800/60 sm:p-6">
								<div>
									<div className="flex flex-wrap items-start justify-between gap-3">
										<h3 className="text-3xl font-semibold text-slate-900 dark:text-slate-100 wrap-break-word">
											{post.title}
										</h3>

										{isAuthor ? (
											<div className="flex items-center gap-3">
												<button
													className="rounded-full border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
													type="button"
													onClick={handleDelete}
												>
													Delete
												</button>
												<button
													className="rounded-md border border-slate-200 px-3 py-1 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-700"
													onClick={() =>
														setIsEditing("post")
													}
												>
													Edit
												</button>
											</div>
										) : null}
									</div>
									<time
										dateTime={postDate.toISOString()}
										className="text-sm text-slate-500 dark:text-slate-400"
									>
										{formatTimeAgo(postDate)}
									</time>
								</div>
								<div
									className="ql-editor mt-4 prose prose-slate max-w-none text-slate-700 dark:text-slate-100 overflow-x-auto custom-scrollbar"
									dangerouslySetInnerHTML={{
										__html: DOMPurify.sanitize(
											post.content,
										),
									}}
								/>

								<div className="flex items-center gap-3">
									<span className="me-auto">
										{!isLiked ? (
											<button
												title="like"
												type="button"
												onClick={() => handleLike()}
												aria-pressed={false}
												className="cursor-pointer inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
											>
												<Like />
											</button>
										) : (
											<button
												title="unlike"
												type="button"
												onClick={() => handleUnlike()}
												aria-pressed={true}
												className="cursor-pointer inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-900/60"
											>
												<Unlike />
											</button>
										)}
									</span>
									<span>
										{post?.comments?.length} Comments
									</span>
									<span>{post?._count?.likes} Likes</span>
								</div>
							</section>

							<section className="space-y-6 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800/60 sm:p-6">
								<NewComment postId={postId} />

								<ul className="space-y-4">
									{(post?.comments ?? []).map(
										(comment: Comment) => (
											<CommentComp
												key={comment.id}
												comment={comment}
												isAuthor={isAuthor}
												setIsEditing={setIsEditing}
											/>
										),
									)}
								</ul>
							</section>
						</article>
					)}
				</div>
			</div>
		</>
	);
}

export default PostPage;
