import jwt from "jsonwebtoken";

function generateAccessToken(id: number, email: string) {
	return jwt.sign({ id, email }, process.env.JWT_SECRET as string, {
		expiresIn: "15m",
	});
}

function generateRefreshToken(id: number, email: string) {
	return jwt.sign({ id, email }, process.env.JWT_REFRESH_SECRET as string, {
		expiresIn: "3d",
	});
}

export { generateAccessToken, generateRefreshToken };
