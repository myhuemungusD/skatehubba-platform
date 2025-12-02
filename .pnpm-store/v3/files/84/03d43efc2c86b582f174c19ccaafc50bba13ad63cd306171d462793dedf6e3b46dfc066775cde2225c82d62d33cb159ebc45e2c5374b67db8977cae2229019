import 'mapbox-gl/dist/mapbox-gl.css';
import Camera from './components/Camera';
import MapView from './components/MapView';
import MarkerView from './components/MarkerView';
import Logger from './utils/Logger';
declare const Mapbox: {
    Camera: typeof Camera;
    MapView: typeof MapView;
    Logger: typeof Logger;
    MarkerView: import("react").NamedExoticComponent<{
        coordinate: [number, number];
        children?: import("react").ReactElement;
    } & import("react").RefAttributes<import("mapbox-gl").Marker>>;
    LineJoin: {
        Bevel: string;
        Round: string;
        Miter: string;
    };
    StyleURL: {
        Street: string;
        Satellite: string;
    };
    setAccessToken: (token: string) => void;
};
export { Camera, Logger, MapView, MarkerView };
export * from './MapboxModule';
export default Mapbox;
//# sourceMappingURL=index.d.ts.map