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
        it('With a min value', () => {
          expect(ParseProperty('integer min(0)')).to.deep.equal(new SpecProperty('integer', undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0))
        })
        it('With a max value', () => {
          expect(ParseProperty('integer max(0)')).to.deep.equal(new SpecProperty('integer', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0))
        })
        it('With a min and max value', () => {
          expect(ParseProperty('integer min(-100) max(0)')).to.deep.equal(new SpecProperty('integer', undefined, undefined, undefined, undefined, undefined, undefined, undefined, -100, 0))
        })
        it('With a list of allowed values', () => {
          expect(ParseProperty('integer allow(0, 1, 2, 3, 4)')).to.deep.equal(new SpecProperty('integer', undefined, undefined, undefined, undefined, undefined, [0, 1, 2, 3, 4]))
        })
        it('With autogenerate options', () => {
          expect(ParseProperty('integer auto(1,1)')).to.deep.equal(new SpecProperty('integer', undefined, undefined, undefined, undefined, new IntegerAutogenerateOptions(1, 1)))
        })

        // Errors
        it('Should throw an error with invalid Auto options', () => {
          expect(() => {ParseProperty('integer auto(1)')}).to.throw(RangeError)
        })
        it('Should throw a TypeError with an invalid default value', () => {
          expect(() => {ParseProperty('integer default("123")')}).to.throw(TypeError)
        })
        it('Should throw a SyntaxError with an empty default value', () => {
          expect(() => {ParseProperty('integer default()')}).to.throw(SyntaxError)
        })

    })
    describe('Boolean', () => {
      it('Basic boolean', () => {
        expect(ParseProperty('boolean')).to.deep.equal(new SpecProperty('boolean'))
      })
      it('With a default value', () => {
        expect(ParseProperty('boolean default(true)')).to.deep.equal(new SpecProperty('boolean', undefined, undefined, undefined, undefined, undefined, undefined, true))
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
