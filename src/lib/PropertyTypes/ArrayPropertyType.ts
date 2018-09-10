import constants from './constants'
import PropertyType from './PropertyType'

export default class ArrayPropertyType extends PropertyType {

    public MemberType: PropertyType | string

    constructor( memberType: PropertyType | string) {
        super(constants.Array, false, false, [], false)
        this.MemberType = memberType

    }
}
