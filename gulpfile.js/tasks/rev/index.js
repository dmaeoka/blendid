// if (!TASK_CONFIG.production.rev) return;
const { series } = require("gulp");
const revAssets = require("./rev-assets");
const revCss = require("./rev-css");
const revUpdateReferences = require("./update-references");
const updateHtml = require("./update-html");

// If you are familiar with Rails, this task the equivalent of `rake assets:precompile`
function revTask() {
	let tasks = [];
	// 1) Add md5 hashes to assets referenced by CSS and JS files
	tasks.push(revAssets);
	// 2) Update asset references (images, fonts, etc) with reved filenames in compiled css + js
	tasks.push(revCss);
	// 3) Rev and compress CSS and JS files (this is done after assets, so that if a referenced asset hash changes, the parent hash will change as well
	tasks.push(revUpdateReferences);
	// 4) Update asset references in HTML
	if (TASK_CONFIG.html) {
		tasks.push(updateHtml)
	}
	return tasks;
}

module.exports = series(...revTask());
