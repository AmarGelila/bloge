import { useUser } from "@/store";
import NewPost from "@/components/post/new";
import Header from "@/components/header";
import PaginatedPosts from "./paginatedPosts";
import LatestPosts from "./latestPosts";

function Main() {
	const { user } = useUser();
	const isUser = Boolean(user?.id);
	const isAuthor = Boolean(user?.isAuthor);

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

					{isUser ? <PaginatedPosts /> : <LatestPosts />}
				</main>
			</div>
		</div>
	);
}

export default Main;
