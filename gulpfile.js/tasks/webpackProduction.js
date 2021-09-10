// if (!TASK_CONFIG.javascripts) return;
const webpack = require("webpack");
const logger = require("../lib/compileLogger");

function webpackProductionTask(cb) {
	const webpackConfig = require("../lib/webpack-multi-config")("production");

	webpack(webpackConfig, (err, stats) => {
		logger(err, stats);
		cb();
	});
};

module.exports = webpackProductionTask;
