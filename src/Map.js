// @refresh reset
import { useEffect, useRef } from "react";
import { Map as LeafletMap, Icon, Marker } from "leaflet";
import { VERSION, BasemapLayer, FeatureLayer } from "esri-leaflet";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    // debugger;
    if (mapRef.current !== null) {
      console.log("esri-leaflet version", VERSION);

      // The default icon does not work due to webpack issues
      let DefaultIcon = new Icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconAnchor: [12, 41],
        popupAnchor: [0, -41],
      });
      Marker.prototype.options.icon = DefaultIcon;

      const map = new LeafletMap(mapRef.current);
      map.setView([53.35014, -6.266155], 8);

      // Add a basemap
      const basemap = new BasemapLayer("Streets");
      map.addLayer(basemap);

      // Add a Feature Layer
      const fl = new FeatureLayer({
        url:
          "https://sampleserver6.arcgisonline.com/arcgis/rest/services/SampleWorldCities/MapServer/0",
      }).addTo(map);

      fl.bindPopup(function (layer) {
        return `<p><strong>${
          layer.feature.properties.CITY_NAME
        }</strong><br /> Population: ${layer.feature.properties.POP.toLocaleString("en")}</p>`;
      });
    }
  }, [mapRef]);

  return <div className="map" ref={mapRef}></div>;
}

export default Map;
