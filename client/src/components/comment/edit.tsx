import type { Comment, EditCommentProps } from "@/types";
import { editCommentRequest } from "@/utils/requests";
import usePosts from "@/store/posts";
import CommentForm from "./form";

function EditComment({ postId, commentId, setIsEditing }: EditCommentProps) {
    const updateComment = usePosts((state) => state.updateComment);
    const content = usePosts((state) =>
        state.getCommentContent(Number(postId), commentId),
    );

    const handleSuccess = (comment: Comment) => {
        updateComment(postId, commentId, comment);
        setIsEditing(false);
    };

    return (
        <CommentForm
            defaultValues={{ content: content ?? "" }}
            requestAction={editCommentRequest}
            requestArgs={[postId, commentId]}
            onSuccess={handleSuccess}
            submitLabel="Save Changes"
            submittingLabel="Saving..."
        />
    );
}

export default EditComment;