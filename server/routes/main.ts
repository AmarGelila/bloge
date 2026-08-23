import { Router } from "express";
import tryCatch from "../utils/tryCatch.js";
import { getPosts, getUser } from "../controllers/main.js";
import onlyUser from "../middleware/onlyUser.js";

const router = Router();

router.get("/posts", tryCatch(getPosts));
router.get("/user", onlyUser, tryCatch(getUser));

export default router;
