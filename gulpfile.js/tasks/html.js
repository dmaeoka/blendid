// if (!TASK_CONFIG.html) return;
const browserSync = require("browser-sync");
const fs = require("fs-extra");
const gulp = require("gulp");
const data = require("gulp-data");
const gulpif = require("gulp-if");
const htmlmin = require("gulp-htmlmin");
const nunjucksRender = require("gulp-nunjucks-render");
const yaml = require("js-yaml");
const debug = require("gulp-debug");
const handleErrors = require("../lib/handleErrors");
const projectPath = require("../lib/projectPath");

function htmlTask(cb) {
	const exclude =
		"!" +
		projectPath(
			PATH_CONFIG.src,
			PATH_CONFIG.html.src,
			"**/{" + TASK_CONFIG.html.excludeFolders.join(",") + "}/**"
		);

	const paths = {
		src: [
			projectPath(
				PATH_CONFIG.src,
				PATH_CONFIG.html.src,
				"**/*.{" + TASK_CONFIG.html.extensions + "}"
			),
			exclude,
		],
		dest: projectPath(PATH_CONFIG.dest, PATH_CONFIG.html.dest),
	};

	const dataFunction =
		TASK_CONFIG.html.dataFunction ||
		function (file) {
			const dataPath = projectPath(
				PATH_CONFIG.src,
				PATH_CONFIG.html.src,
				TASK_CONFIG.html.dataFile
			);
			const dataExtension = dataPath.split(".").pop();
			if (dataExtension === "yaml" || dataExtension === "yml") {
				return yaml.safeLoad(fs.readFileSync(dataPath, "utf8"));
			}
			return JSON.parse(fs.readFileSync(dataPath, "utf8"));
		};

	const templateBasePath = [
		projectPath(PATH_CONFIG.src, PATH_CONFIG.html.src),
	];

	let templateParser;

	TASK_CONFIG.html.nunjucksRender.path = TASK_CONFIG.html.nunjucksRender.path || templateBasePath;
	templateParser = nunjucksRender(TASK_CONFIG.html.nunjucksRender);

	return gulp.src(paths.src)
		.pipe(data(dataFunction))
		.on("error", handleErrors)
		.pipe(templateParser)
		.on("error", handleErrors)
		.pipe(gulpif(global.production, htmlmin(TASK_CONFIG.html.htmlmin)))
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream());
};

const { alternateTask = () => htmlTask } = TASK_CONFIG.html;
const task = alternateTask(gulp, PATH_CONFIG, TASK_CONFIG);
module.exports = task;
