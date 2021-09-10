const del = require("del");
const projectPath = require("../lib/projectPath");

function cleanTask(cb) {
	var patterns = TASK_CONFIG.clean && TASK_CONFIG.clean.patterns ? TASK_CONFIG.clean.patterns : projectPath(PATH_CONFIG.dest);
	return del(patterns, { force: true });
};

module.exports = cleanTask;
