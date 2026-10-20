import { Router } from "express";
import tryCatch from "../utils/tryCatch.js";
import { getLatestPosts, getPostsPage, getUser } from "../controllers/main.js";
import onlyUser from "../middleware/onlyUser.js";

const router = Router();

router.get("/latest-posts", tryCatch(getLatestPosts)); // latest 5 posts
router.get("/posts", onlyUser, tryCatch(getPostsPage)); // page
router.get("/user", onlyUser, tryCatch(getUser));

export default router;
