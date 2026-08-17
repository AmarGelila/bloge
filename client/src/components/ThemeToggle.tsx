import { Moon, Sun } from "@/assets/icons";
import { useTheme } from "@/store";

function ToggleTheme() {
	const theme = useTheme((state) => state.theme);
	const toggleTheme = useTheme((state) => state.toggleTheme);
	const isDark = theme === "dark";

	return (
		<button
			type="button"
			onClick={toggleTheme}
			aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
			aria-pressed={isDark}
			className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
		>
			{isDark ? <Moon /> : <Sun />}
		</button>
	);
}

export default ToggleTheme;
