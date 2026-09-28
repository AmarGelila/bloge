import React from "react";
import type { IsEditing } from "@/types";

interface Props {
	isEditing: IsEditing;
	setIsEditing: React.Dispatch<React.SetStateAction<IsEditing>>;
}
function EditBtn({ isEditing, setIsEditing }: Props) {
	return (
		<button
			className="rounded-md border border-slate-200 px-3 py-1 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-700"
			onClick={() => setIsEditing(isEditing)}
		>
			Edit
		</button>
	);
}

export default EditBtn;
