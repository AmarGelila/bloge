import { useForm } from "react-hook-form";
import type { CommentFormData, CommentFormProps } from "@/types";
import useAPIRequest from "@/hooks/apiRequest";
import toast from "react-hot-toast";
import { Alert, Spinner } from "@/assets/icons";

export default function CommentForm({
	defaultValues,
	requestAction,
	requestArgs = [],
	onSuccess,
	submitLabel,
	submittingLabel,
}: CommentFormProps) {
	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<CommentFormData>({ defaultValues });

	const { execute } = useAPIRequest(requestAction, setError);

	async function onSubmit(data: CommentFormData) {
		try {
			const comment = await execute(...requestArgs, data);
			if (!comment) return;
			onSuccess(comment);
			toast.success(
				`Comment ${submitLabel === "Save Changes" ? "Updated" : "Created"} Successfully`,
			);
			if (!defaultValues) {
				reset();
			}
		} catch (error) {
			toast.error("Unexpected error occured, try again later... ");
			console.log(error);
		}
	}
	const fieldId = defaultValues
		? "edit-comment-content"
		: "new-comment-content";
	return (
		<div className="w-full">
			{errors.root?.message ? (
				<div
					role="alert"
					className="mb-3 flex gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400"
				>
					<Alert />
					<p>{errors.root.message}</p>
				</div>
			) : null}
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
				<div>
					<textarea
						id={fieldId}
						rows={3}
						placeholder="Add a comment..."
						className="w-full resize-y rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none dark:bg-slate-950 dark:placeholder:text-slate-500 transition-all"
						{...register("content")}
					/>
					{errors.content?.message && (
						<p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
							{errors.content.message}
						</p>
					)}
				</div>
				<div className="flex items-center justify-end">
					<button
						className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-[#fff] transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
						type="submit"
						disabled={isSubmitting}
					>
						{isSubmitting && <Spinner />}
						{isSubmitting ? submittingLabel : submitLabel}
					</button>
				</div>
			</form>
		</div>
	);
}
