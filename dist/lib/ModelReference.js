"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RelationTypes;
(function (RelationTypes) {
    RelationTypes[RelationTypes["Single"] = 0] = "Single";
    RelationTypes[RelationTypes["Multiple"] = 1] = "Multiple";
})(RelationTypes = exports.RelationTypes || (exports.RelationTypes = {}));
class ModelReference {
    constructor(localProperty, foreignModel, foreignProperty, relationType) {
        this.ForeignModel = foreignModel;
        this.ForeignProperty = foreignProperty;
        this.RelationType = relationType;
        this.LocalProperty = localProperty;
    }
}
exports.default = ModelReference;
//# sourceMappingURL=ModelReference.js.map