import { useEffect, useRef } from "react";
import type { ModalProps } from "@/types";
import { Close } from "@/assets/icons";

function Modal({ children, setIsOpen }: ModalProps) {
	const dialogRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") {
				setIsOpen(false);
			}
		}
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [setIsOpen]);

	useEffect(() => {
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = originalOverflow;
		};
	}, []);

	// Move focus into the dialog on open, trap Tab inside it,
	// and restore focus to whatever triggered the modal on close.
	useEffect(() => {
		const previouslyFocused = document.activeElement as HTMLElement | null;
		closeButtonRef.current?.focus();

		function handleTabTrap(e: KeyboardEvent) {
			if (e.key !== "Tab" || !dialogRef.current) return;

			const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
				'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
			);
			if (focusable.length === 0) return;

			const first = focusable[0];
			const last = focusable[focusable.length - 1];

			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		}

		document.addEventListener("keydown", handleTabTrap);
		return () => {
			document.removeEventListener("keydown", handleTabTrap);
			previouslyFocused?.focus();
		};
	}, []);

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all"
			onClick={() => setIsOpen(false)}
		>
			<div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl transition-all"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					ref={closeButtonRef}
					type="button"
					aria-label="Close modal"
					onClick={() => setIsOpen(false)}
					className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
				>
					<Close />
				</button>
				{children}
			</div>
		</div>
	);
}

export default Modal;
