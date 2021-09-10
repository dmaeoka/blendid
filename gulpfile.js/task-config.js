const path = require("path");
const colors = require("tailwindcss/colors");
const projectPath = require("./lib/projectPath");

module.exports = {
	html: true,
	images: true,
	fonts: true,
	static: true,
	svgSprite: true,
	stylesheets: {
		autoprefixer: {
			overrideBrowserslist: [
				"> 1%",
				"last 3 versions",
				"Firefox >= 20",
				"iOS >=7",
			],
			cascade: true,
		},
		postcss: {
			plugins: []
		},
		tailwindcss: {
			darkMode: false,
			theme: {
				extend: {
					colors: {
						sky: colors.sky,
						cyan: colors.cyan,
					},
				},
				container: {
					center: true,
					padding: "1rem",
				},
			},
			variants: {},
			plugins: [],
			purge: {
				enabled: true,
				content: [
					projectPath(
						PATH_CONFIG.src,
						PATH_CONFIG.html.src,
						"**/*.{html,njk,json}"
					)
				],
			},
		}
	},

	javascripts: {
		entry: {
			// files paths are relative to
			// javascripts.dest in path-config.json
			app: ["./app.js"],
		},
	},

	browserSync: {
		server: {
			// should match `dest` in
			// path-config.json
			baseDir: "public",
		},
	},

	production: {
		rev: false
	},
};
