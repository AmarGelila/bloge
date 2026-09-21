import { Response } from "express";
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

async function updateComment(req: AuthenticatedRequest, res: Response) {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.mapped() });

	const { content }: Comment = matchedData(req);
	const userId = Number(req.user.id);
	const commentId = Number(req.params.commentId);
	if (!commentId)
		return res.status(400).json({ error: "Invalid Comment ID" });

	const updatedComments = await prisma.comment.updateManyAndReturn({
		where:
			req.user.email === process.env.AUTHOR_EMAIL
				? { id: commentId }
				: { id: commentId, userId },
		data: {
			content,
		},
	});

	if (updatedComments.length === 0) {
		return res
			.status(404)
			.json({ error: "Comment not found or unauthorized" });
	}

	return res.status(200).json(updatedComments[0]);
}

async function deleteComment(req: AuthenticatedRequest, res: Response) {
	const userId = Number(req.user.id);
	const commentId = Number(req.params.commentId);
	if (!commentId)
		return res.status(400).json({ error: "Invalid Comment ID" });

	const result = await prisma.comment.deleteMany({
		where:
			req.user.email === process.env.AUTHOR_EMAIL
				? { id: commentId }
				: { id: commentId, userId },
	});

	if (result.count === 0) {
		return res
			.status(404)
			.json({ error: "Comment not found or unauthorized" });
	}

	res.status(200).end();
}

export { createComment, updateComment, deleteComment };
