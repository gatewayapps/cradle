
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
    constructor(minimumValue?: number, maximumValue?: number, autogenerateOptions?: IntegerAutogenerateOptions, allowNull: boolean = false, isPrimaryKey: boolean = false, defaultValue: any = null, unique: boolean = false) {
        super(constants.Integer, minimumValue, maximumValue, allowNull, isPrimaryKey, defaultValue, unique)
        this.Autogenerate = autogenerateOptions
    }
}
