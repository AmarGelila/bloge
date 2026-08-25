import { Link, useNavigate } from "react-router-dom";
import ToggleTheme from "./ThemeToggle";
import { useToken, useUser } from "@/store";
import useAPIRequest from "@/hooks/apiRequest";
import { signOutRequest } from "@/utils/requests";
import Error from "@/pages/error";

function Header() {
	const { user, setUser } = useUser();
	const setToken = useToken((state) => state.setToken);
	const isUser = Boolean(user?.id);
	const navigate = useNavigate();
	const { execute: signOutExecute, errorMessage } =
		useAPIRequest(signOutRequest);

	if (errorMessage) return <Error message={errorMessage} />;

	return (
		<header className="mb-6 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur transition-colors sm:p-5">
			<nav className="flex items-center gap-3 justify-between">
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

				<div className="flex items-center gap-3">
					<ToggleTheme />
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
	);
}

export default Header;
