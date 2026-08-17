/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Path, UseFormRegister } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import type { InputHTMLAttributes, ReactNode } from "react";

export type Theme = "light" | "dark";

export type ThemeState = {
	theme: Theme;
	toggleTheme: () => void;
};

export type User = {
	id: number;
	name: string;
	email: string;
	pictureUrl: string;
	isAuthor: boolean;
	likedPosts: { id: number }[];
};

export type Post = {
	id: number;
	title: string;
	content: string;
	time: Date;
	comments: Comment[];
	_count: {
		likes: number;
	};
};

export type Comment = {
	id: number;
	content: string;
	time: Date;
	userId: number;
	postId: number;
};

// Zustand Stores
export type TokenStore = {
	token: string | null;
	setToken: (token: string | null) => void;
};

export type UserStore = {
	user: User | null;
	setUser: (user: User | null) => void;
	updateLikes: (postId: number) => unknown;
};

export type PostsStore = {
	posts: Post[] | null;
	getPostById: (id: number) => Post | undefined;
	setPosts: (posts: Post[] | null) => void;
	pushPost: (post: Post) => void;
	updatePost: (post: Post) => void;
	deletePost: (postId: number) => void;
	pushComment: (comment: Comment, postId: number) => unknown;
	deleteComment: (postId: number, commentId: number) => unknown;
	getCommentContent: (
		postId: number,
		commentId: number,
	) => string | undefined;
	updateComment: (
		postId: number,
		commentId: number,
		comment: Comment,
	) => unknown;
	likePost: (postId: number) => unknown;
	unlikePost: (postId: number) => unknown;
};

// Forms
export type SignUpFormData = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export type SignUpFormResponse = {
	success: boolean;
};

export type SignInFormData = {
	email: string;
	password: string;
};

export type SignInFormResponse = {
	success: boolean;
	token: string;
};

export type PostFormData = {
	title: string;
	content: string;
};

export type PostFormProps = {
	defaultValues?: PostFormData;
	requestAction: (
		signal: AbortSignal,
		...args: any[]
	) => Promise<{ data: Post }>;
	postId?: number;
	onSuccess: (post: Post) => void;
	submitLabel: string;
	submittingLabel: string;
};

export type CommentFormData = {
	content: string;
};

export type CommentFormProps = {
	defaultValues?: CommentFormData;
	requestAction: (
		signal: AbortSignal,
		...args: any[]
	) => Promise<{ data: Comment }>;
	requestArgs?: any[];
	onSuccess: (comment: Comment) => void;
	submitLabel: string;
	submittingLabel: string;
};
export type FormFieldData<T extends FieldValues> = {
	id: string;
	label: string;
	type?: string;
	placeholder: string;
	name: Path<T>;
	errorMessage?: string;
	register: UseFormRegister<T>;
} & InputHTMLAttributes<HTMLInputElement>;

export type FormValidationErrors = {
	errors: {
		[key: string]: {
			location: string;
			msg: string;
			path: string;
			type: string;
			value: string;
		};
	};
};

export type FormErrorObject = {
	location: string;
	msg: string;
	path: string;
	type: string;
	value: string;
};

export type PostCompProps = {
	post: Post;
	isUser: boolean;
	isAuthor: boolean;
};

export type CommentCompProps = {
	comment: Comment;
	isAuthor: boolean;
	setIsEditing: React.Dispatch<React.SetStateAction<IsEditing>>;
};

export type IsEditing = "post" | number | false;

export type EditPostProps = {
	postId: number;
	title: string;
	content: string;
	setIsEditing: React.Dispatch<React.SetStateAction<IsEditing>>;
};

export type EditCommentProps = {
	postId: number;
	commentId: number;
	setIsEditing: React.Dispatch<React.SetStateAction<IsEditing>>;
};

export type ModalProps = {
	children: ReactNode;
	setIsOpen: React.Dispatch<React.SetStateAction<IsEditing>>;
};
