/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAxiosError, isCancel } from "axios";
import type { FormErrorObject } from "../types";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

function handleAPIErrors<T extends FieldValues>(
	error: any,
	setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>,
	setError?: UseFormSetError<T>,
) {
	if (!isAxiosError(error)) {
		setErrorMessage("Unexpected Error Occured, Try Again Later...");
		return;
	}
	if (isCancel(error)) {
		console.log("Request Canelled");
		return;
	}
	if (!error.response) {
		setErrorMessage("Network error, check your connection.");
		return;
	}
	const errorMessage = error.response?.data.error;
	const formErrors = error.response?.data.errors;
	if (formErrors && setError) {
		Object.entries(formErrors).forEach(([key, errorObject]) => {
			const formError = errorObject as FormErrorObject;
			setError(key as Path<T>, {
				type: "server",
				message: formError.msg,
			});
		});
	}
	if (errorMessage) setErrorMessage(errorMessage);
}

export default handleAPIErrors;
