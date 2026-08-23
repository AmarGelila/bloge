import { Router } from "express";
import {
	getPost,
	createPost,
	updatePost,
	deletePost,
	likePost,
	unLikePost,
} from "../controllers/post.js";
import tryCatch from "../utils/tryCatch.js";
import { postValidator } from "../utils/validators.js";
import commentRouter from "./comment.js";
import onlyUser from "../middleware/onlyUser.js";
import onlyAuthor from "../middleware/onlyAuthor.js";
const router = Router();

router.post("/new", onlyAuthor, postValidator, tryCatch(createPost));
router
	.route("/:postId")
	.get(tryCatch(getPost))
	.put(postValidator, onlyAuthor, tryCatch(updatePost))
	.delete(onlyAuthor, tryCatch(deletePost));

router.put("/:postId/like", onlyUser, tryCatch(likePost));

router.put("/:postId/unlike", onlyUser, tryCatch(unLikePost));

router.use("/:postId/comments", onlyUser, commentRouter);

export default router;
