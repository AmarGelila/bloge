import { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import { AuthenticatedRequest } from "../types/index.js";

const PAGE_SIZE = 5;

async function getLatestPosts(_: Request, res: Response) {
	const posts = await prisma.post.findMany({
		select: {
			id: true,
			title: true,
			time: true,
			_count: { select: { likes: true, comments: true } },
		},
		orderBy: { time: "desc" },
		take: PAGE_SIZE,
	});
	res.status(200).json(posts);
}

async function getPostsPage(req: AuthenticatedRequest, res: Response) {
	const cursorId = parseInt(req.query.cursor as string, 10);
	const hasCursor = Number.isInteger(cursorId);

	const rows = await prisma.post.findMany({
		select: {
			id: true,
			title: true,
			time: true,
			_count: { select: { likes: true, comments: true } },
		},
		orderBy: [{ time: "desc" }, { id: "desc" }],
		take: PAGE_SIZE + 1, // fetch one extra to know if there's a next page
		...(hasCursor && { cursor: { id: cursorId }, skip: 1 }), // skip the cursor row itself
	});

	const hasNextPage = rows.length > PAGE_SIZE;
	const posts = hasNextPage ? rows.slice(0, PAGE_SIZE) : rows;
	const nextCursor = hasNextPage ? posts[posts.length - 1].id : null;

	res.json({ posts, nextCursor });
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
export { getLatestPosts, getPostsPage, getUser };

/*
	Cursor Pagination
	prisma returns data & cursor
	client store cursor
	client attach cursor in the next request

*/
