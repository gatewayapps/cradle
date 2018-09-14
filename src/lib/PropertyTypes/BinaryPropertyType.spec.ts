import {expect} from 'chai'
import 'mocha'
import BinaryPropertyType from './BinaryPropertyType'
import constants from './constants'

describe('BinaryPropertyType', () => {
    describe('constructor', () => {
        it('Should return a PropertyType with a type name of Binary', () => {
          expect(new BinaryPropertyType().TypeName).to.equal(constants.Binary)
        })
    })
})
