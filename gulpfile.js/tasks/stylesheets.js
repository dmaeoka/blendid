// if (!TASK_CONFIG.stylesheets) return;
const gulp = require("gulp");
const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync");
const cssnano = require("cssnano");

const PostcssPurgeCss = require('@fullhuman/postcss-purgecss');
const gulpif = require("gulp-if");
const postcss = require("gulp-postcss");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const tailwindcss = require("tailwindcss");
const addPostCssPlugin = require("../lib/addPostCssPlugin");
const handleErrors = require("../lib/handleErrors");
const projectPath = require("../lib/projectPath");

function sassTask(cb) {
	const paths = {
		src: projectPath(
			PATH_CONFIG.src,
			PATH_CONFIG.stylesheets.src,
			"**/*.{" + TASK_CONFIG.stylesheets.extensions + "}"
		),
		dest: projectPath(PATH_CONFIG.dest, PATH_CONFIG.stylesheets.dest),
	};

	if (
		TASK_CONFIG.stylesheets.sass &&
		TASK_CONFIG.stylesheets.sass.includePaths
	) {
		TASK_CONFIG.stylesheets.sass.includePaths = TASK_CONFIG.stylesheets.sass.includePaths.map( includePath => projectPath(includePath));
	}

	TASK_CONFIG.stylesheets.autoprefixer = TASK_CONFIG.stylesheets.autoprefixer || {};
	TASK_CONFIG.stylesheets.cssnano = TASK_CONFIG.stylesheets.cssnano || {};
	TASK_CONFIG.stylesheets.cssnano.autoprefixer = false; // this should always be false, since we're autoprefixing separately
	TASK_CONFIG.stylesheets.postcss.options = TASK_CONFIG.stylesheets.postcss.options || {};
	TASK_CONFIG.stylesheets.postcss.plugins = TASK_CONFIG.stylesheets.postcss.plugins || [];

	let preprocess = !!TASK_CONFIG.stylesheets.sass;

	// when watching files, only run once
	if (!TASK_CONFIG.stylesheets.configured) {
		// ensure Autoprefixer is in the PostCSS config
		addPostCssPlugin(
			"autoprefixer",
			autoprefixer(TASK_CONFIG.stylesheets.autoprefixer)
		);

		if (TASK_CONFIG.stylesheets.tailwindcss) {
			addPostCssPlugin(
				"tailwindcss",
				tailwindcss(TASK_CONFIG.stylesheets.tailwindcss)
			);
		}

		if (global.production) {
			// ensure cssnano is in the PostCSS config
			addPostCssPlugin(
				"cssnano",
				cssnano(TASK_CONFIG.stylesheets.cssnano)
			);
		}
	}

	TASK_CONFIG.stylesheets.configured = true;

	return gulp
		.src(paths.src)
		.pipe(gulpif(!global.production, sourcemaps.init()))
		.pipe(gulpif(preprocess, sass(TASK_CONFIG.stylesheets.sass)))
		.on("error", handleErrors)
		.pipe(
			postcss(
				TASK_CONFIG.stylesheets.postcss.plugins,
				TASK_CONFIG.stylesheets.postcss.options
			)
		)
		.on("error", handleErrors)
		.pipe(gulpif(!global.production, sourcemaps.write()))
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream());
};

const { alternateTask = () => sassTask } = TASK_CONFIG.stylesheets;
const stylesheetsTask = alternateTask(gulp, PATH_CONFIG, TASK_CONFIG);

module.exports = stylesheetsTask;
