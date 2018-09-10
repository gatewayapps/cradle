import {expect} from 'chai'
import 'mocha'
import constants from './constants'
import DateTimePropertyType from './DateTimePropertyType'

describe('DateTimePropertyType', () => {
    describe('constructor', () => {
        it('Should return a PropertyType with a type name of DateTime', () => {
          expect(new DateTimePropertyType().TypeName).to.equal(constants.DateTime)
        })
    })
})
