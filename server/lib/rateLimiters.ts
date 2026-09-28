import rateLimit, { Options, RateLimitInfo } from "express-rate-limit";
import type { Request, Response, NextFunction } from "express";

export interface LimitedRequest extends Request {
	rateLimit?: RateLimitInfo;
}

export const globalLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 500,
	handler: (
		req: LimitedRequest,
		res: Response,
		_next: NextFunction,
		options: Options,
	) => {
		const resetTime = req.rateLimit?.resetTime?.getTime();
		const minutesLeft = resetTime
			? Math.ceil((resetTime - Date.now()) / 1000 / 60)
			: 15;

		res.status(options.statusCode).json({
			error: `Too many requests. Try again after ${minutesLeft} minutes`,
		});
	},
});

export const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 mins
	max: 5,
	handler: (
		req: LimitedRequest,
		res: Response,
		_next: NextFunction,
		options: Options,
	) => {
		const resetTime = req.rateLimit?.resetTime?.getTime();
		const minutesLeft = resetTime
			? Math.ceil((resetTime - Date.now()) / 1000 / 60)
			: 15;

		res.status(options.statusCode).json({
			error: `Too many requests. Try again after ${minutesLeft} minutes`,
		});
	},
});
