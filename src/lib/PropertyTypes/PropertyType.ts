import constants from './constants'
import IPropertyType from './IPropertyType'

export default abstract class PropertyType implements IPropertyType {
    public TypeName: string
    public IsPrimaryKey: boolean
    public AllowNull: boolean
    public DefaultValue!: any
    public Unique: boolean

    constructor(typeName: string, allowNull: boolean = false, isPrimaryKey: boolean = false, defaultValue?: any, unique: boolean = false) {
        if (!(typeName in constants)) {
            throw new TypeError(`${typeName} is not a valid property type`)
        } else {
            this.TypeName = typeName
            this.IsPrimaryKey = isPrimaryKey
            this.AllowNull = allowNull
            this.DefaultValue = defaultValue
            this.Unique = unique
        }
    }

    public toString(): string {
        return this.TypeName
    }

    public equals(other: PropertyType): boolean {
        return (
            this.TypeName === other.TypeName &&
            this.IsPrimaryKey === other.IsPrimaryKey &&
            this.AllowNull === other.AllowNull &&
            this.DefaultValue === other.DefaultValue &&
            this.Unique === other.Unique
        )
    }
}
