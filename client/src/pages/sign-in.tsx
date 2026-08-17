import { useForm } from "react-hook-form";
import Field from "@/components/formField";
import type { SignInFormData } from "@/types";
import { useToken, useUser } from "@/store";
import { Link, useNavigate } from "react-router-dom";
import useAPIRequest from "@/hooks/apiRequest";
import { signInRequest, userRequest } from "@/utils/requests";
import Error from "./error";
import { Alert, Google, Logo, Spinner } from "@/assets/icons";

function SignIn() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<SignInFormData>();

	const navigate = useNavigate();
	const setToken = useToken((state) => state.setToken);
	const setUser = useUser((state) => state.setUser);
	const { execute: signInExecute, errorMessage: err1 } = useAPIRequest(
		signInRequest,
		setError,
	);
	const { execute: userExecute, errorMessage: err2 } = useAPIRequest(
		userRequest,
		undefined,
		setUser,
	);
	const errorMessage = err1 || err2;

	const onSubmit = async (formData: SignInFormData) => {
		const res1 = await signInExecute(formData);
		setToken(res1?.token || null);
		const res2 = await userExecute();
		setUser(res2 || null);
		navigate("/");
	};

	if (errorMessage) return <Error message={errorMessage} />;
	return (
		<main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 transition-colors">
			<section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-colors sm:p-10">
				<header className="mb-8 flex flex-col items-center text-center">
					<span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
						<Logo />
					</span>
					<h1 className="text-2xl font-bold tracking-tight text-slate-900">
						Welcome back
					</h1>
					<p className="mt-2 text-sm text-slate-600">
						Please sign in to your account.
					</p>
				</header>

				{errors.root && (
					<div
						role="alert"
						className="mb-6 flex gap-2.5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400"
					>
						<Alert />
						<p>{errors.root.message}</p>
					</div>
				)}

				<form
					className="space-y-5"
					onSubmit={handleSubmit(onSubmit)}
					noValidate
				>
					<Field
						id="email"
						label="Email"
						type="email"
						name="email"
						placeholder="you@example.com"
						register={register}
						errorMessage={errors.email?.message}
						required
						autoComplete="email"
					/>

					<Field
						id="password"
						label="Password"
						type="password"
						name="password"
						placeholder="••••••••"
						register={register}
						errorMessage={errors.password?.message}
						required
						autoComplete="current-password"
					/>

					<button
						type="submit"
						disabled={isSubmitting}
						className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-[#fff] transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{isSubmitting && <Spinner />}
						{isSubmitting ? "Signing in…" : "Sign In"}
					</button>
				</form>

				<div className="my-6 flex items-center gap-3">
					<span className="h-px flex-1 bg-slate-200" />
					<span className="text-xs font-medium uppercase tracking-wide text-slate-600">
						Or continue with
					</span>
					<span className="h-px flex-1 bg-slate-200" />
				</div>

				<a
					href={`${import.meta.env.VITE_API_BASE_URL}/auth/sign-in/google`}
					className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:hover:bg-slate-800"
				>
					<Google />
					Continue with Google
				</a>

				<footer className="mt-8 text-center text-sm text-slate-600">
					Don't have an account?{" "}
					<Link
						to="/sign-up"
						className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
					>
						Sign up
					</Link>
				</footer>
			</section>
		</main>
	);
}

export default SignIn;
