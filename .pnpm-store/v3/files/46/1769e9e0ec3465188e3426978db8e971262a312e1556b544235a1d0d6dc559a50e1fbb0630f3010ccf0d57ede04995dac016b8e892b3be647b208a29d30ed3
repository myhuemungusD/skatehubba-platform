"use strict";

import React from 'react';
import { NativeModules } from 'react-native';
import RNMBXBackgroundLayerNativeComponent from '../specs/RNMBXBackgroundLayerNativeComponent';
import AbstractLayer from "./AbstractLayer.js";
import { jsx as _jsx } from "react/jsx-runtime";
const Mapbox = NativeModules.RNMBXModule;
class BackgroundLayer extends AbstractLayer {
  static defaultProps = {
    sourceID: Mapbox.StyleSource.DefaultSourceID
  };
  render() {
    const props = {
      ...this.baseProps,
      sourceLayerID: this.props.sourceLayerID
    };
    return (
      /*#__PURE__*/
      // @ts-expect-error just codegen stuff
      _jsx(RNMBXBackgroundLayerNativeComponent, {
        ref: this.setNativeLayer,
        ...props
      })
    );
  }
}
export default BackgroundLayer;
//# sourceMappingURL=BackgroundLayer.js.map