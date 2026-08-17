import PostComponent from "@/components/post/post";
import { useToken, useUser, usePosts } from "@/store";
import useAPIRequest from "@/hooks/apiRequest";
import type { Post } from "@/types";
import { postsRequest, signOutRequest } from "@/utils/requests";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import NewPost from "@/components/post/new";
import Error from "./error";
import ToggleTheme from "@/components/ThemeToggle";
import { BoldSpinner } from "@/assets/icons";

function Main() {
	const { user, setUser } = useUser();
	const setToken = useToken((state) => state.setToken);
	const setPosts = usePosts((state) => state.setPosts);
	const posts = usePosts((state) => state.posts);
	const isUser = Boolean(user?.id);
	const isAuthor = Boolean(user?.isAuthor);
	const navigate = useNavigate();
	const {
		loading: postsLoading,
		execute: postsExecute,
		errorMessage: err1,
	} = useAPIRequest(postsRequest, undefined, setPosts);
	const { execute: signOutExecute, errorMessage: err2 } =
		useAPIRequest(signOutRequest);
	const errorMessage = err1 || err2;

	useEffect(() => {
		postsExecute();
	}, [postsExecute]);

	if (errorMessage) return <Error message={errorMessage} />;

	return (
		<div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 transition-colors">
			<div className="mx-auto max-w-7xl">
				<header className="mb-6 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur transition-colors sm:p-5">
					<nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<div className="flex items-center gap-4">
							<Link
								to="/"
								className="transition-opacity hover:opacity-80"
							>
								<h1 className="inline-block bg-linear-to-r from-blue-600 via-violet-600 to-blue-600 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
									BloGE
								</h1>
							</Link>
						</div>

						<div className="flex flex-wrap items-center gap-3">
							{!isUser ? (
								<>
									<Link
										to="/sign-in"
										className="text-sm text-slate-700 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
									>
										Sign In
									</Link>
									<Link
										to="/sign-up"
										className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-[#fff] transition-colors hover:bg-blue-700"
									>
										Sign Up
									</Link>
								</>
							) : (
								<>
									<ToggleTheme />
									<button
										type="button"
										className="rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-sm text-red-700 transition-colors hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-900/60"
										onClick={async () => {
											await signOutExecute();
											setToken(null);
											setUser(null);
											navigate("/sign-in");
										}}
									>
										Sign Out
									</button>
								</>
							)}
						</div>
					</nav>
				</header>

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
								No posts yet. Start by creating one.
							</div>
						)
					)}
				</main>
			</div>
		</div>
	);
}

export default Main;
