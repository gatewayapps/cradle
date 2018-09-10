import constants from './constants'
import PropertyType from './PropertyType'

export default class ModelReferenceType extends PropertyType {

    public ModelName: string

    constructor( modelName: string) {
        super(constants.ModelReference, true, false, null, false)
        this.ModelName = modelName

    }
}
