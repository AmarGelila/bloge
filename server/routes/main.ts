import { Router } from "express";
import tryCatch from "../utils/tryCatch";
import { getPosts, getUser } from "../controllers/main";
import onlyUser from "../middleware/onlyUser";

const router = Router();

router.get("/posts", tryCatch(getPosts));
router.get("/user", onlyUser, tryCatch(getUser));

export default router;
