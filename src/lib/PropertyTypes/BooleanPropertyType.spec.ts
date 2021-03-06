import {expect} from 'chai'
import 'mocha'
import BooleanPropertyType from './BooleanPropertyType'
import constants from './constants'

describe('BooleanPropertyType', () => {
    describe('constructor', () => {
        it('Should return a PropertyType with a type name of Boolean', () => {
          expect(new BooleanPropertyType().TypeName).to.equal(constants.Boolean)
        })
    })
})
