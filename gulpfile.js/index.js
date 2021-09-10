/*
	gulpfile.js
	===========
	Rather than manage one giant configuration file responsible
	for creating multiple tasks, each task has been broken out into
	its own file in gulpfile.js/tasks. Any files in that directory get
	automatically required below.
*/

const { series, watch } = require('gulp');
const requireDir = require("require-dir");
const os = require("os");
const fs = require("fs-extra");
const del = require("del");
const path = require("path");
const getEnabledTasks = require("./lib/get-enabled-tasks");
const flattenObj = require("./lib/flattenObj");
const projectPath = require("./lib/projectPath");

// Globally expose config objects
global.PATH_CONFIG = require("./lib/get-path-config");
global.TASK_CONFIG = require("./lib/get-task-config");

// Require all tasks in gulpfile.js/tasks, including subfolders
const modules = flattenObj(requireDir("./tasks", { recurse: true }));

// Create task for every exported module
for (const [key, value] of Object.entries(modules)) {
	exports[key] = value;
}

function tempDir(cb) {
	// Build to a temporary directory, then move compiled files as a last step
	PATH_CONFIG.finalDest = PATH_CONFIG.dest;
	PATH_CONFIG.dest = PATH_CONFIG.temp ? projectPath(PATH_CONFIG.temp) : path.join(os.tmpdir(), "gulp-starter");

	// Make sure the temp directory exists and is empty
	del.sync(PATH_CONFIG.dest, { force: true });
	fs.mkdirSync(PATH_CONFIG.dest);

	cb();
}

function defaultTask() {
	let gulpTasks = [];
	const tasks = getEnabledTasks();
	const { prebuild, postbuild } = TASK_CONFIG.additionalTasks.development;

	if (prebuild) {
		gulpTasks.push(...prebuild);
	}
	if (tasks.assetTasks) {
		gulpTasks.push(...tasks.assetTasks)
	}

	if (tasks.codeTasks) {
		gulpTasks.push(...tasks.codeTasks)
	}

	if (TASK_CONFIG.static) {
		gulpTasks.push("static");
	}

	if (postbuild) {
		gulpTasks.push(...postbuild);
	}

	gulpTasks.push("watch");

	return gulpTasks.map(item => modules[item]);
}

function productionTask() {
	let gulpTasks = [];
	global.production = true;

	const tasks = getEnabledTasks("production");
	// const rev = TASK_CONFIG.production.rev ? "rev" : false;
	const { prebuild, postbuild } = TASK_CONFIG.additionalTasks.production;

	if (prebuild) {
		gulpTasks.push(...prebuild);
	}

	if (tasks.assetTasks) {
		gulpTasks.push(...tasks.assetTasks);
	}

	if (tasks.codeTasks) {
		gulpTasks.push(...tasks.codeTasks);
	}

	if (TASK_CONFIG.production.rev) {
		gulpTasks.push("rev.index");
	}

	gulpTasks.push("sizereport");

	if (TASK_CONFIG.static) {
		gulpTasks.push("static");
	}

	if (postbuild) {
		gulpTasks.push(...postbuild);
	}

	gulpTasks.push("replace-files");

	return gulpTasks.map(item => modules[item]);
}

exports.default = series(...defaultTask());
exports.build = series(tempDir, ...productionTask());
