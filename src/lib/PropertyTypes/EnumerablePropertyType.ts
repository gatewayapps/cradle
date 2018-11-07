import constants from './constants'
import PropertyType from './PropertyType'

export default abstract class EnumerablePropertyType extends PropertyType {
    public AllowedValues?: any[]
    constructor(typeName: string, allowedValues?: any[], allowNull: boolean = false, isPrimaryKey: boolean = false, defaultValue?: any, unique: boolean | string = false) {
        super(typeName, allowNull, isPrimaryKey, defaultValue, unique)
        this.AllowedValues = allowedValues
    }
    public equals(other: PropertyType): boolean {
        if (!super.equals(other)) {
            return false
        }
        if (other instanceof EnumerablePropertyType && this.AllowedValues !== null && other.AllowedValues !== null) {
            return this.arrayEquals(this.AllowedValues, other.AllowedValues)
        }
        return false
    }

    /**
     *  Source code for array equals from here: https://stackoverflow.com/a/16436975
     * @param a first array
     * @param b second array
     */
    private arrayEquals(a?: any[], b?: any[]): boolean {
        if (a === b) { return true }
        if (a == null || b == null) { return false }
        if (a.length !== b.length) { return false }

        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.

        for (let i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) { return false }
        }
        return true
    }
}
