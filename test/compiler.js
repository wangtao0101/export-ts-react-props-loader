import path from 'path';
import webpack from 'webpack';
import memoryfs from 'memory-fs';

export default (fixture, options = {}) => {

  const {
    loaderOptions = undefined,
  } = options;

  const webpackConfig = {
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        test: /\.tsx$/,
        use: [{
          loader: require.resolve('ts-loader'),
        }, {
          loader: path.resolve(__dirname, '../src/index.js'),
          options: loaderOptions,
        }]
      }]
    }
  }

  const compiler = webpack(webpackConfig);

  compiler.outputFileSystem = new memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);

      resolve(stats);
    });
  });
}
