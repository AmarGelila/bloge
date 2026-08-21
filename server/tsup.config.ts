import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["app.ts"],
	format: ["esm"],
	target: "node20",
	clean: true,
	sourcemap: true,
	splitting: false,
});
