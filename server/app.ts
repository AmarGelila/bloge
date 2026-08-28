import "./lib/passport.js";
import express, { Application } from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import onlyUser from "./middleware/onlyUser.js";
import mainRouter from "./routes/main.js";
import { Request, Response, NextFunction } from "express";
import path from "path";
const app: Application = express();

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	}),
);
app.use(express.json());

app.get("/openapi.yaml", (req, res) => {
	res.sendFile(path.resolve("docs/openapi.yaml"));
});
app.use("/docs", express.static("docs"));
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
