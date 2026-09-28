interface Props {
	handleDelete: () => Promise<void>;
}
function DeleteBtn({ handleDelete }: Props) {
	return (
		<button
			className="rounded-md border border-red-200 bg-red-50 px-3 py-1 text-sm text-red-700 transition hover:bg-red-100"
			type="button"
			onClick={handleDelete}
		>
			Delete
		</button>
	);
}

export default DeleteBtn;
