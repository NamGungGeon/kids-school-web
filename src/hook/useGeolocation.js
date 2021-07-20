import { observable } from "mobx";

const geolocation = observable({
  value: null,
});

const requestUserLocation = () => {
  const { geolocation: requester } = navigator;
  return new Promise((rs, rj) => {
    if (!geolocation) {
      console.log("not supported geolocation");
      rj("지원되지 않는 환경입니다");
      return;
    }

    requester.getCurrentPosition(
      (position) => {
        console.log(position);
        geolocation.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        rs(geolocation.value);
      },
      (error) => {
        console.log("geolocation", error);
        rj("위치 정보를 사용할 수 없습니다");
      }
    );
  });
};
export const useGeolocation = () => {
  const flush = () => {
    geolocation.value = null;
  };
  return [geolocation.value, requestUserLocation, flush];
};
