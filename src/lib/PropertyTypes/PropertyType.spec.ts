import {expect} from 'chai'
import 'mocha'
import PropertyType from "./PropertyType";
import * as TypeMoq from 'typemoq'
import constants from "./constants";


class MockPropertyType extends PropertyType {
  constructor () {
    super(constants.Object)
  }
}
const mock: TypeMoq.IMock<PropertyType> = TypeMoq.Mock.ofType(MockPropertyType)

describe('PropertyType', ()=>{
  it('Should return a new PropertyType with the correct type name', ()=>{
    expect(mock.object.TypeName).to.equal(constants.Object)
  })
  it('Should not allow a PropertyType to be created with an unknown type name', ()=>{
    mock.callBase.
  })
})