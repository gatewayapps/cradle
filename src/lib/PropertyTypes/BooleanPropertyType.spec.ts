import BooleanPropertyType from './BooleanPropertyType'
import {expect} from 'chai'
import constants from './constants'
import 'mocha'

describe('BooleanPropertyType', ()=>{
    describe('constructor', ()=>{
        it('Should return a PropertyType with a type name of Boolean', ()=>{
          expect(new BooleanPropertyType().TypeName).to.equal(constants.Boolean)
        })
    })
})