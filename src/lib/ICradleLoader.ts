import CradleSchema from './CradleSchema'
import { IConsole } from './IConsole'
import { ICradleOperation } from './ICradleOperation'
import LoaderOptions from './LoaderOptions'
import ModelReference from './ModelReference'
import PropertyType from './PropertyTypes/PropertyType'

export default interface ICradleLoader {

    /**
     * Passes a loader the options so it can do any initialization it needs to
     */
    prepareLoader: (options: {[key: string]: any}, console: IConsole) => Promise < void >
    readModelNames: () => Promise < string[] >
    readModelOperationNames?: (modelName: string) => Promise <string[]>
    readModelOperation?: (modelName: string, operationName: string) => Promise<ICradleOperation>
    readModelPropertyNames: (modelName: string) => Promise < string[] >
    readModelPropertyType: (modelName: string, propertyName: string) => Promise < PropertyType >
    readModelReferenceNames: (modelName: string) => Promise < string[] >
    readModelReferenceType: (modelName: string, referenceName: string) => Promise < ModelReference >
    readModelMetadata: (modelName: string) => Promise < object >
    finalizeSchema: (schema: CradleSchema) => Promise < CradleSchema >
    loadSchema: () => Promise<CradleSchema>
}
