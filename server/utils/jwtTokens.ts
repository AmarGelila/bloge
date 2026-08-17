import jwt from "jsonwebtoken";

function generateAccessToken(id: number, email: string) {
	return jwt.sign({ id, email }, process.env.JWT_SECRET as string);
}

function generateRefreshToken(id: number, email: string) {
	return jwt.sign({ id, email }, process.env.JWT_REFRESH_SECRET as string);
}

export { generateAccessToken, generateRefreshToken };
