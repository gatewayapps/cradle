import LoaderOptions from './LoaderOptions'
import ModelReference from './ModelReference'
import PropertyType from './PropertyTypes/PropertyType'

export default interface ICradleLoader {
    /**
     * Passes a loader the options so it can do any initialization it needs to
     */
    prepareLoader: (options: LoaderOptions) => Promise<void>
    readModelNames: () => Promise<string[]>
    readModelPropertyNames: (modelName: string) => Promise<string[]>
    readModelPropertyType: (modelName: string, propertyName: string) => Promise<PropertyType>
    readModelReferenceNames: (modelName: string) => Promise<string[]>
    readModelReferenceType: (modelName: string, referenceName: string) => Promise<ModelReference>
    readModelMetadata: (modelName: string) => Promise<object>
    finalizeSchema: (schema: object) => Promise<object>
    loadSchema: () => Promise<object>
}
