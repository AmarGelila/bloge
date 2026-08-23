import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import { Post } from "@prisma/client";
import prisma from "../lib/prisma.js";
import { AuthenticatedRequest } from "../types/index.js";

async function getPost(req: Request, res: Response) {
	const { postId } = req.params;
	const post = await prisma.post.findUnique({
		where: { id: Number(postId) },
		include: { comments: true, _count: { select: { likes: true } } },
	});
	if (!post)
		res.status(404).json({ error: "The requested post does not exist" });
	res.status(200).json(post);
}

async function createPost(req: Request, res: Response) {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.mapped() });

	const { title, content }: Post = matchedData(req);
	const post = await prisma.post.create({
		data: { title, content },
		include: { comments: true, _count: { select: { likes: true } } },
	});
	return res.status(201).json(post);
}

async function updatePost(req: Request, res: Response) {
	const errors = validationResult(req);

	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.mapped() });

	const { title, content }: Post = matchedData(req);
	const postId = Number(req.params.postId);
	const post = await prisma.post.update({
		where: { id: postId },
		data: { title, content },
		include: { comments: true, _count: { select: { likes: true } } },
	});

	if (!postId)
		return res.status(404).json({
			error: "Post ID is not defined",
		});

	res.status(201).json(post);
}

async function deletePost(req: Request, res: Response) {
	const postId = Number(req.params.postId);
	if (!postId)
		return res.status(404).json({
			error: "Post ID is not defined",
		});

	await prisma.post.delete({
		where: { id: postId },
	});

	res.status(200).end();
}

async function likePost(req: AuthenticatedRequest, res: Response) {
	const postId = Number(req.params.postId);
	const userId = Number(req.user.id);
	if (!postId || !userId)
		return res.status(404).json({
			error: "User Or Post is not defined",
		});

	await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			likedPosts: {
				connect: { id: postId },
			},
		},
	});

	res.status(204).end();
}

async function unLikePost(req: AuthenticatedRequest, res: Response) {
	const postId = Number(req.params.postId);
	const userId = Number(req.user.id);
	if (!postId || !userId)
		return res.status(404).json({
			error: "User Or Post is not defined",
		});

	await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			likedPosts: {
				disconnect: { id: postId },
			},
		},
	});

	res.status(200).end();
}

export { getPost, createPost, updatePost, deletePost, likePost, unLikePost };
