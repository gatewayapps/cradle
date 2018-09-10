import { IntegerAutogenerateOptions } from '../PropertyTypes/IntegerPropertyType'

export default class SpecProperty {
  public PropertyType: string
  public AutogenerateOptions!: IntegerAutogenerateOptions | boolean
  public Nullable: boolean
  public AllowedValues!: any[]
  public DefaultValue!: any
  public MinValue!: any
  public MaxValue!: any
  public PrimaryKey: boolean
  public Unique: boolean
  public DeleteFlag: boolean
  public Length!: number
  public IsArray: boolean

  constructor(propertyType: string, nullable: boolean = false, primaryKey: boolean = false, unique: boolean = false, deleteFlag: boolean = false, autogenerateOptions?: any, allowedValues?: any, defaultValue?: any, minValue?: any, maxValue?: any, length?: any, isArray: boolean = false) {

    this.PropertyType = propertyType
    this.Nullable = nullable
    this.AllowedValues = allowedValues
    this.DefaultValue = defaultValue
    this.MinValue = minValue
    this.MaxValue = maxValue
    this.PrimaryKey = primaryKey
    this.Unique = unique
    this.DeleteFlag = deleteFlag
    this.Length = length
    this.IsArray = isArray
    if (Array.isArray(autogenerateOptions)) {
      if (autogenerateOptions.length !== 2) {
        throw new RangeError(`Expected 2 elements in autogenerate options, received ${autogenerateOptions}`)
      } else {
        this.AutogenerateOptions = new IntegerAutogenerateOptions(autogenerateOptions[0], autogenerateOptions[1])
      }
    } else {
      this.AutogenerateOptions = autogenerateOptions
    }
  }
}
