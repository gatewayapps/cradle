const program = require('commander')
import colors from 'colors'
import dot from 'dot'
import ICradleLoader from '../lib/ICradleLoader'
import LoaderOptions from '../lib/LoaderOptions'
import SpecLoader from '../lib/SpecLoader/SpecLoader'
program
  .option('-s, --source [definition]', 'source definition')
  .option('-l, --loader [loader name]', 'source loader')

  .parse(process.argv)

async function getLoader(): Promise<ICradleLoader> {
  let loader!: ICradleLoader
  if (program.loader.toLowerCase() === 'spec') {
    // use cradle spec loader
      loader = new SpecLoader()

  } else {
    // TO-DO: handle other loaders here
      try {
        const loaderDef = require(program.loader)
        try {
        loader = new loaderDef()
        } catch (err) {
          return Promise.reject(`${program.loader} module was found but a valid ICradleLoader is not the default export`)
        }
      } catch (err) {
        return Promise.reject(err)
      }
  }
  await loader.prepareLoader(new LoaderOptions(program.source, console))
  return loader
}

console.log(process.cwd())

// const dataObject = {
//   test: 3,
//   toDataType() {
//     return `Hey ${this.test}, ${this.test}`
//   }
// }

// const temp = dot.template('{{=it.toDataType()}}')
// const resultText = temp(dataObject)
// console.log(resultText)

getLoader().then(async (loader) => {
  const schema = await loader.loadSchema()
  const modelNames = Object.keys(schema)
  console.log(colors.yellow(JSON.stringify(schema, null, 2)))
  console.log(colors.green(`Schema is valid`))
}).catch((err: Error) => {
  console.log(colors.red(err.message))
})
