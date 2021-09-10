// if (!TASK_CONFIG.images) return;
const browserSync = require("browser-sync");
const changed = require("gulp-changed");
const { src, dest } = require("gulp");
const projectPath = require("../lib/projectPath");

function imagesTask(cb) {
	let paths = {
		src: projectPath(
			PATH_CONFIG.src,
			PATH_CONFIG.images.src,
			"**/*.{" + TASK_CONFIG.images.extensions + "}"
		),
		dest: projectPath(PATH_CONFIG.dest, PATH_CONFIG.images.dest),
	};

	return src([paths.src, "*!README.md"])
		.pipe(changed(paths.dest)) // Ignore unchanged files
		.pipe(dest(paths.dest))
		.pipe(browserSync.stream());
}

module.exports = imagesTask;
