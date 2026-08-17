import { newPostRequest } from "@/utils/requests";
import usePosts from "@/store/posts";
import PostForm from "./form";

function NewPost() {
    const pushPost = usePosts((state) => state.pushPost);

    return (
        <PostForm
            requestAction={newPostRequest}
            onSuccess={pushPost}
            submitLabel="Publish"
            submittingLabel="Publishing..."
        />
    );
}

export default NewPost;