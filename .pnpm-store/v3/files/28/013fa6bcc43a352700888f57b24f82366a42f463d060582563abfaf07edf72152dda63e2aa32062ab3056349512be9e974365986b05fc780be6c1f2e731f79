"use strict";

export * from "./RNMBXModule.js";
export { Camera, UserTrackingMode } from "./components/Camera.js";
export { Atmosphere } from "./components/Atmosphere.js";
export { default as MapView } from "./components/MapView.js";
export { default as Light } from "./components/Light.js";
export { default as PointAnnotation } from "./components/PointAnnotation.js";
export { default as Annotation } from "./components/Annotation.js";
export { default as Callout } from "./components/Callout.js";
export { default as StyleImport } from "./components/StyleImport.js";
export { default as UserLocation, UserLocationRenderMode } from "./components/UserLocation.js";
export { default as LocationPuck } from "./components/LocationPuck.js";
export { default as VectorSource } from "./components/VectorSource.js";
export { ShapeSource } from "./components/ShapeSource.js";
export { default as RasterSource } from "./components/RasterSource.js";
export { default as RasterDemSource } from "./components/RasterDemSource.js";
export { default as ImageSource } from "./components/ImageSource.js";
export { Viewport } from "./components/Viewport.js";
export { default as Models } from "./components/Models.js";
export { default as Images } from "./components/Images.js";
export { default as Image } from "./components/Image.js";
export { default as FillLayer } from "./components/FillLayer.js";
export { default as FillExtrusionLayer } from "./components/FillExtrusionLayer.js";
export { default as HeatmapLayer } from "./components/HeatmapLayer.js";
export { default as LineLayer } from "./components/LineLayer.js";
export { default as CircleLayer } from "./components/CircleLayer.js";
export { default as SkyLayer } from "./components/SkyLayer.js";
export { default as ModelLayer } from "./components/ModelLayer.js";
export { SymbolLayer } from "./components/SymbolLayer.js";
export { default as RasterLayer } from "./components/RasterLayer.js";
export { default as BackgroundLayer } from "./components/BackgroundLayer.js";
export { default as CustomLocationProvider } from "./components/CustomLocationProvider.js";
export { Terrain } from "./components/Terrain.js";
export { default as locationManager } from "./modules/location/locationManager.js";
export { default as offlineManager, OfflineCreatePackOptions } from "./modules/offline/offlineManager.js";
export { default as offlineManagerLegacy } from "./modules/offline/offlineManagerLegacy.js";
export { default as TileStore } from "./modules/offline/TileStore.js";
export { default as snapshotManager } from "./modules/snapshot/snapshotManager.js";
export { default as MarkerView } from "./components/MarkerView.js";
export { default as Animated } from "./utils/animated/Animated.js";
export { AnimatedCoordinatesArray, AnimatedExtractCoordinateFromArray, AnimatedPoint, AnimatedRouteCoordinatesArray, AnimatedShape } from "./classes/index.js";
export { default as Style } from "./components/Style.js";
export { default as Logger } from "./utils/Logger.js";
export { requestAndroidLocationPermissions } from "./requestAndroidLocationPermissions.js";
export { getAnnotationsLayerID } from "./utils/getAnnotationsLayerID.js";
import { deprecatedClass } from "./utils/deprecation.js";
import { AnimatedPoint } from "./classes/index.js";
import { UserTrackingMode } from "./components/Camera.js";
import MovePointShapeAnimator from "./shapeAnimators/MovePointShapeAnimator.js";
import ChangeLineOffsetsShapeAnimator from "./shapeAnimators/ChangeLineOffsetsShapeAnimator.js";
import LocationPuck from "./components/LocationPuck.js";

/** @deprecated This will be removed in a future release. Use `AnimatedPoint` instead. */

export const AnimatedMapPoint = deprecatedClass(AnimatedPoint, 'AnimatedMapPoint is deprecated please use AnimatedPoint');

/** @deprecated NativeUserLocation will be removed in future release. Use `LocationPuck` instead. */
export const NativeUserLocation = LocationPuck;

// types:
export let StyleURL = /*#__PURE__*/function (StyleURL) {
  StyleURL["Street"] = "mapbox://styles/mapbox/streets-v11";
  StyleURL["Dark"] = "mapbox://styles/mapbox/dark-v10";
  StyleURL["Light"] = "mapbox://styles/mapbox/light-v10";
  StyleURL["Outdoors"] = "mapbox://styles/mapbox/outdoors-v11";
  StyleURL["Satellite"] = "mapbox://styles/mapbox/satellite-v9";
  StyleURL["SatelliteStreet"] = "mapbox://styles/mapbox/satellite-streets-v11";
  StyleURL["TrafficDay"] = "mapbox://styles/mapbox/navigation-preview-day-v4";
  StyleURL["TrafficNight"] = "mapbox://styles/mapbox/navigation-preview-night-v4";
  return StyleURL;
}({});

/** @deprecated UserTrackingModes is deprecated use UserTrackingMode */
export const UserTrackingModes = UserTrackingMode;

/** @experimental */

export const __experimental = {
  MovePointShapeAnimator,
  ChangeLineOffsetsShapeAnimator
};
//# sourceMappingURL=Mapbox.native.js.map