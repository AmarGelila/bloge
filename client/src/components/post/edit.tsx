import type { EditPostProps, Post } from "@/types";
import { editPostRequest } from "@/utils/requests";
import usePosts from "@/store/posts";
import PostForm from "./form";

function EditPost({ postId, title, content, setIsEditing }: EditPostProps) {
	const updatePost = usePosts((state) => state.updatePost);

	const handleSuccess = (updatedPost: Post) => {
		updatePost(updatedPost);
		setIsEditing(false);
	};

	return (
		<PostForm
			defaultValues={{ title, content }}
			requestAction={editPostRequest}
			postId={postId}
			onSuccess={handleSuccess}
			submitLabel="Save Changes"
			submittingLabel="Saving..."
		/>
	);
}

export default EditPost;
