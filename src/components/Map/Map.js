import React, { useEffect, useState } from "react";
import { useModal } from "../../hook/useModal";
import SchoolInfo from "../../containers/SchoolInfo/SchoolInfo";
import { useToasts } from "../../hook/useToast";
import { useDeviceType } from "../../hook/useDeviceSize";

const Map = ({
  camera = [37.506502, 127.053617],
  markers = [],
  highlight,
  className
}) => {
  const [map, setMap] = useState();
  const [lat, lng] = camera;
  const [ref, setRef] = useState();
  const [markersOnMap, setMarkersOnMap] = useState();
  const [infoWindow, setInfoWindow] = useState();
  const [_, setModal] = useModal();
  const [__, addToast] = useToasts();
  const [deviceType] = useDeviceType();

  useEffect(() => {
    infoWindow?.setMap(null);
    if (markers && map) {
      const bounds = new window.kakao.maps.LatLngBounds();
      markersOnMap?.map(marker => marker.setMap(null));

      const imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      // 마커 이미지의 이미지 크기 입니다
      const imageSize = new window.kakao.maps.Size(24, 35);
      // 마커 이미지를 생성합니다
      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize
      );
      setMarkersOnMap(
        markers
          .filter(latlng => latlng.lat && latlng.lng)
          .map(latlng => {
            const markerPosition = new window.kakao.maps.LatLng(
              latlng.lat,
              latlng.lng
            );
            bounds.extend(markerPosition);
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
              image: latlng.kinderCode === highlight?.kinderCode && markerImage
            });
            if (latlng.kinderCode === highlight?.kinderCode) {
              const infowindowContent = document.createElement("div");
              infowindowContent.style.padding = "8px";
              infowindowContent.style.cursor = "pointer";
              infowindowContent.style.height = "60px";
              infowindowContent.textContent = highlight.kinderName;
              infowindowContent.addEventListener("click", () => {
                setModal(<SchoolInfo kinderCode={highlight.kinderCode} />);
              });
              const infowindow = new window.kakao.maps.InfoWindow({
                position: markerPosition,
                content: infowindowContent
              });
              infowindow.open(map, marker);
              setInfoWindow(infowindow);
            }
            marker.setMap(map);
            return marker;
          })
      );
      if (!highlight) map.setBounds(bounds);
    }
  }, [markers, map, highlight]);
  useEffect(() => {
    if (highlight && map) {
      if (highlight.lat && highlight.lng) {
        // 이동할 위도 경도 위치를 생성합니다
        const moveLatLon = new window.kakao.maps.LatLng(
          highlight.lat,
          highlight.lng
        );
        console.log(highlight, moveLatLon);
        // 지도 중심을 이동 시킵니다
        map.setLevel(3);
        map.panTo(moveLatLon);
      } else {
        addToast(
          "해당 유치원의 위/경도 좌표가 없어 지도에 표시할 수 없습니다",
          "warning"
        );
      }
    }
  }, [highlight, map]);
  useEffect(() => {
    if (ref && !map) {
      const run = () => {
        const id = window.setInterval(() => {
          if (window.kakao) {
            let options = {
              center: new window.kakao.maps.LatLng(lat, lng),
              level: 3
            };

            const map = new window.kakao.maps.Map(ref, options);
            setMap(map);
            console.log(id);
            clearInterval(id);
          }
        }, 500);
      };
      run();
    }
  }, [ref]);
  return (
    <div
      id="map"
      className={className}
      style={{
        width: "100%",
        height: deviceType === "phone" ? "256px" : "500px"
      }}
      ref={setRef}
    />
  );
};

export default Map;
