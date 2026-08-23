import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import prisma from "../lib/prisma.js";
import type {
	AuthenticatedRequest,
	PublicUser,
	SignInData,
} from "../types/index.js";
import {
	generateAccessToken,
	generateRefreshToken,
} from "../utils/jwtTokens.js";
import jwt, { JwtPayload } from "jsonwebtoken";

async function postSignUp(req: Request, res: Response) {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.mapped() });

	const { name, email, password } = matchedData(req);
	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: { name, email, password: hashedPassword },
		select: { name: true, email: true },
	});

	return res.status(201).json({ user });
}

async function postSignIn(req: Request, res: Response) {
	const errors = validationResult(req);

	if (!errors.isEmpty())
		return res
			.status(400)
			.json({ errors: { root: { msg: "Invalid Credntials" } } });

	const { email, password }: SignInData = matchedData(req);
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user)
		return res
			.status(400)
			.json({ errors: { root: { msg: "Invalid Credntials" } } });

	if (!user.password)
		return res
			.status(400)
			.json({ errors: { root: { msg: "Sign in with google " } } });
	const isMatched = await bcrypt.compare(password, user.password as string);
	if (!isMatched)
		return res
			.status(400)
			.json({ errors: { root: { msg: "Invalid Credntials" } } });

	const accessToken = generateAccessToken(user.id, user.email);
	const refreshToken = generateRefreshToken(user.id, user.email);
	await prisma.user.update({
		where: { id: user.id },
		data: { refreshToken },
	});

	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		sameSite: "none",
		secure: process.env.NODE_ENV === "production",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});
	res.status(200).json({ token: accessToken });
}

async function signOut(req: Request, res: Response) {
	const userId = (req as AuthenticatedRequest).user.id;

	await prisma.user.update({
		where: { id: userId },
		data: { refreshToken: null },
	});

	res.clearCookie("refreshToken", {
		httpOnly: true,
		sameSite: "none",
		secure: process.env.NODE_ENV === "production",
	});

	res.status(204).json();
}

async function refreshTokens(req: Request, res: Response) {
	const oldRefreshToken = req.cookies.refreshToken;
	if (!oldRefreshToken) {
		return res.status(401).json({
			code: "TOKEN_EXPIRED",
		});
	}

	const { id: userId, email } = jwt.verify(
		oldRefreshToken,
		process.env.JWT_REFRESH_SECRET as string,
	) as JwtPayload;

	if (!userId || !email) {
		return res.status(401).json({
			code: "TOKEN_EXPIRED",
		});
	}

	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { refreshToken: true },
	});

	if (!user || user.refreshToken !== oldRefreshToken)
		return res.status(401).json({
			code: "TOKEN_EXPIRED",
		});

	const accessToken = generateAccessToken(userId, email);
	const refreshToken = generateRefreshToken(userId, email);

	await prisma.user.update({ where: { id: userId }, data: { refreshToken } });

	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		sameSite: "none",
		secure: process.env.NODE_ENV === "production",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	res.status(200).json({ token: accessToken });
}

async function googleAuthCallback(req: Request, res: Response) {
	const user = req.user as PublicUser;

	if (!user) {
		return res.status(500).json({ error: "Authentication Failed" });
	}

	const accessToken = generateAccessToken(user.id, user.email);
	const refreshToken = generateRefreshToken(user.id, user.email);

	await prisma.user.update({
		where: { id: user.id },
		data: { refreshToken },
	});

	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		sameSite: "none",
		secure: process.env.NODE_ENV === "production",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	res.redirect(`${process.env.CLIENT_URL}/auth-success#token=${accessToken}`);
}
export { postSignUp, postSignIn, signOut, refreshTokens, googleAuthCallback };
