const fs = require("fs-extra");
const mergeWith = require("lodash/mergeWith");
const projectPath = require("./projectPath");
const taskDefaults = require("./task-defaults");

function getTaskConfig() {
	return require("../task-config");
}

function withDefaults(taskConfig) {
	Object.keys(taskDefaults).reduce((config, key) => {
		if (taskConfig[key] !== false) {
			// if true, use default, else merge objects
			config[key] =
				taskDefaults[key] === true
					? taskDefaults[key]
					: mergeWith(
						taskDefaults[key],
						config[key] || {},
						replaceArrays
					);
		}
		return config;
	}, taskConfig);

	return taskConfig;
}

function replaceArrays(objValue, srcValue) {
	if (Array.isArray(objValue)) {
		return srcValue;
	}
}

module.exports = withDefaults(getTaskConfig());
