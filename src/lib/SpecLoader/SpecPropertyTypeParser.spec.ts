import {expect} from 'chai'
import 'mocha'
import constants from '../PropertyTypes/constants'
import { IntegerAutogenerateOptions } from '../PropertyTypes/IntegerPropertyType'
import SpecProperty from './SpecProperty'
import ParseProperty from './SpecPropertyTypeParser'

describe('SpecPropertyTypeParser', () => {
    describe('Integer', () => {
        it('Basic integer', () => {
          expect(ParseProperty('integer')).to.deep.equal(new SpecProperty('integer'))
        })
        it('With a default value', () => {
          expect(ParseProperty('integer default(5)')).to.deep.equal(new SpecProperty('integer', undefined, undefined, undefined, undefined, undefined, undefined, 5))
        })
        it('As a primary key', () => {
          expect(ParseProperty('integer primary')).to.deep.equal(new SpecProperty('integer', undefined, true))
        })
        it('With autogenerate options', () => {
          expect(ParseProperty('integer auto(1,1)')).to.deep.equal(new SpecProperty('integer', undefined, undefined, undefined, undefined, new IntegerAutogenerateOptions(1, 1)))
        })

    })
    describe('Boolean', () => {
      it('Should parse a simple boolean', () => {
        expect(ParseProperty('boolean')).to.deep.equal(new SpecProperty('boolean'))
      })
    })
    describe('Decimal', () => {
      it('Should parse a simple decimal', () => {
        expect(ParseProperty('decimal')).to.deep.equal(new SpecProperty('decimal'))
      })
    })
    describe('DateTime', () => {
      it('Should parse a simple datetime', () => {
        expect(ParseProperty('datetime')).to.deep.equal(new SpecProperty('datetime'))
      })
    })
    describe('String', () => {
      it('Should parse a simple string', () => {
        expect(ParseProperty('string')).to.deep.equal(new SpecProperty('string'))
      })
    })
    describe('UniqueIdentifier', () => {
      it('Should parse a simple uniqueidentifier', () => {
        expect(ParseProperty('uniqueidentifier')).to.deep.equal(new SpecProperty('uniqueidentifier'))
      })
    })

})
