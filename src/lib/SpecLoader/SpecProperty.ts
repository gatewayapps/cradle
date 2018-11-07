import { IntegerAutogenerateOptions } from '../PropertyTypes/IntegerPropertyType'

export interface ISpecPropertyOptions {
  allowedValues?: any
  autogenerateOptions?: any
  defaultValue?: any
  deleteFlag?: boolean
  isArray?: boolean
  length?: any
  maxValue?: any
  minValue?: any
  nullable?: boolean
  precision?: number
  primaryKey?: boolean
  scale?: number
  unique?: boolean | string
}

export default class SpecProperty {
  public PropertyType: string
  public AutogenerateOptions?: IntegerAutogenerateOptions | boolean
  public Nullable: boolean
  public AllowedValues?: any[]
  public DefaultValue?: any
  public MinValue?: any
  public MaxValue?: any
  public PrimaryKey: boolean
  public Unique: boolean | string
  public DeleteFlag: boolean
  public Length?: number
  public IsArray: boolean
  public Precision?: number
  public Scale?: number

  constructor(propertyType: string, options: ISpecPropertyOptions = {}) {

    this.PropertyType = propertyType
    this.Nullable = options.nullable || false
    this.AllowedValues = options.allowedValues
    this.DefaultValue = options.defaultValue
    this.MinValue = options.minValue
    this.MaxValue = options.maxValue
    this.PrimaryKey = options.primaryKey || false
    this.Unique = options.unique || false
    this.DeleteFlag = options.deleteFlag || false
    this.Length = options.length
    this.IsArray = options.isArray || false
    this.Precision = options.precision
    this.Scale = options.scale
    if (Array.isArray(options.autogenerateOptions)) {
      if (options.autogenerateOptions.length !== 2) {
        throw new RangeError(`Expected 2 elements in autogenerate options, received ${options.autogenerateOptions}`)
      } else {
        this.AutogenerateOptions = new IntegerAutogenerateOptions(options.autogenerateOptions[0], options.autogenerateOptions[1])
      }
    } else {
      this.AutogenerateOptions = options.autogenerateOptions
    }
  }
}
