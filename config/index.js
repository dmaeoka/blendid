import pkg from "../package.json";
import plugins from "./plugins";
import dayjs from "dayjs";
import projectPath from "./lib/projectPath";
import path_config from "./lib/get-path-config"

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
	pkg: {
		dependencies,
		devDependencies,
		name,
		version
	},
	lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
};

export default (command, mode) => {
	const { src, dest, base, publicDir, javascripts, stylesheets, images } = path_config;
	const root = projectPath(src);

	return {
		root,
		publicDir,
		base,
		plugins: plugins(mode, path_config),
		resolve: {
			alias: [
				{
					find: /^~/,
					replacement: "",
				},
				{
					find: "@",
					replacement: projectPath("src"),
				},
			],
			extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
		},
		logLevel: "info",
		optimizeDeps: {
			exclude: ["path"],
		},
		build: {
			manifest: true,
			sourcemap: true,
			outDir: projectPath(dest),
			assetsDir: images,
			emptyOutDir: true,
			minify: "terser",
			rollupOptions: {
				input: {
					main: projectPath('./src/html/index.html'),
					about: projectPath('./src/html/about.html')
				},
				output: {
					entryFileNames: `${javascripts}/[name].js`,
					chunkFileNames: `${javascripts}/[name].js`,
					assetFileNames: `${stylesheets}/[name].[ext]`,
				},
			},
		},
		define: {
			// Suppress warning
			__INTLIFY_PROD_DEVTOOLS__: false,
			__APP_INFO__: JSON.stringify(__APP_INFO__),
		}
	}
}
