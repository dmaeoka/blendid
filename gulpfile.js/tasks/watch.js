const { parallel, watch } = require("gulp");
const path = require("path");
const requireDir = require("require-dir");
const projectPath = require("../lib/projectPath");
const modules = requireDir("../tasks");
const browserSync = modules["browserSync"];

function watchTask(cb) {
	let watchableTasks = [
		"fonts",
		"images",
		"svgSprite",
		"html",
		"stylesheets",
		"static",
	];

	function getTaskPathFor(taskName) {
		switch (taskName) {
			case "svgSprite":
				return PATH_CONFIG.icons;
			case "html":
				return PATH_CONFIG.html;
			case "static":
				return PATH_CONFIG.static;
			default:
				return PATH_CONFIG[taskName];
		}
	}

	watchableTasks.forEach( taskName => {
		let taskConfig = TASK_CONFIG[taskName];
		let taskPath = getTaskPathFor(taskName);
		let watchConfig = {};

		if (
			TASK_CONFIG.watch !== undefined &&
			TASK_CONFIG.watch.gulpWatch !== undefined
		) {
			watchConfig = TASK_CONFIG.watch.gulpWatch;
		}

		if (taskConfig) {
			let srcPath = projectPath(PATH_CONFIG.src, taskPath.src);
			let globPattern = "**/*" + (taskConfig.extensions ? ".{" + taskConfig.extensions.join(",") + "}" : "");

			watch(
				path.join(srcPath, globPattern),
				watchConfig,
				modules[taskName]
			);
		}
	});

	cb();
};

module.exports = parallel(browserSync, watchTask);

