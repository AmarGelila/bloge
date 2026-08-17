import { create } from "zustand";
import type { ThemeState, Theme } from "@/types";

function applyTheme(theme: Theme) {
	document.documentElement.classList.toggle("dark", theme === "dark");
	localStorage.setItem("theme", theme);
}

function getInitialTheme(): Theme {
	if (typeof window === "undefined") return "light";
	const stored = localStorage.getItem("theme");
	if (stored === "light" || stored === "dark") return stored;
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

const useTheme = create<ThemeState>((set, get) => ({
	theme: getInitialTheme(),
	toggleTheme: () => {
		const next: Theme = get().theme === "dark" ? "light" : "dark";
		applyTheme(next);
		set({ theme: next });
	},
}));

export default useTheme;
