import React, { useEffect, useState } from "react";

const Map = ({ camera = [37.506502, 127.053617], markers = [] }) => {
  const [map, setMap] = useState();
  const [lat, lng] = camera;
  useEffect(() => {
    if (map) {
      const markerPosition = new window.kakao.maps.LatLng(
        37.506502,
        127.053617
      );
      const marker = new window.kakao.maps.Marker({
        position: markerPosition
      });
      marker.setMap(map);
    }
    console.log(process.env);
  }, [map]);
  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "500px"
      }}
      ref={ref => {
        const run = () => {
          const id = window.setInterval(() => {
            if (window.kakao) {
              let options = {
                center: new window.kakao.maps.LatLng(lat, lng),
                level: 7
              };

              const map = new window.kakao.maps.Map(ref, options);
              setMap(map);
              clearInterval(id);
            }
          }, 500);
        };
        if (!map) {
          run();
        }
      }}
    />
  );
};

export default Map;
