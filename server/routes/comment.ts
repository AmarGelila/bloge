import { Router } from "express";

import { commentValidator } from "../utils/validators";
import tryCatch from "../utils/tryCatch";
import {
	createComment,
	updateComment,
	deleteComment,
} from "../controllers/comment";

const router = Router({ mergeParams: true });

router.post("/new", commentValidator, tryCatch(createComment));
router
	.route("/:commentId")
	.put(commentValidator, tryCatch(updateComment))
	.delete(tryCatch(deleteComment));

export default router;
