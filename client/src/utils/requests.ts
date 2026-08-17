import type { AxiosResponse } from "axios";
import { apiAuthClient, apiClient } from "../lib/axios";
import type {
	CommentFormData,
	PostFormData,
	SignInFormData,
	SignInFormResponse,
	SignUpFormData,
	SignUpFormResponse,
} from "../types";

export const postsRequest = (signal: AbortSignal) =>
	apiClient.get("/", { signal });

export const userRequest = (signal: AbortSignal) =>
	apiAuthClient.get("/user", { signal });

export const signInRequest = (signal: AbortSignal, formData: SignInFormData) =>
	apiClient.post<
		SignInFormResponse,
		AxiosResponse<SignInFormResponse>,
		SignInFormData
	>("/auth/sign-in", formData, { signal });

export const signUpRequest = (signal: AbortSignal, formData: SignUpFormData) =>
	apiClient.post<
		SignUpFormResponse,
		AxiosResponse<SignUpFormResponse>,
		SignUpFormData
	>("/auth/sign-up", formData, { signal });

export const signOutRequest = (signal: AbortSignal) =>
	apiAuthClient.get("/auth/sign-out", { signal });

export const getPostRequest = (signal: AbortSignal, postId: number) =>
	apiAuthClient.get(`/posts/${postId}`, { signal });

export const newPostRequest = (signal: AbortSignal, formData: PostFormData) =>
	apiAuthClient.post("/posts/new", formData, { signal });

export const editPostRequest = (
	signal: AbortSignal,
	postId: number,
	formData: PostFormData,
) => apiAuthClient.put(`/posts/${postId}`, formData, { signal });

export const deletePostRequest = (signal: AbortSignal, postId: number) =>
	apiAuthClient.delete(`/posts/${postId}`, { signal });

export const likePostRequest = (signal: AbortSignal , postId: number) => 
	apiAuthClient.put(`/posts/${postId}/like`, { signal });

export const unlikePostRequest = (signal: AbortSignal , postId: number) => 
	apiAuthClient.put(`/posts/${postId}/unlike`, { signal });

export const newCommentRequest = (
	signal: AbortSignal,
	postId: number,
	formData: CommentFormData,
) => apiAuthClient.post(`/posts/${postId}/comments/new`, formData, { signal });

export const deleteCommentRequest = (
	signal: AbortSignal,
	postId: number,
	commentId: number,
) => apiAuthClient.delete(`/posts/${postId}/comments/${commentId}`, { signal });

export const editCommentRequest = (
	signal: AbortSignal,
	postId: number,
	commentId: number,
	formData: CommentFormData,
) =>
	apiAuthClient.put(`/posts/${postId}/comments/${commentId}`, formData, {
		signal,
	});
