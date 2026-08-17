/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { tokenStore } from "../store/token";

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: { "Content-Type": "application/json" },
	timeout: 10000,
});

const apiAuthClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: { "Content-Type": "application/json" },
	timeout: 10000,
});

apiAuthClient.interceptors.request.use((config) => {
	const token = tokenStore.getState().token;
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

let isRefreshing = false,
	failedQueue: any[];

function processQueue(err: any, token: string | null = null) {
	failedQueue?.forEach((promise) => {
		if (err) promise.reject(err);
		else promise.resolve(token);
	});
	failedQueue = [];
}
apiAuthClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						originalRequest.headers.Authorization = `Bearer ${token}`;
						return apiAuthClient(originalRequest);
					})
					.catch((err) => Promise.reject(err));
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const refreshResponse = await axios.get("/auth/refresh-token", {
					baseURL: import.meta.env.VITE_API_BASE_URL,
				});
				const newToken = refreshResponse.data.token;

				tokenStore.getState().setToken(newToken);
				processQueue(null, newToken);

				originalRequest.headers.Authorization = `Bearer ${newToken}`;
				return apiAuthClient(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError, null);
				window.location.href = "/sign-in";
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	},
);

export { apiClient, apiAuthClient };
