import constants from './constants'
import PropertyType from './PropertyType'

export default class ObjectPropertyType extends PropertyType {

    public Members: {[name: string]: PropertyType} = {}

    constructor(members: Array<{propertyName: string, propertyType: PropertyType}>, allowNull: boolean = false, isPrimaryKey: boolean = false, defaultValue?: any) {
        super(constants.Object, allowNull, isPrimaryKey, defaultValue, false)
        for (let i = 0; i < members.length; i++) {
            this.Members[members[i].propertyName] = members[i].propertyType
        }

    }

    public toString(): string {
        const stringParts: string[] = []
        const memberKeys = Object.keys(this.Members)
        memberKeys.map((k) => {
            stringParts.push(`${k}: ${this.Members[k]}`)
        })
        return stringParts.join('\n')
    }
}
