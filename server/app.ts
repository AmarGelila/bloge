import "./lib/passport";
import express, { Application } from "express";
import cors from "cors";
import authRouter from "./routes/auth";
import postRouter from "./routes/post";
import onlyUser from "./middleware/onlyUser";
import mainRouter from "./routes/main";
import { Request, Response, NextFunction } from "express";
const app: Application = express();
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
);

app.use(express.json());
app.use("/", mainRouter);
app.use("/auth", authRouter);
app.use("/posts", onlyUser, postRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
	console.error(error);
	if (error?.code === "P2025")
		return res
			.status(404)
			.json({ error: "Record Does Not Exists In The Database" });

	res.status(500).json({ error: error.message || "Internal Server Error" });
});

if (process.env.NODE_ENV === "dev") {
	const PORT = Number(process.env.PORT) || 3000;
	app.listen(PORT, () => {
		console.log(`🚀 Server running on http://localhost:${PORT}`);
	});
}
export default app;
