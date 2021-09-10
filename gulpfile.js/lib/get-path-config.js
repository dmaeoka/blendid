const projectPath = require("./projectPath");
const fs = require("fs-extra");

function getPathConfig() {
	return require("../path-config.json");
}

module.exports = getPathConfig();
