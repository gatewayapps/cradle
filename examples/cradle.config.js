const CradleConfig = require('../dist/lib/CradleConfig').default
const LoaderOptions = require('../dist/lib/LoaderOptions').default
const SpecEmitter = require('../dist/lib/SpecEmitter/SpecEmitter').default
const SpecEmitterOptions = require('../dist/lib/SpecEmitter/SpecEmitterOptions').default


const loaderOptions = new LoaderOptions('spec', {
  source: './spec-out.yaml'
}, console)



module.exports = new CradleConfig(loaderOptions, [{module: 'spec', name: 'spec', options: {
  outputPath: './spec-out2.yaml'
}}])