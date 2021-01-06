// @refresh reset
import { useEffect, useRef } from "react";
import { Map as LeafletMap } from "leaflet";
import { VERSION, BasemapLayer } from "esri-leaflet";

function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    // debugger;
    if (mapRef.current !== null) {
      console.log("esri-leaflet version", VERSION);
      const map = new LeafletMap(mapRef.current);
      map.setView([53.35014, -6.266155], 10);
      const basemap = new BasemapLayer("Streets");
      map.addLayer(basemap);
    }
  }, [mapRef]);

  return <div className="map" ref={mapRef}></div>;
}

export default Map;
