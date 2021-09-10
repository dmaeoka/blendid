const { readFileSync } = require('fs');
const { src, dest } = require("gulp");
const revRewrite = require("gulp-rev-rewrite");
const projectPath = require("../../lib/projectPath");

function updateReferences(cb) {
	// 2) Update asset references with reved filenames in compiled css + js
	const manifest = readFileSync(projectPath(PATH_CONFIG.dest, "rev-manifest.json"));
	return src(projectPath(PATH_CONFIG.dest, "**/**.{css,js}"))
		.pipe(revRewrite({
			manifest
		}))
		.pipe(dest(file => file.base));
}

module.exports = updateReferences;
