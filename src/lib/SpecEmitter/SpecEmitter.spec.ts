import {expect} from 'chai'
import 'mocha'
import BooleanPropertyType from '../PropertyTypes/BooleanPropertyType'
import PropertyType from '../PropertyTypes/PropertyType'
import SpecEmitter from './SpecEmitter'

const emitter = new SpecEmitter()

describe('SpecEmitter', () => {
  describe('generatePropertySpec', () => {
      it('Should return a PropertyType with a type name of Boolean and a default value', () => {
        expect(emitter.generatePropertySpec(new BooleanPropertyType(undefined, undefined, 0))).to.equal('boolean default(false)')
      })
  })
})
