import { Request } from "express";
import { RateLimitInfo } from "express-rate-limit";

export interface SignInData {
	email: string;
	password: string;
}

export interface PublicUser {
	email: string;
	id: number;
}

export interface GoogleProfile {
	name: string;
	email: string;
}

export interface AuthenticatedRequest extends Request {
	user: PublicUser;
}

export interface LimitedRequest extends Request {
	rateLimit?: RateLimitInfo;
}
