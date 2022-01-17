import { defineConfig } from "vite";
import config from "./config";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	return config(command, mode);
});
