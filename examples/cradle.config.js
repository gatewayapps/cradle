const CradleConfig = require('../dist/lib/CradleConfig').default
const LoaderOptions = require('../dist/lib/LoaderOptions').default
const SpecEmitter = require('../dist/lib/SpecEmitter/SpecEmitter').default
const SpecEmitterOptions = require('../dist/lib/SpecEmitter/SpecEmitterOptions').default


const loaderOptions = new LoaderOptions('spec-loader-2', {
  source: './examples/test.yml'
}, console)



module.exports = new CradleConfig(loaderOptions, [{module: 'spec2', name: 'spec', options: {
  outputPath: './spec-out2.yaml'
}}])