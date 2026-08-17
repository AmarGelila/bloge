import { Router } from "express";
import {
	getPost,
	createPost,
	updatePost,
	deletePost,
	likePost, 
	unLikePost
} from "../controllers/post";
import tryCatch from "../utils/tryCatch";
import { postValidator } from "../utils/validators";
import commentRouter from "./comment";
import onlyUser from "../middleware/onlyUser";
import onlyAuthor from "../middleware/onlyAuthor";
const router = Router();

router.post("/new", onlyAuthor, postValidator, tryCatch(createPost));
router
	.route("/:postId")
	.get(tryCatch(getPost))
	.put(postValidator, onlyAuthor, tryCatch(updatePost))
	.delete(onlyAuthor, tryCatch(deletePost));

router
	.put("/:postId/like",onlyUser,tryCatch(likePost));

router
	.put("/:postId/unlike",onlyUser,tryCatch(unLikePost));
	
router.use("/:postId/comments", onlyUser, commentRouter);

export default router;
