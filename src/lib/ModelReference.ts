export enum RelationTypes {
    Single,
    Multiple
}


export default class ModelReference {
    public ForeignModel: string
    public ForeignProperty: string
    public RelationType: RelationTypes
    public LocalProperty?: string
    public ProxyModel?: string


    constructor(localProperty: string, foreignModel: string, foreignProperty: string, relationType: RelationTypes, proxyModel?: string) {
        this.ForeignModel = foreignModel
        this.ForeignProperty = foreignProperty
        this.RelationType = relationType
        this.LocalProperty = localProperty
        this.ProxyModel = proxyModel
    }
}