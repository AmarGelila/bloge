import { Request } from "express";

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
