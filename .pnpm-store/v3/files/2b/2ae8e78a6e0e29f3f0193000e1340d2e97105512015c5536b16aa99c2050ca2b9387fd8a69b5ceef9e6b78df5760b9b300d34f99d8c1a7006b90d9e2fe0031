"use strict";

import { featureCollection, point, feature, lineString

// @ts-expect-error - @turf packages have type resolution issues with package.json exports
} from '@turf/helpers';
// @ts-expect-error - @turf packages have type resolution issues with package.json exports
import distance from '@turf/distance';
// @ts-expect-error - @turf packages have type resolution issues with package.json exports
import along from '@turf/along';
export const makePoint = point;
export const makeLineString = lineString;
export function makeLatLngBounds(northEastCoordinates, southWestCoordinates) {
  return featureCollection([point(northEastCoordinates), point(southWestCoordinates)]);
}
export const makeFeature = feature;
export function makeFeatureCollection(features = [], options) {
  return featureCollection(features, options);
}
export function addToFeatureCollection(newFeatureCollection, newFeature) {
  return {
    ...newFeatureCollection,
    features: [...newFeatureCollection.features, newFeature]
  };
}
export const calculateDistance = distance;
export const pointAlongLine = along;
//# sourceMappingURL=geoUtils.js.map