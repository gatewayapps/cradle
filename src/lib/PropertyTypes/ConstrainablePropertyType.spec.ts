import { expect } from 'chai'
import 'mocha'
import BooleanPropertyType from './BooleanPropertyType'
import constants from './constants'
import ConstrainablePropertyType from './ConstrainablePropertyType'

class MockConstrainablePropertyType extends ConstrainablePropertyType {
  constructor(minimumValue?: number, maximumValue?: number) {
    super(constants.Integer, {
      MaximumValue: maximumValue,
      MinimumValue: minimumValue
    })
  }
}

describe('ConstrainablePropertyType', () => {
  describe('constructor', () => {
    it('Should assign minimum and maximum values', () => {
      expect(new MockConstrainablePropertyType(0, 10)).to.deep.include({
        MaximumValue: 10,
        MinimumValue: 0
      })
    })
    it('Should throw a RangeError if Minimum Value is greater than Maximum Value', () => {
      expect(() => {
        const temp = new MockConstrainablePropertyType(10, 0)
        if (!temp) {
          throw new RangeError('Temp error')
        }
      }).to.throw(RangeError)
    })
  })
  describe('equals', () => {
    it('Should return true if MinimumValue and MaximumValue are equal', () => {
      expect(
        new MockConstrainablePropertyType(0, 10).equals(
          new MockConstrainablePropertyType(0, 10)
        )
      ).to.equal(true)
    })
    it('Should return false if MinimumValue is not equal', () => {
      expect(
        new MockConstrainablePropertyType(0, 10).equals(
          new MockConstrainablePropertyType(5, 10)
        )
      ).to.equal(false)
    })
    it('Should return false if MaximumValue is not equal', () => {
      expect(
        new MockConstrainablePropertyType(0, 10).equals(
          new MockConstrainablePropertyType(0, 20)
        )
      ).to.equal(false)
    })
    it('Should return false if compared against a non constrainable type', () => {
      expect(
        new MockConstrainablePropertyType(0, 10).equals(
          new BooleanPropertyType({ DefaultValue: false })
        )
      ).to.equal(false)
    })
  })
})
