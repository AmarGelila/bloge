import PostComponent from "@/components/post/post";
import { useUser, usePosts } from "@/store";
import useAPIRequest from "@/hooks/apiRequest";
import type { Post } from "@/types";
import { postsRequest } from "@/utils/requests";
import { useEffect } from "react";
import NewPost from "@/components/post/new";
import Error from "./error";
import { BoldSpinner } from "@/assets/icons";
import Header from "@/components/header";

function Main() {
	const { user } = useUser();
	const setPosts = usePosts((state) => state.setPosts);
	const posts = usePosts((state) => state.posts);
	const isUser = Boolean(user?.id);
	const isAuthor = Boolean(user?.isAuthor);
	const {
		loading: postsLoading,
		execute: postsExecute,
		errorMessage,
	} = useAPIRequest(postsRequest, undefined, setPosts);

	useEffect(() => {
		postsExecute();
	}, [postsExecute]);

	if (errorMessage) return <Error message={errorMessage} />;

	return (
		<div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 transition-colors">
			<div className="mx-auto max-w-7xl">
				<Header />
				<main>
					{isAuthor ? (
						<div className="mb-6">
							<NewPost />
						</div>
					) : null}

					{postsLoading && (
						<div className="mb-4 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
							<BoldSpinner />
							Loading...
						</div>
					)}

					{posts && posts.length > 0 ? (
						<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
							{posts.map((post: Post) => (
								<PostComponent
									key={post.id}
									post={post}
									isUser={isUser}
									isAuthor={isAuthor}
								/>
							))}
						</div>
					) : (
						!postsLoading && (
							<div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
								No posts yet.
							</div>
						)
					)}
				</main>
			</div>
		</div>
	);
}

export default Main;
