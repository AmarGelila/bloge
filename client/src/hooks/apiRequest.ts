/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react";
import type { UseFormSetError } from "react-hook-form";
import handleAPIErrors from "../utils/handleAPIErrors";

function useAPIRequest<T, Args extends unknown[]>(
	request: (signal: AbortSignal, ...args: Args) => Promise<{ data: T }>,
	setError?: UseFormSetError<any>,
	saveData?: any,
) {
	const [data, setData] = useState<T | undefined>(undefined);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const controllerRef = useRef<AbortController | null>(null);
	const isMountedRef = useRef(false);

	const execute = useCallback(
		async (...args: Args) => {
			if (controllerRef.current) controllerRef.current.abort();

			const controller = new AbortController();
			controllerRef.current = controller;

			try {
				setLoading(true);
				const response = await request(controller.signal, ...args);
				if (
					isMountedRef.current &&
					controllerRef.current === controller
				) {
					setData(response.data);
					if (saveData) saveData(response.data);
					return response.data;
				}
			} catch (error) {
				console.log(error);
				handleAPIErrors(error, setErrorMessage, setError);
				throw error;
			} finally {
				if (
					isMountedRef.current &&
					controllerRef.current === controller
				)
					setLoading(false);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[request],
	);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			if (isMountedRef.current && controllerRef.current) {
				isMountedRef.current = false;
				controllerRef.current.abort();
			}
		};
	}, []);
	return { data, loading, execute, errorMessage };
}

export default useAPIRequest;
