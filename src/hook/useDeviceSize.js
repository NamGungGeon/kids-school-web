import { useEffect, useState } from "react";

export const useDeviceSize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  useEffect(() => {
    const callback = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", callback);
    return () => {
      window.removeEventListener("resize", callback);
    };
  }, []);

  return [width, height];
};

export const useDeviceType = () => {
  const [width, height] = useDeviceSize();
  const [type, setType] = useState("desktop");
  useEffect(() => {
    if (width > 800) {
      if (type !== "desktop") setType("desktop");
    } else if (width > 500) {
      if (type !== "tablet") setType("tablet");
    } else {
      if (type !== "phone") setType("phone");
    }
  }, [width]);
  useEffect(() => {
    console.log("device type", type, width);
  }, [type]);
  return [type];
};
