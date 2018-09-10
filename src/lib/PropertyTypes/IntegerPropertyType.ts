
import constants from './constants'
import ConstrainablePropertyType from './ConstrainablePropertyType'

export class IntegerAutogenerateOptions {
    public Seed: number
    public Increment: number
    constructor(seed: number = 1, increment: number = 1) {
        this.Seed = seed
        this.Increment = increment
    }
}

export default class IntegerPropertyType extends ConstrainablePropertyType {
    public Autogenerate?: IntegerAutogenerateOptions
    constructor(minimumValue?: number, maximumValue?: number, autogenerateOptions?: any, allowNull: boolean = false, isPrimaryKey: boolean = false, defaultValue?: any, unique: boolean = false) {
        super(constants.Integer, minimumValue, maximumValue, allowNull, isPrimaryKey, defaultValue, unique)
        if (autogenerateOptions instanceof IntegerAutogenerateOptions) {
            this.Autogenerate = autogenerateOptions
        } else {
            if (autogenerateOptions !== undefined) {
            throw new TypeError(`Expected auto options to be of type IntegerAutogenerateOptions, got ${autogenerateOptions}`)
            }
        }
    }
}
