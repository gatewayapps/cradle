import { IntegerAutogenerateOptions } from '../PropertyTypes/IntegerPropertyType'

export default class SpecProperty {
  public PropertyType: string
  public AutogenerateOptions!: IntegerAutogenerateOptions | boolean
  public Nullable: boolean
  public AllowedValues!: any[]
  public DefaultValue!: any | null
  public MinValue!: any
  public MaxValue!: any
  public PrimaryKey: boolean
  public Unique: boolean
  public DeleteFlag: boolean
  public Length!: number

  constructor(propertyType: string,
              nullable: boolean,
              autogenerateOptions: any,
              allowedValues: any,
              defaultValue: any,
              minValue: any,
              maxValue: any,
              primaryKey: boolean,
              unique: boolean,
              deleteFlag: boolean,
              length: any) {
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

    if (Array.isArray(autogenerateOptions)) {
      if (autogenerateOptions.length !== 2) {
        throw new Error(`Expected 2 elements in autogenerate options, received ${autogenerateOptions}`)
      } else {
        this.AutogenerateOptions = new IntegerAutogenerateOptions(autogenerateOptions[0], autogenerateOptions[1])
      }
    } else {
      this.AutogenerateOptions = autogenerateOptions
    }
  }
}
