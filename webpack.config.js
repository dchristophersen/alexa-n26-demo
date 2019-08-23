const path = require('path');
var nodeExternals = require('webpack-node-externals')

module.exports = {
   entry: './handler.js',
   target: 'node',
   externals: [nodeExternals()],
   output: {
      libraryTarget: 'commonjs',
      path: path.join(__dirname, ".webpack"),
      filename: 'handler.js', // this should match the first part of function handler in serverless.yml
   }
};