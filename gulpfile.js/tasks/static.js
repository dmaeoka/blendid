const { src, dest } = require("gulp");
const changed = require("gulp-changed");
const path = require("path");
const projectPath = require("../lib/projectPath");

function staticTask() {
	const srcPath = projectPath(PATH_CONFIG.src, PATH_CONFIG.static.src);
	const defaultSrcOptions = {
		dot: true,
		allowEmpty: true
	};
	const options = Object.assign(
		defaultSrcOptions,
		TASK_CONFIG.static.srcOptions || {}
	);

	const paths = {
		src: [
			path.join(srcPath, "**/*"),
			projectPath(
				"!" + PATH_CONFIG.src,
				PATH_CONFIG.static.src,
				"README.md"
			),
		],
		dest: projectPath(PATH_CONFIG.dest, PATH_CONFIG.static.dest),
	};

	return src(paths.src, options).pipe(dest(paths.dest));
};

module.exports = staticTask;
