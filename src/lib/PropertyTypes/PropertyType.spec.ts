import { expect } from 'chai'
import 'mocha'

import { PropertyTypes } from './constants'
import { PropertyType } from './PropertyType'

class MockPropertyType extends PropertyType {
  constructor(typeName: string, allowNull: boolean = false, isPrimaryKey: boolean = false, defaultValue?: any, unique: boolean | string = false) {
    super(typeName, { AllowNull: allowNull, IsPrimaryKey: isPrimaryKey, DefaultValue: defaultValue, Unique: unique })
  }
}

describe('PropertyType', () => {
  describe('constructor', () => {
    it('Should return a new PropertyType with the correct type name', () => {
      const mock = new MockPropertyType(PropertyTypes.Object)
      expect(mock.TypeName).to.equal(PropertyTypes.Object)
    })
    it('Should throw a TypeError if an unknown property type name is used', () => {
      /* tslint:disable-next-line no-unused-expression */
      expect(() => {
        const temp = new MockPropertyType('Unknown')
      }).to.throw(TypeError)
    })
  })
  describe('Equals', () => {
    it('Should return true when both types are equal', () => {
      const mockA = new MockPropertyType(PropertyTypes.Object)
      const mockB = new MockPropertyType(PropertyTypes.Object)
      expect(mockA.equals(mockB)).to.equal(true)
    })
    it('Should not return true when type names are not equal', () => {
      expect(new MockPropertyType(PropertyTypes.Object).equals(new MockPropertyType(PropertyTypes.String))).to.equal(false)
    })
    it('Should not return true when allowNull is not equal', () => {
      expect(new MockPropertyType(PropertyTypes.Object, false).equals(new MockPropertyType(PropertyTypes.Object, true)))
    })
    it('Should not return true when isPrimaryKey is not equal', () => {
      expect(new MockPropertyType(PropertyTypes.Object, false, false).equals(new MockPropertyType(PropertyTypes.Object, false, true)))
    })
    it('Should not return true when defaultValue is not equal', () => {
      expect(new MockPropertyType(PropertyTypes.Object, false, false, false).equals(new MockPropertyType(PropertyTypes.Object, false, false, true)))
    })
    it('Should not return true when unique is not equal', () => {
      expect(new MockPropertyType(PropertyTypes.Object, false, false, null, false).equals(new MockPropertyType(PropertyTypes.Object, false, false, null, true)))
    })
  })
})
