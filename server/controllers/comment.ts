import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import { Comment } from "@prisma/client";
import prisma from "../lib/prisma.js";
import { AuthenticatedRequest } from "../types/index.js";

async function createComment(req: AuthenticatedRequest, res: Response) {
	const errors = validationResult(req);

	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.mapped() });

	const { content }: Comment = matchedData(req);
	const postId = Number(req.params.postId);
	const userId = Number(req.user.id);
	if (!postId || !userId)
		return res.status(400).json({ error: "Invalid Post ID Or User ID" });
	const comment = await prisma.comment.create({
		data: { content, userId, postId },
	});

	return res.status(201).json(comment);
}

async function updateComment(req: Request, res: Response) {
	const errors = validationResult(req);

	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.mapped() });

	const { content }: Comment = matchedData(req);
	const commentId = Number(req.params.commentId);
	if (!commentId)
		return res.status(400).json({ error: "Invalid Comment ID" });
	const comment = await prisma.comment.update({
		where: { id: commentId },
		data: { content },
	});

	return res.status(201).json(comment);
}

async function deleteComment(req: Request, res: Response) {
	const commentId = Number(req.params.commentId);
	await prisma.comment.delete({ where: { id: commentId } });
	if (!commentId)
		return res.status(400).json({ error: "Invalid Comment ID" });
	res.status(200).end();
}

export { createComment, updateComment, deleteComment };
