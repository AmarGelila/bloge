import { Request, Response, NextFunction } from "express";

function tryCatch(fn: any) {
	return function (req: Request, res: Response, next: NextFunction) {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
}

export default tryCatch;
