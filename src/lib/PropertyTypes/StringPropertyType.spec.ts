import {expect} from 'chai'
import 'mocha'
import constants from './constants'
import StringPropertyType from './StringPropertyType'

describe('StringPropertyType', () => {
    describe('constructor', () => {
        it('Should return a PropertyType with a type name of String', () => {
          expect(new StringPropertyType().TypeName).to.equal(constants.String)
        })
        it('Should correctly assign unique as false', () => {
          expect(new StringPropertyType(undefined, undefined, undefined, undefined, undefined, undefined, false)).to.deep.include({Unique: false})
        })
        it('Should correctly assign unique as true', () => {
          expect(new StringPropertyType(undefined, undefined, undefined, undefined, undefined, undefined, true)).to.deep.include({Unique: true})
        })
    })
})
