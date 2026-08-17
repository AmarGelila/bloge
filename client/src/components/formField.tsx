import type { FieldValues } from "react-hook-form";
import type { FormFieldData } from "@/types";

function Field<T extends FieldValues>(data: FormFieldData<T>) {
	const {
		id,
		name,
		label,
		placeholder,
		type,
		register,
		errorMessage,
		...rest
	} = data;

	return (
		<div className="w-full">
			<label
				className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
				htmlFor={id}
			>
				{label}
			</label>
			<input
				id={id}
				type={type || "text"}
				className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none dark:bg-slate-950 dark:placeholder:text-slate-500 transition-all"
				placeholder={placeholder}
				{...register(name)}
				{...rest}
			/>
			{errorMessage && (
				<p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
					{errorMessage}
				</p>
			)}
		</div>
	);
}

export default Field;
