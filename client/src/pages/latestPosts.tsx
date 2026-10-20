import useAPIRequest from "@/hooks/apiRequest";
import { latestPostsRequest } from "@/utils/requests";
import { useEffect } from "react";
import Error from "./error";
import PostComponent from "@/components/post/post";
import { BoldSpinner } from "@/assets/icons";
import type { Post } from "@/types";
import { Link } from "react-router-dom";

function LatestPosts() {
	const {
		data: posts,
		loading,
		execute,
		errorMessage,
	} = useAPIRequest(latestPostsRequest);

	useEffect(() => {
		execute();
	}, [execute]);

	if (errorMessage) return <Error message={errorMessage} />;

	return (
		<>
			{loading && (
				<div className="mb-4 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
					<BoldSpinner />
					Loading...
				</div>
			)}

			{posts && posts.length > 0 ? (
				<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
					{posts.map((post: Post) => (
						<PostComponent key={post.id} post={post}>
							<Link
								to="/sign-in"
								className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:hover:text-slate-100"
							>
								Sign in to view details, like, and comment.
							</Link>
						</PostComponent>
					))}
				</div>
			) : (
				!loading && (
					<div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
						No posts yet.
					</div>
				)
			)}
		</>
	);
}

export default LatestPosts;
