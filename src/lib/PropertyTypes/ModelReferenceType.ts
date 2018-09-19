import ArrayPropertyType from './ArrayPropertyType'
import constants from './constants'
import ObjectPropertyType from './ObjectPropertyType'
import PropertyType from './PropertyType'

export default class ModelReferenceType extends PropertyType {

    public ModelName: string
    public ModelType: ObjectPropertyType | ArrayPropertyType | undefined

    constructor( modelName: string) {
        super(constants.ModelReference, true, false, null, false)
        this.ModelName = modelName

    }
}
