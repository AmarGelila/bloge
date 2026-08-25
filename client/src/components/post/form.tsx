import { Controller, useForm } from "react-hook-form";
import Field from "../formField";
import type { PostFormProps, PostFormData } from "@/types";
import useAPIRequest from "@/hooks/apiRequest";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import toast from "react-hot-toast";
import { Alert, Spinner } from "@/assets/icons";

export default function PostForm({
	defaultValues,
	requestAction,
	postId,
	onSuccess,
	submitLabel,
	submittingLabel,
}: PostFormProps) {
	const {
		control,
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<PostFormData>({ defaultValues });

	const { execute } = useAPIRequest(requestAction, setError);

	async function onSubmit(data: PostFormData) {
		try {
			let post;
			if (postId) post = await execute(postId, data);
			else post = await execute(data);

			if (!post) return;
			onSuccess(post);
			toast.success(
				`Post ${submitLabel === "Save Changes" ? "Updated" : "Created"} Successfully`,
			);
			if (!defaultValues) {
				reset({ title: "", content: "" });
			}
		} catch (error) {
			toast.error("Unexpected error occured, try again later... ");
			console.log(error);
		}
	}

	return (
		<section className="space-y-6 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm transition-colors sm:p-6">
			{errors.root?.message ? (
				<div
					role="alert"
					className="flex gap-2.5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400"
				>
					<Alert />
					<p>{errors.root.message}</p>
				</div>
			) : null}
			<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
				<Field
					id="post-title"
					label="Title"
					name="title"
					placeholder="Title..."
					register={register}
					errorMessage={errors.title?.message}
				/>
				<div>
					<label
						htmlFor="post-content"
						className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
					>
						Content
					</label>
					<div className="rounded-lg [&_.ql-editor]:h-70! [&_.ql-editor]:overflow-y-auto [&_.ql-editor]:custom-scrollbar">
						<Controller
							name="content"
							control={control}
							rules={{ required: "Content is required" }}
							render={({ field }) => (
								<ReactQuill
									id="post-content"
									theme="snow"
									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>
					</div>
					{errors.content?.message && (
						<p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
							{errors.content.message}
						</p>
					)}
				</div>

				<div className="flex items-center justify-end">
					<button
						className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-[#fff] transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
						type="submit"
						disabled={isSubmitting}
					>
						{isSubmitting && <Spinner />}
						{isSubmitting ? submittingLabel : submitLabel}
					</button>
				</div>
			</form>
		</section>
	);
}
