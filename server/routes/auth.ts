import passport from "passport";
import { Router } from "express";
import { signInValidator, signUpValidator } from "../utils/validators";
import {
	postSignIn,
	postSignUp,
	signOut,
	refreshTokens,
	googleAuthCallback,
} from "../controllers/auth";
import tryCatch from "../utils/tryCatch";
import cookieParser from "cookie-parser";
import onlyUser from "../middleware/onlyUser";

const router = Router();

router.post("/sign-up", signUpValidator, postSignUp);
router.post("/sign-in", signInValidator, postSignIn);
router.get("/sign-out", onlyUser, cookieParser(), signOut);
router.get("/refresh-token", cookieParser(), refreshTokens);

router.get(
	"/sign-in/google",
	tryCatch(passport.authenticate("google", { scope: ["profile", "email"] })),
);
router.get(
	"/sign-in/google/callback",
	passport.authenticate("google", {
		session: false,
		failureRedirect: `${process.env.CLIENT_URL}/sign-in`,
	}),
	googleAuthCallback,
);

export default router;
