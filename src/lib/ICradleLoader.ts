import LoaderOptions from './LoaderOptions'
import PropertyType from './PropertyTypes/PropertyType';

export default interface ICradleLoader {
    /**
     * Passes a loader the options so it can do any initialization it needs to
     */
    prepareLoader: (options: LoaderOptions) => Promise<void>
    readModelNames: () => Promise<string[]>
    readModelPropertyNames: (modelName: string) => Promise<string[]>
    readModelPropertyType: (modelName: string, propertyName: string) => Promise<PropertyType>
}