import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { PostsStore, Post, Comment } from "../types";

const usePosts = create<PostsStore>()(
	persist(
		(set, get) => ({
			posts: null,
			getPostById: (id: number) =>
				get().posts?.find((post) => post.id === id),
			getCommentContent: (postId: number, commentId: number) => {
				const post = get().posts?.find((post) => post.id === postId);
				const comment = post?.comments?.find(
					(comment) => comment.id === commentId,
				);
				return comment?.content;
			},
			setPosts: (posts: Post[] | null) => set({ posts }),
			pushPost: (post: Post) =>
				set((state) => ({ posts: [post, ...(state.posts ?? [])] })),
			updatePost: (post: Post) =>
				set((state) => ({
					posts: state.posts?.map((ele) =>
						ele.id === post.id ? post : ele,
					),
				})),
			deletePost: (postId: number) =>
				set((state) => ({
					posts: state.posts?.filter((post) => post.id !== postId),
				})),
			pushComment: (comment: Comment, postId: number) =>
				set((state) => ({
					posts: state.posts?.map((post) =>
						post.id === postId
							? {
									...post,
									comments: [
										comment,
										...(post.comments ?? []),
									],
								}
							: post,
					),
				})),
			updateComment: (
				postId: number,
				commentId: number,
				updatedComment: Comment,
			) => {
				set((state) => ({
					posts: state.posts?.map((post) =>
						post.id !== postId
							? post
							: {
									...post,
									comments: post.comments.map((comment) =>
										comment.id !== commentId
											? comment
											: updatedComment,
									),
								},
					),
				}));
			},
			deleteComment: (postId: number, commentId: number) =>
				set((state) => ({
					posts: state.posts?.map((post) =>
						post.id === postId
							? {
									...post,
									comments: (post.comments ?? []).filter(
										(comment) => comment.id !== commentId,
									),
								}
							: post,
					),
				})),
			likePost: (postId: number) =>
				set((state) => ({
					posts: state.posts?.map((post) =>
						post.id === postId
							? {
									...post,
									_count: { likes: post._count.likes + 1 },
								}
							: post,
					),
				})),
			unlikePost: (postId: number) =>
				set((state) => ({
					posts: state.posts?.map((post) =>
						post.id === postId
							? {
									...post,
									_count: { likes: post._count.likes - 1 },
								}
							: post,
					),
				})),
		}),
		{
			storage: createJSONStorage(() => sessionStorage),
			name: "posts",
		},
	),
);

export default usePosts;
