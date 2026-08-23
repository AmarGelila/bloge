import { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import { AuthenticatedRequest } from "../types/index.js";

async function getPosts(_: Request, res: Response) {
	const posts = await prisma.post.findMany({
		include: { comments: true, _count: { select: { likes: true } } },
	});
	res.status(200).json(posts);
}

async function getUser(req: AuthenticatedRequest, res: Response) {
	const userId = req.user.id;
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			id: true,
			name: true,
			email: true,
			pictureUrl: true,
			likedPosts: {
				select: {
					id: true,
				},
			},
		},
	});
	if (!user) return res.status(404).json({ error: "User Does Not Exists" });
	res.status(200).json({
		...user,
		isAuthor: user?.email === process.env.AUTHOR_EMAIL ? true : false,
	});
}
export { getPosts, getUser };
