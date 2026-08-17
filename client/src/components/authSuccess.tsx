import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToken, useUser } from "@/store";
import useAPIRequest from "@/hooks/apiRequest";
import { userRequest } from "@/utils/requests";
import Error from "@/pages/error";

export default function AuthSuccess() {
	const navigate = useNavigate();
	const location = useLocation();
	const { token, setToken } = useToken();
	const setUser = useUser((state) => state.setUser);
	const { execute: userExecute, errorMessage } = useAPIRequest(
		userRequest,
		undefined,
		setUser,
	);

	useEffect(() => {
		const hash = location.hash;

		if (hash) {
			const params = new URLSearchParams(hash.substring(1));
			const token = params.get("token");

			if (token) {
				setToken(token);
			}
		}
	}, [location, setToken]);

	useEffect(() => {
		let cancelled = false;

		(async () => {
			await userExecute();
			if (!cancelled) navigate("/", { replace: true });
		})();

		return () => {
			cancelled = true;
		};
	}, [token, userExecute, navigate]);

	if (errorMessage) return <Error message={errorMessage} />;

	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<div className="text-center">
				<h1 className="text-xl font-bold text-slate-900 dark:text-white">
					Authenticating...
				</h1>
			</div>
		</div>
	);
}
