import { newCommentRequest } from "@/utils/requests";
import usePosts from "@/store/posts";
import CommentForm from "./form";
import type { Comment } from "@/types";

function NewComment({ postId }: { postId: number }) {
    const pushComment = usePosts((state) => state.pushComment);

    const handleSuccess = (comment: Comment) => {
        pushComment(comment, postId);
    };

    return (
        <CommentForm
            requestAction={newCommentRequest}
            requestArgs={[postId]}
            onSuccess={handleSuccess}
            submitLabel="Comment"
            submittingLabel="Commenting..."
        />
    );
}

export default NewComment;