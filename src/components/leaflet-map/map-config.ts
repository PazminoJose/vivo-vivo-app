import { CSSProperties } from "react";
import { MapContainerProps, TileLayerProps } from "react-leaflet";

export const LEAFLET_CLASSES = {
  POSITION: {
    bottomleft: "leaflet-bottom leaflet-left",
    bottomright: "leaflet-bottom leaflet-right",
    topleft: "leaflet-top leaflet-left",
    topright: "leaflet-top leaflet-right"
  },
  CONTROL: "leaflet-control"
};

const mapStyle: CSSProperties = {
  height: "100%",
  zIndex: 0,
  borderRadius: "1rem",
  position: "relative"
};

export interface MapConfig {
  container: MapContainerProps;
  tile: TileLayerProps;
}

export const mapConfig: MapConfig = {
  container: {
    center: [0.350139, -78.12512],
    zoom: 13,
    maxZoom: 20,

    style: mapStyle
  },
  tile: {
    maxZoom: 20,
    maxNativeZoom: 19,
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  }
};
