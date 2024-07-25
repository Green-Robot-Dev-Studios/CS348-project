import * as ol from "ol";
import Map from "ol/Map";
import View from "ol/View.js";
import { defaults as defaultControls } from "ol/control";
import { defaults as defaultInteractions, DragPan } from "ol/interaction";
import * as geom from "ol/geom";
import TileLayer from "ol/layer/Tile.js";
import VectorLayer from "ol/layer/Vector";
import "ol/ol.css";
import { METERS_PER_UNIT, useGeographic } from "ol/proj";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import { useEffect } from "react";

useGeographic();

interface MapComponentProps {
  lat: number;
  setLat: (lat: number) => void;
  lng: number;
  setLng: (lng: number) => void;
  maxDistance: number;
}

const circle = new ol.Feature(new geom.Circle([0, 0], 0.005));
const vectorSource = new VectorSource({ features: [circle] });

let map: Map;

function MapComponent({ lat, setLat, lng, setLng, maxDistance }: MapComponentProps) {
  useEffect(() => {
    const center = [lng, lat];

    const vectorLayer = new VectorLayer({
      updateWhileInteracting: true,
      source: vectorSource,
      style: new Style({
        fill: new Fill({ color: "rgba(20, 100, 240, 0.3)" }),
        stroke: new Stroke({ width: 3, color: "rgba(0, 100, 240, 0.8)" }),
      }),
    });

    map = new Map({
      target: "map",
      layers: [new TileLayer({ source: new OSM() }), vectorLayer],
      view: new View({ center, zoom: 14 }),
      controls: defaultControls({ attribution: false }),
      interactions: defaultInteractions({ dragPan: false, }).extend([new DragPan()]),
    });

    const updateLngLat = () => {
      const mapSize = map.getSize();
      if (mapSize) {
        const circlePos = map.getCoordinateFromPixel([mapSize[0] / 2, mapSize[1] / 2]);
        setLng(circlePos[0]);
        setLat(circlePos[1]);
      }
    };

    map.on("pointerdrag", updateLngLat);

    return () => {
      map.setTarget(undefined);
      map.un("pointerdrag", updateLngLat);
    };
  }, []);

  useEffect(() => {
    circle.getGeometry()?.setCenter([lng, lat]);
    map.getView().setCenter([lng, lat]);
  }, [lat, lng]);

  useEffect(() => {
    circle.getGeometry()?.setRadius(maxDistance / METERS_PER_UNIT.degrees);
    const extent = circle.getGeometry()?.getExtent();
    if (!extent) return;
    try {
      map.getView()?.fit(extent, { padding: [10, 10, 10, 10] });
    } catch (error) {
      console.error(error);
    }
  }, [maxDistance]);

  return <div id="map" className="flex h-96 w-full flex-col overflow-clip rounded-md" />;
}

export default MapComponent;
