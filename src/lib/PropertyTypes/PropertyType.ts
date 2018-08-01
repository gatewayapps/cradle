import IPropertyType from "./IPropertyType"

export default abstract class PropertyType implements IPropertyType {
    public TypeName: string
    public IsPrimaryKey: boolean
    public AllowNull: boolean
    public DefaultValue: any

    constructor(typeName: string, allowNull: boolean = false, isPrimaryKey: boolean = false, defaultValue: any = null) {
        this.TypeName = typeName
        this.IsPrimaryKey = isPrimaryKey
        this.AllowNull = allowNull
        this.DefaultValue = defaultValue
    }

    public toString(): string {
        return this.TypeName
    }

    public equals(other: PropertyType): boolean {
        return (
            this.toString() === other.toString() &&
            this.IsPrimaryKey === other.IsPrimaryKey &&
            this.AllowNull === other.AllowNull &&
            this.DefaultValue === other.DefaultValue
        )
    }
}