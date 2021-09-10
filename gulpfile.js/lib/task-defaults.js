const projectPath = require("./projectPath");
const pkg = require(projectPath("package.json"));

module.exports = {
	javascripts: {
		extensions: ["js", "jsx"],
		hot: {
			reload: true,
			noInfo: false,
			quiet: true,
			react: false,
		},
		devtool: "eval-cheap-module-source-map",
		babelLoader: {
			test: /\.js$/,
			loader: "babel-loader",
			exclude: /node_modules/,
		},
		babel: {
			presets: ["@babel/preset-env"],
			plugins: ["@babel/plugin-transform-runtime"],
		},
		development: {},
		production: {
			devtool: false,
			uglifyJsPlugin: {},
			definePlugin: {
				"process.env": {
					NODE_ENV: JSON.stringify("production"),
				},
			},
		},
	},

	stylesheets: {
		tailwindcss: false,
		sass: {
			includePaths: ["./node_modules"],
		},
		extensions: ["sass", "scss", "css", "pcss"],
		cssnano: {
			// deprecated. configure cssnano in stylesheets.postcss.plugins
		},
		postcss: {
			plugins: [
				// Autoprefixer and cssnano are added automatically,
				// with default settings, if not given custom configuration here
			],
			options: {},
		},
	},

	html: {
		dataFile: "data/global.json",
		excludeFolders: ["layouts", "shared", "macros", "data"],
		extensions: ["html", "njk", "json"],
		htmlmin: {
			collapseWhitespace: true,
		},
		nunjucksRender: {},
		templateLanguage: "nunjucks"
	},

	images: {
		extensions: ["jpg", "png", "svg", "gif"],
	},

	fonts: {
		extensions: ["woff2", "woff", "eot", "ttf", "svg"],
	},

	svgSprite: {
		svgstore: {},
	},

	production: {
		rev: true,
	},

	additionalTasks: {
		development: {
			prebuild: null,
			postbuild: null,
		},
		production: {
			prebuild: null,
			postbuild: null,
		},
	},
};
