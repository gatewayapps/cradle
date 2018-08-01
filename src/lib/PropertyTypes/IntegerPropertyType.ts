
import constants from "./constants";
import ConstrainablePropertyType from "./ConstrainablePropertyType";


export class AutogenerateOptions {
    public Seed: number
    public Increment: number
    constructor(seed: number = 1, increment: number = 1) {
        this.Seed = seed
        this.Increment = increment
    }
}

export default class IntegerPropertyType extends ConstrainablePropertyType {
    public Autogenerate?: AutogenerateOptions
    constructor(minimumValue?: number, maximumValue?: number, allowNull: boolean = false, isPrimaryKey: boolean = false, defaultValue: any = null, autogenerateOptions?: AutogenerateOptions) {
        super(constants.Integer, minimumValue, maximumValue, allowNull, isPrimaryKey, defaultValue)
        this.Autogenerate = autogenerateOptions
    }
}