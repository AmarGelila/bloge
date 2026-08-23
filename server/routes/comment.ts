import { Router } from "express";

import { commentValidator } from "../utils/validators.js";
import tryCatch from "../utils/tryCatch.js";
import {
	createComment,
	updateComment,
	deleteComment,
} from "../controllers/comment.js";

const router = Router({ mergeParams: true });

router.post("/new", commentValidator, tryCatch(createComment));
router
	.route("/:commentId")
	.put(commentValidator, tryCatch(updateComment))
	.delete(tryCatch(deleteComment));

export default router;
