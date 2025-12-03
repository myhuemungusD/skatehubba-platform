export const __esModule: boolean;
/**
 * Merge the contents of two files together and add a generated header.
 *
 * @param src contents of the original file
 * @param newSrc new contents to merge into the original file
 * @param identifier used to update and remove merges
 * @param anchor regex to where the merge should begin
 * @param offset line offset to start merging at (<1 for behind the anchor)
 * @param comment comment style `//` or `#`
 */
export function mergeContents({ src, newSrc, tag, anchor, offset, comment, }: {
    src: any;
    newSrc: any;
    tag: any;
    anchor: any;
    offset: any;
    comment: any;
}): {
    contents: any;
    didMerge: boolean;
    didClear: boolean;
};
export function removeContents({ src, tag, }: {
    src: any;
    tag: any;
}): {
    contents: any;
    didMerge: boolean;
    didClear: boolean;
};
/**
 * Removes the generated section from a file, returns null when nothing can be removed.
 * This sways heavily towards not removing lines unless it's certain that modifications were not made manually.
 *
 * @param src
 */
export function removeGeneratedContents(src: any, tag: any): any;
export function createGeneratedHeaderComment(contents: any, tag: any, comment: any): string;
export function createHash(src: any): string;
//# sourceMappingURL=generateCode.d.ts.map