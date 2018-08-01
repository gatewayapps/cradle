export declare enum RelationTypes {
    Single = 0,
    Multiple = 1
}
export default class ModelReference {
    ForeignModel: string;
    ForeignProperty: string;
    RelationType: RelationTypes;
    LocalProperty: string;
    constructor(localProperty: string, foreignModel: string, foreignProperty: string, relationType: RelationTypes);
}
//# sourceMappingURL=ModelReference.d.ts.map