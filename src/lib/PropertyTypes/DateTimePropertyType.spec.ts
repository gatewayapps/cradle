import DateTimePropertyType from './DateTimePropertyType'
import {expect} from 'chai'
import constants from './constants'
import 'mocha'

describe('DateTimePropertyType', ()=>{
    describe('constructor', ()=>{
        it('Should return a PropertyType with a type name of DateTime', ()=>{
          expect(new DateTimePropertyType().TypeName).to.equal(constants.DateTime)
        })
    })
})