// import legacy from "../lib/plugin-legacy";
import legacy from "@vitejs/plugin-legacy"
import ViteRestart from 'vite-plugin-restart'
import progress from "rollup-plugin-progress"
import viteImagemin from "vite-plugin-imagemin"
import envCompatible from "vite-plugin-env-compatible"
import { injectHtml } from "vite-plugin-html"
import { viteCommonjs } from "@originjs/vite-plugin-commonjs"
import mpa from "vite-plugin-mpa"
// import projectPath from "../lib/projectPath";
// import nunjucks from "vite-plugin-nunjucks"
// import nunjucks_variables from "./src/html/data/global.json";

export default (mode, path_config) => {
	const vitePlugins = [];

	vitePlugins.push(
		progress({
			clearLine: false,
		}),
		// nunjucks({
		// 	variables: {
		// 		'index.html': nunjucks_variables
		// 	}
		// }),
		mpa({
			open: false,
			defaultEntries: "index.html,about.html",
		}),
		viteCommonjs(),
		envCompatible(),
		injectHtml(),
	);

	if (mode == "production") {
		vitePlugins.push(
			legacy({
				targets: [
					"defaults",
					"not IE 11"
				]
			}),
			viteImagemin({
				gifsicle: {
					optimizationLevel: 7,
					interlaced: false,
				},
				optipng: {
					optimizationLevel: 7,
				},
				mozjpeg: {
					quality: 20,
				},
				pngquant: {
					quality: [0.8, 0.9],
					speed: 4,
				},
				svgo: {
					plugins: [
						{
							name: "removeViewBox",
						},
						{
							name: "removeEmptyAttrs",
							active: false,
						},
					],
				},
			})
		)
	} else {
		vitePlugins.push(
			ViteRestart({
				reload: [
					'./shopify/**/*',
				],
			}),
		)
	}

	return vitePlugins;
}
