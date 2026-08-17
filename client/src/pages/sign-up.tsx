import { useForm } from "react-hook-form";
import type { SignUpFormData } from "@/types";
import Field from "@/components/formField";
import useAPIRequest from "@/hooks/apiRequest";
import { signUpRequest } from "@/utils/requests";
import { Link, useNavigate } from "react-router-dom";
import Error from "./error";
import toast from "react-hot-toast";
import { Alert, Logo, Spinner } from "@/assets/icons";

function SignUp() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<SignUpFormData>();
	const navigate = useNavigate();

	const { execute: signUpExecute, errorMessage } = useAPIRequest(
		signUpRequest,
		setError,
	);

	const onSubmit = async (formData: SignUpFormData) => {
		await signUpExecute(formData);
		navigate("/sign-in");
		toast.success("You have signed up successfully");
	};

	if (errorMessage) return <Error message={errorMessage} />;
	return (
		<main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 transition-colors">
			<section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-colors sm:p-10">
				<header className="mb-8 flex flex-col items-center text-center">
					<span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
						<Logo />
					</span>
					<h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
						Create an account
					</h1>
					<p className="mt-2 text-slate-600">
						Join our blog community today.
					</p>
				</header>

				{errors.root && (
					<div
						role="alert"
						className="mb-6 flex gap-2.5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400"
					>
						<Alert />
						<p>
							<span className="font-semibold">Error: </span>
							{errors.root.message}
						</p>
					</div>
				)}

				<form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
					<Field
						id="name"
						name="name"
						label="Name"
						placeholder="Your name"
						register={register}
						errorMessage={errors.name?.message}
						required
						minLength={3}
						maxLength={15}
					/>

					<Field
						id="email"
						name="email"
						label="Email Address"
						type="email"
						placeholder="you@example.com"
						register={register}
						errorMessage={errors.email?.message}
						required
						autoComplete="email"
					/>

					<Field
						id="password"
						name="password"
						label="Password"
						type="password"
						placeholder="••••••••"
						register={register}
						errorMessage={errors.password?.message}
						required
						autoComplete="new-password"
					/>

					<Field
						id="confirmPassword"
						name="confirmPassword"
						label="Confirm Password"
						type="password"
						placeholder="••••••••"
						register={register}
						errorMessage={errors.confirmPassword?.message}
						required
						autoComplete="new-password"
					/>

					<button
						type="submit"
						disabled={isSubmitting}
						className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-[#fff] shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{isSubmitting && <Spinner />}
						{isSubmitting ? "Creating account…" : "Sign Up"}
					</button>
				</form>

				<footer className="mt-8 border-t border-slate-100 pt-6 text-center text-sm text-slate-600 dark:border-slate-800">
					Already have an account?{" "}
					<Link
						to="/sign-in"
						className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
					>
						Sign in
					</Link>
				</footer>
			</section>
		</main>
	);
}

export default SignUp;
