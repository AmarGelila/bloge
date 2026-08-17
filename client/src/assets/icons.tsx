export function Alert() {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 20 20"
			fill="none"
			className="mt-0.5 h-4 w-4 shrink-0"
		>
			<circle
				cx="10"
				cy="10"
				r="8.5"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<path
				d="M10 6v5"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<circle cx="10" cy="13.5" r="1" fill="currentColor" />
		</svg>
	);
}

export function Spinner() {
	return (
		<svg
			aria-hidden="true"
			className="h-4 w-4 animate-spin"
			viewBox="0 0 24 24"
			fill="none"
		>
			<circle
				className="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="4"
			/>
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z"
			/>
		</svg>
	);
}

export function Close() {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 20 20"
			fill="none"
			className="h-4 w-4"
		>
			<path
				d="M5 5l10 10M15 5L5 15"
				stroke="currentColor"
				strokeWidth="1.75"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export function Moon() {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.75"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="h-4.5 w-4.5"
		>
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
		</svg>
	);
}

export function Sun() {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.75"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="h-4.5 w-4.5"
		>
			<path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
		</svg>
	);
}

export function Bin() {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.75"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="h-3.5 w-3.5"
		>
			<path d="M4 7h16" />
			<path d="M10 11v6M14 11v6" />
			<path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" />
			<path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
		</svg>
	);
}

export function Edit() {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.75"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="h-3.5 w-3.5"
		>
			<path d="M12 20h9" />
			<path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
		</svg>
	);
}

export function BoldSpinner() {
	return (
		<svg
			aria-hidden="true"
			className="h-4 w-4 animate-spin"
			viewBox="0 0 24 24"
			fill="none"
		>
			<circle
				className="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="4"
			/>
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z"
			/>
		</svg>
	);
}
export function Like() {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.75"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="h-4 w-4"
		>
			<path d="M12 20.5s-7-4.35-9.5-8.5C.7 8.5 2.2 5 5.5 5c1.9 0 3.3 1 4.5 2.5C11.2 6 12.6 5 14.5 5 17.8 5 19.3 8.5 21.5 12c-2.5 4.15-9.5 8.5-9.5 8.5Z" />
		</svg>
	);
}

export function Unlike() {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			fill="currentColor"
			className="h-4 w-4"
		>
			<path d="M12 20.5s-7-4.35-9.5-8.5C.7 8.5 2.2 5 5.5 5c1.9 0 3.3 1 4.5 2.5C11.2 6 12.6 5 14.5 5 17.8 5 19.3 8.5 21.5 12c-2.5 4.15-9.5 8.5-9.5 8.5Z" />
		</svg>
	);
}
export function Google() {
	return (
		<svg aria-hidden="true" viewBox="0 0 48 48" className="h-4 w-4">
			<path
				fill="#4285F4"
				d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
			/>
			<path
				fill="#34A853"
				d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
			/>
			<path
				fill="#FBBC05"
				d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
			/>
			<path
				fill="#EA4335"
				d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
			/>
		</svg>
	);
}

export function Logo() {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.75"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="h-5 w-5"
		>
			<path d="M12 20h9" />
			<path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
		</svg>
	);
}
