const fs = require("fs-extra");
const del = require("del");
const projectPath = require("../lib/projectPath");

function replaceFiles(cb) {
	let temp = projectPath(PATH_CONFIG.dest);
	let dest = projectPath(PATH_CONFIG.finalDest);
	let delPatterns = TASK_CONFIG.clean && TASK_CONFIG.clean.patterns ? TASK_CONFIG.clean.patterns : dest;

	del.sync(delPatterns, { force: true });
	fs.copySync(temp, dest);
	del.sync(temp, { force: true });

	cb();
};

module.exports = replaceFiles;
