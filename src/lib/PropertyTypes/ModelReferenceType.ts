import constants from './constants'
import PropertyType from './PropertyType'
import ObjectPropertyType from './ObjectPropertyType';
import ArrayPropertyType from './ArrayPropertyType';

export default class ModelReferenceType extends PropertyType {

    public ModelName: string
    public ModelType: ObjectPropertyType | ArrayPropertyType | undefined

    constructor( modelName: string) {
        super(constants.ModelReference, true, false, null, false)
        this.ModelName = modelName

    }
}
