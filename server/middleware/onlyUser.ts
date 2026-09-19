import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { PublicUser } from "../types/index.js";

async function onlyUser(req: Request, res: Response, next: NextFunction) {
	passport.authenticate(
		"jwt",
		{ session: false },
		(err: Error, user: PublicUser | false, info: any) => {
			if (err)
				return res
					.status(500)
					.json({ message: "Authentication Error Occured" });
			if (info && info.name === "TokenExpiredError") {
				return res.status(401).json({
					message: "Token has expired",
				});
			}
			if (!user)
				return res.status(401).json({
					message: "Unauthorized",
				});
			req.user = user;
			next();
		},
	)(req, res, next);
}

export default onlyUser;
