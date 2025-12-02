export = JSDocNodeTree;
declare class JSDocNodeTree {
    constructor(root: any);
    _root: any;
    getChildrenByTag(node: any, tag: any): any;
    getName(): any;
    getText(): string;
    getMethods(): {
        name: any;
        description: string;
        params: {
            name: any;
            description: string;
            type: {
                name: any;
            };
            optional: boolean;
        }[];
        examples: any;
        returns: {
            description: string;
            type: {
                name: any;
            };
        } | null;
    }[];
    getMethodParams(field: any): {
        name: any;
        description: string;
        type: {
            name: any;
        };
        optional: boolean;
    }[];
    getExamples(field: any): any;
    getReturnValue(field: any): {
        description: string;
        type: {
            name: any;
        };
    } | null;
    getType(typeNode: any): any;
    hasChildren(): number | false;
    _hasArray(node: any, propName: any): number | false;
    _isPrivateMethod(field: any): boolean;
}
//# sourceMappingURL=JSDocNodeTree.d.ts.map