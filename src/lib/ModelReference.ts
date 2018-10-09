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
    public AllowNull: boolean

    constructor(localProperty: string, foreignModel: string, relationType: RelationTypes, allowNull: boolean, proxyModel?: string) {
        this.ForeignModel = foreignModel
        this.AllowNull = allowNull
        this.RelationType = relationType
        this.LocalProperty = localProperty
        this.ProxyModel = proxyModel
    }
}
