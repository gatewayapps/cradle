import {expect} from 'chai'
import 'mocha'
import constants from './constants'
import DecimalPropertyType from './DecimalPropertyType'

describe('DecimalPropertyType', () => {
    describe('constructor', () => {
        it('Should return a PropertyType with a type name of Decimal', () => {
          expect(new DecimalPropertyType().TypeName).to.equal(constants.Decimal)
        })
        it('Should correctly assign Precision and Scale', () => {
          expect(new DecimalPropertyType(18, 2)).to.deep.include({Precision: 18, Scale: 2})
        })
    })
    describe('equals', () => {
      it('Should return true if Precision and Scale are equal', () => {
        expect(new DecimalPropertyType(18, 2).equals(new DecimalPropertyType(18, 2))).to.equal(true)
      })
      it('Should return false if Precision is not equal', () => {
        expect(new DecimalPropertyType(18, 2).equals(new DecimalPropertyType(16, 2))).to.equal(false)
      })
      it('Should return false if Scale is not equal', () => {
        expect(new DecimalPropertyType(18, 2).equals(new DecimalPropertyType(18, 4))).to.equal(false)
      })
    })
})
