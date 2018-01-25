const fs = require('fs');
const path = require('path');

function getConfigFile(requestDirPath, configFile) {
  if (path.isAbsolute(configFile)) {
    return fs.existsSync(configFile)
      ? configFile
      : undefined;
  }

  // If `configFile` is a relative path, resolve it.
  // We define a relative path as: starts with
  // one or two dots + a common directory delimiter
  if (configFile.match(/^\.\.?(\/|\\)/)) {
    const resolvedPath = path.resolve(requestDirPath, configFile);
    return fs.existsSync(resolvedPath)
      ? resolvedPath
      : undefined;

    // If `configFile` is a file name, find it in the directory tree
  } else {
    while (true) {
      const fileName = path.join(requestDirPath, configFile);
      if (fs.existsSync(fileName)) {
        return fileName;
      }
      const parentPath = path.dirname(requestDirPath);
      if (parentPath === requestDirPath) {
        break;
      }
      requestDirPath = parentPath;
    }

    return undefined;
  }
}

/**
 * get typescript compilerOptions
 * @param {string} resourcePath webpack this.resourcePath
 * @param {string} configFile tsconfig file name or path
 */
export default function getConfig(resourcePath, configFile) {
  const configFilePath = getConfigFile(path.dirname(resourcePath), configFile);
  if (configFilePath !== undefined) {
    console.log(`export-ts-react-props-loader: Using tsconfig file at ${configFilePath}`);
  }
  return configFilePath;
}
