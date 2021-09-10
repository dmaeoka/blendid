const path = require("path");
const projectPath = require("./projectPath");
const fs = require("fs-extra");
module.exports = class BundlesizeWebpackPlugin {
	constructor(jsDest, dest, filename) {
		this.jsDest = jsDest;
		this.dest = dest;
		this.filename = filename || "rev-manifest.json";
	}

	apply(compiler) {
		/* stats is passed as an argument when done hook is tapped.  */
		const jsDest = this.jsDest;
		const dest = this.dest;
		const filename = this.filename;

		compiler.hooks.done.tap('Hello World Plugin', statsObject => {
			const stats = statsObject.toJson();
			const chunks = stats.assetsByChunkName;
			const manifest = {};

			for (let key in chunks) {
				const originalFilename = key + ".js";
				// https://github.com/vigetlabs/blendid/issues/232#issuecomment-171963233
				const chunkName = typeof chunks[key] === "string" ? chunks[key] : chunks[key][0];
				manifest[path.join(jsDest, originalFilename)] = path.join(
					jsDest,
					chunkName
				);
			}

			fs.writeFileSync(
				projectPath(dest, filename),
				JSON.stringify(manifest)
			);
		});
	}
};

