import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';
import getConfig from './config';

const schema = {
  type: 'object',
  properties: {
    module: {
      enum: ['es', 'commonjs']
    },
    name: {
      type: 'string',
      minLength: 5
    },
    configFile: {
      type: 'string',
    },
  }
}

function getParse(resourcePath, configFile) {
  const configFilePath = getConfig(resourcePath, configFile);
  if (configFilePath !== undefined) {
    return require('react-docgen-typescript').withCustomConfig(configFilePath).parse;
  }
  return require('react-docgen-typescript').withDefaultConfig().parse;
}

export default function loader(source) {
  const options = getOptions(this) || {};

  validateOptions(schema, options, 'export ts react props loader');

  const name = options.name || 'componentProps';
  const configFile = options.configFile || 'tsconfig.json';

  const parse = getParse(this.resourcePath, configFile)
  const props = parse(this.resourcePath);

  if (options.module === 'commonjs') {
    return `${source}\nmodule.exports.${name} = ${JSON.stringify(props)}`;
  }

  return `${source}\nexport var ${name} = ${JSON.stringify(props)}`;
};
