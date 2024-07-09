import React, { useEffect } from "react";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM";
import Map from "ol/Map";
import { useGeographic } from "ol/proj";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import * as ol from "ol";
import * as geom from "ol/geom";
import { Style, Fill, Stroke } from "ol/style";

useGeographic();

function MapComponent(props: { lat: number; lng: number; zoom: number; children?: React.ReactNode }) {
  const [latitude, setLatitude] = React.useState<number>(props.lat);
  const [longitude, setLongitude] = React.useState<number>(props.lng);

  useEffect(() => {
    const center = [props.lng, props.lat];
    const circle = new ol.Feature(new geom.Circle(center, 0.005));

    const vectorSource = new VectorSource({
      features: [circle],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        fill: new Fill({
          color: "rgba(20, 100, 240, 0.3)",
        }),
        stroke: new Stroke({
          width: 3,
          color: "rgba(0, 100, 240, 0.8)",
        }),
      }),
    });

    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: center,
        zoom: props.zoom,
      }),
    });

    const updateCirclePos = () => {
      const mapSize = map.getSize();
      if (mapSize) {
        const circlePos = map.getCoordinateFromPixel([mapSize[0] / 2, mapSize[1] / 2]);
        circle.getGeometry()?.setCenter(circlePos);
      }
    };

    map.getView().on("change", updateCirclePos);

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }} />;
}

export default MapComponent;
