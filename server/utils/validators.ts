import { body } from "express-validator";
import sanitizeHtml from "sanitize-html";
import prisma from "../lib/prisma.js";

function sanitizeRichText(value: string) {
	return sanitizeHtml(value, {
		allowedTags: sanitizeHtml.defaults.allowedTags.concat([
			"img",
			"u",
			"s",
		]),
		allowedAttributes: {
			...sanitizeHtml.defaults.allowedAttributes,
			"*": ["style", "class"],
			img: ["src", "alt", "width", "height"],
		},
	});
}

const signUpValidator = [
	body("name")
		.trim()
		.notEmpty()
		.isLength({ max: 20, min: 4 })
		.withMessage("Name must be between 4 and 20 characters"),
	body("email")
		.trim()
		.notEmpty()
		.withMessage("An Email Address is required.")
		.isEmail()
		.withMessage("Please enter a valid email address.")
		.custom(async (email) => {
			const user = await prisma.user.findUnique({ where: { email } });
			if (user)
				throw new Error("This email already exists , Try to sign in");
			return true;
		}),
	body("password")
		.isStrongPassword({
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minSymbols: 1,
			minNumbers: 1,
		})
		.withMessage(
			"Password must be more than 8 charcters and includes caps, numbers, and symbols",
		),
	body("confirmPassword")
		.custom((value, { req }) => value === req.body.password)
		.withMessage("The password doesnot match"),
];

const signInValidator = [
	body("email")
		.trim()
		.notEmpty()
		.withMessage("All fields are required")
		.isEmail()
		.withMessage("Invalid Credntials"),
	body("password")
		.notEmpty()
		.withMessage("All fields are required")
		.isStrongPassword({
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minSymbols: 1,
			minNumbers: 1,
		})
		.withMessage("Invalid Credntials"),
];

const postValidator = [
	body("title")
		.trim()
		.notEmpty()
		.withMessage("Post title is required")
		.escape(),
	body("content")
		.trim()
		.notEmpty()
		.withMessage("Post content is required")
		.customSanitizer(sanitizeRichText),
];

const commentValidator = [
	body("content")
		.trim()
		.notEmpty()
		.withMessage("Comment can not be empty")
		.isLength({ min: 1, max: 255 })
		.withMessage("Comment length must be less than 256")
		.escape(),
];

export { signUpValidator, signInValidator, postValidator, commentValidator };
