import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types";

async function onlyAuthor(req: Request, res: Response, next: NextFunction) {
	const user = (req as AuthenticatedRequest).user;
	if (user.email !== (process.env.AUTHOR_EMAIL as string)) {
		return res
			.status(301)
			.json({ message: "Only author is allowed to do this" });
	}

	next();
}

export default onlyAuthor;
