export enum RelationTypes {
    Single,
    SingleOn,
    Multiple,
    MultipleVia
}

export default class ModelReference {
    public ForeignModel: string
    public RelationType: RelationTypes
    public LocalProperty?: string
    public ProxyModel?: string

    constructor(localProperty: string, foreignModel: string, relationType: RelationTypes, proxyModel?: string) {
        this.ForeignModel = foreignModel
        this.RelationType = relationType
        this.LocalProperty = localProperty
        this.ProxyModel = proxyModel
    }
}
