import LoaderOptions from './LoaderOptions'

import {expect} from 'chai'
import 'mocha'
import InvalidConsoleError from './Errors/InvalidConsoleError'

describe('LoaderOptions constructor', () => {
    it('Should create a new LoaderOptions instance when passed arguments and a console', () => {
      const options = new LoaderOptions('', console)
      expect(options).to.deep.equal({args: '', console})
    })
    it('Should throw an InvalidConsoleError when it receives a console that does not implement IConsole', () => {
        expect( () => {const options = new LoaderOptions('', {})}).to.throw(InvalidConsoleError)
    })
})
