import { IntegerAutogenerateOptions } from "../PropertyTypes/IntegerPropertyType";

export default class SpecProperty {
  public PropertyType: string
  public AutogenerateOptions: IntegerAutogenerateOptions | any
  public Nullable: boolean
  public AllowedValues: any[] | null
  public DefaultValue: any | null
  public MinValue: any | null
  public MaxValue: any | null
  public PrimaryKey: boolean
  public Unique: boolean
  public DeleteFlag: boolean
  public Length: number | null

  constructor(propertyType: string,
              nullable: boolean,
              autogenerateOptions
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
  }
}
