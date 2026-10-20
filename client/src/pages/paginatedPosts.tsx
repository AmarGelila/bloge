import useAPIRequest from "@/hooks/apiRequest";
import { nextPostsRequest } from "@/utils/requests";
import { useState, useEffect, useCallback } from "react";
import Error from "./error";
import { BoldSpinner } from "@/assets/icons";
import type { Post } from "@/types";
import PostComponent from "@/components/post/post";
import { Link } from "react-router-dom";

export default function PaginatedPosts() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [nextCursor, setNextCursor] = useState<number | null>(null);

	const { loading, execute, errorMessage } = useAPIRequest(nextPostsRequest);

	const load = useCallback(
		async (cursor: number | null) => {
			const result = await execute(cursor);
			if (!result) return; // aborted, superseded, or failed
			setPosts((prev) => {
				const seen = new Set(prev.map((p) => p.id));
				return [
					...prev,
					...result.posts.filter((p: Post) => !seen.has(p.id)),
				];
			});
			setNextCursor(result.nextCursor ?? null);
		},
		[execute],
	);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		load(null);
	}, [load]);

	if (errorMessage) return <Error message={errorMessage} />;
	return (
		<>
			{posts.length > 0 ? (
				<section>
					<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
						{posts.map((post) => (
							<PostComponent key={post.id} post={post}>
								<Link
									className="flex items-center gap-2 justify-center text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800 dark:hover:text-blue-300"
									to={`/posts/${post.id}`}
								>
									More Details
									<span> &gt;&gt;</span>
								</Link>
							</PostComponent>
						))}
					</div>

					{nextCursor !== null && (
						<button
							className="block mx-auto mt-4 rounded-lg bg-sky-100 px-3 py-2 text-lg font-semibold text-sky-800 transition-colors hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600  dark:bg-sky-900 dark:text-sky-100 dark:hover:bg-sky-800 dark:focus-visible:outline-sky-300"
							type="button"
							disabled={loading}
							onClick={() => load(nextCursor)}
						>
							{loading ? "Loading..." : "Load More"}
						</button>
					)}
				</section>
			) : (
				!loading && (
					<div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
						No posts yet.
					</div>
				)
			)}

			{loading && posts.length === 0 && (
				<div className="mb-4 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
					<BoldSpinner />
					Loading...
				</div>
			)}
		</>
	);
}
