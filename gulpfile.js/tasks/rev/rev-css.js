const { src, dest } = require("gulp");
const rev = require("gulp-rev");
const revdel = require("gulp-rev-delete-original");
const projectPath = require("../../lib/projectPath");

function revCss(cb) {
	// 3) Rev and compress CSS and JS files (this is done after assets, so that if a
	//    referenced asset hash changes, the parent hash will change as well
	return src(projectPath(PATH_CONFIG.dest, "**/*.css"))
		.pipe(rev())
		.pipe(dest(PATH_CONFIG.dest))
		.pipe(revdel())
		.pipe(
			rev.manifest(projectPath(PATH_CONFIG.dest, "rev-manifest.json"), {
				merge: true,
			})
		)
		.pipe(dest(file => file.base));
}

module.exports = revCss;
