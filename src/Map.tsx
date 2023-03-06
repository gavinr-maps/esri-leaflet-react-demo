import { useEffect, useRef } from "react";
import { Map as LeafletMap, Icon, Marker } from "leaflet";
import { FeatureLayer } from "esri-leaflet";
import { vectorBasemapLayer } from "esri-leaflet-vector";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

function Map() {
  const mapRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // debugger;
    const mapRefCurrent = mapRef.current;

    if (mapRefCurrent !== null) {
      // Create a dom node to place the map in, so that cleanup is easier.
      const domNode = document.createElement("div");
      mapRefCurrent.appendChild(domNode);

      // The default icon does not work due to webpack issues
      let DefaultIcon = new Icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconAnchor: [12, 41],
        popupAnchor: [0, -41],
      });
      Marker.prototype.options.icon = DefaultIcon;

      const map = new LeafletMap(domNode);
      map.setView([53.35014, -6.266155], 8);

      // Add a basemap
      vectorBasemapLayer("ArcGIS:Streets", {
        apiKey: import.meta.env.VITE_ARCGIS_API_KEY, // https://developers.arcgis.com
      }).addTo(map);

      // Add a Feature Layer
      const fl = new FeatureLayer({
        url:
          "https://sampleserver6.arcgisonline.com/arcgis/rest/services/SampleWorldCities/MapServer/0",
      }).addTo(map);

      fl.bindPopup(function (layer: any) {
        return `<p><strong>${layer.feature.properties.CITY_NAME
          }</strong><br /> Population: ${layer.feature.properties.POP.toLocaleString("en")}</p>`;
      });
    }

    return () => {
      if (mapRefCurrent) {
        mapRefCurrent.innerHTML = '';
      }
    }
  }, [mapRef]);

  return <div className="map" ref={mapRef}></div>;
}

export default Map;