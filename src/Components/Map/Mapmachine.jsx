import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

const Mapmachine = () => {
  const map = useMap();
  let DefaultIcon = L.icon({
    iconUrl: "/marche.gif",
    iconSize: [90, 90],
  });
  useEffect(() => {
    var marker1 = L.marker([25.3500, 55.4136], { icon: DefaultIcon }).addTo(
      map
    );
    map.on("click", function (e) {
      L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
      L.Routing.control({
        waypoints: [
          L.latLng(25.3500, 55.4136),
          L.latLng(e.latlng.lat, e.latlng.lng),
        ],
        })
        .addTo(map);
    });
  }, []);
  return null;
};

export default Mapmachine;