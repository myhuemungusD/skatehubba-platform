import { getMedia } from "../hooks/useMedia.native.js";
function getGroupPropParts(groupProp) {
  var mediaQueries = getMedia(),
    [_, name, part3, part4] = groupProp.split("-"),
    pseudo,
    media = part3 in mediaQueries ? part3 : void 0;
  return media ? pseudo = part4 : pseudo = part3, {
    name,
    pseudo,
    media
  };
}
export { getGroupPropParts };
//# sourceMappingURL=getGroupPropParts.native.js.map
