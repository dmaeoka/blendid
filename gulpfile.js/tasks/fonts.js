// if (!TASK_CONFIG.fonts) return;
const browserSync = require("browser-sync");
const changed = require("gulp-changed");
const { src, dest } = require("gulp");
const projectPath = require("../lib/projectPath");

function fontsTask(cb) {
	const paths = {
		src: projectPath(
			PATH_CONFIG.src,
			PATH_CONFIG.fonts.src,
			"**/*.{" + TASK_CONFIG.fonts.extensions + "}"
		),
		dest: projectPath(PATH_CONFIG.dest, PATH_CONFIG.fonts.dest),
	};

	return src([paths.src, "*!README.md"])
		.pipe(changed(paths.dest)) // Ignore unchanged files
		.pipe(dest(paths.dest))
		.pipe(browserSync.stream());
};

module.exports = fontsTask;
