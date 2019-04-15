import { expect } from 'chai'
import 'mocha'
import BooleanPropertyType from '../PropertyTypes/BooleanPropertyType'
import PropertyType from '../PropertyTypes/PropertyType'
import StringPropertyType from '../PropertyTypes/StringPropertyType'
import SpecEmitter from './SpecEmitter'

const emitter = new SpecEmitter({ outputPath: '', overwriteExisting: true }, console)

describe('SpecEmitter', () => {
  describe('generatePropertySpec', () => {
    it('Should return boolean', () => {
      expect(
        emitter.generatePropertySpec(new BooleanPropertyType({ DefaultValue: undefined }))
      ).to.equal('boolean')
    })
    it('Should return boolean default(false) from false', () => {
      expect(
        emitter.generatePropertySpec(new BooleanPropertyType({ DefaultValue: false }))
      ).to.equal('boolean default(false)')
    })
    it('Should return boolean default(false) from 0', () => {
      expect(emitter.generatePropertySpec(new BooleanPropertyType({ DefaultValue: 0 }))).to.equal(
        'boolean default(false)'
      )
    })
    it('Should return boolean default(true) from true', () => {
      expect(
        emitter.generatePropertySpec(new BooleanPropertyType({ DefaultValue: true }))
      ).to.equal('boolean default(true)')
    })
    it('Should return boolean default(true) from 1', () => {
      expect(emitter.generatePropertySpec(new BooleanPropertyType({ DefaultValue: 1 }))).to.equal(
        'boolean default(true)'
      )
    })
    it('Should return string default("")', () => {
      expect(emitter.generatePropertySpec(new StringPropertyType({ DefaultValue: '' }))).to.equal(
        'string default("")'
      )
    })
  })
})
