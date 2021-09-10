const { src } = require("gulp");
const sizereport = require("gulp-sizereport");
const projectPath = require("../lib/projectPath");

function sizeReport(cb) {
	return src([
		projectPath(PATH_CONFIG.dest, "**/*"),
		"*!rev-manifest.json",
	]).pipe(
		sizereport({
			gzip: true,
		})
	);
};

module.exports = sizeReport;
