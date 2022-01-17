import projectPath from "./projectPath";
import fs from "fs";

const getPathConfig = () => {
	const defaultConfigPath = projectPath("config/path-config.json");

	if (fs.existsSync(defaultConfigPath)) {
		return require(defaultConfigPath);
	}

	return require("../path-config.json");
}

export default getPathConfig();
