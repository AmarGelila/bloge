import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { PublicUser } from "../types";

async function onlyUser(req: Request, res: Response, next: NextFunction) {
	passport.authenticate(
		"jwt",
		{ session: false },
		(err: Error, user: PublicUser | false) => {
			if (err)
				return res
					.status(500)
					.json({ message: "Authentication Error Occured" });
			if (!user)
				return res.status(401).json({
					code: "TOKEN_EXPIRED",
					message: "Access token has expired",
				});
			req.user = user;
			next();
		},
	)(req, res, next);
}

export default onlyUser;
