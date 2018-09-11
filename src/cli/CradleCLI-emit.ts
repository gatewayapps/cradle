import colors from 'colors'
import dot from 'dot'
import {getEmitter, getLoader} from '../lib/CradleUtils'
import { IEmitterOptions } from '../lib/EmitterOptions'
import LoaderOptions from '../lib/LoaderOptions'

export default async function emit(loaderOptions: LoaderOptions, emitOptions: IEmitterOptions) {
  getLoader(loaderOptions).then(async (loader) => {
    const schema = await loader.loadSchema()
    getEmitter(emitOptions).then((emitter) => {
      emitter.emitSchema(schema)
    })
  }).catch((err: Error) => {
    console.log(colors.red(err.message))
  })
}

// const dataObject = {
//   test: 3,
//   toDataType() {
//     return `Hey ${this.test}, ${this.test}`
//   }
// }

// const temp = dot.template('{{=it.toDataType()}}')
// const resultText = temp(dataObject)
// console.log(resultText)
