"use strict";

import React from 'react';
import { NativeModules } from 'react-native';
import RNMBXFillExtrusionLayerNativeComponent from '../specs/RNMBXFillExtrusionLayerNativeComponent';
import AbstractLayer from "./AbstractLayer.js";
import { jsx as _jsx } from "react/jsx-runtime";
const Mapbox = NativeModules.RNMBXModule;
/**
 * FillExtrusionLayer is a style layer that renders one or more 3D extruded polygons on the map.
 */
class FillExtrusionLayer extends AbstractLayer {
  static defaultProps = {
    sourceID: Mapbox.StyleSource.DefaultSourceID
  };
  render() {
    const props = {
      ...this.props,
      ...this.baseProps,
      sourceLayerID: this.props.sourceLayerID
    };
    return (
      /*#__PURE__*/
      // @ts-expect-error just codegen stuff
      _jsx(RNMBXFillExtrusionLayerNativeComponent, {
        ref: this.setNativeLayer,
        ...props
      })
    );
  }
}
export default FillExtrusionLayer;
//# sourceMappingURL=FillExtrusionLayer.js.map