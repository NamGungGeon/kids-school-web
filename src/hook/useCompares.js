import { observable, toJS } from "mobx";
import { useEffect, useState } from "react";

const initValue = (() => {
  try {
    const compares = JSON.parse(localStorage.getItem("compares"));
    if (Array.isArray(compares)) return compares;
  } catch (e) {
    console.error(e);
    localStorage.clear();
  }
  return [];
})();
const observableCompares = observable({ value: initValue });

export const useCompares = () => {
  const [compares, setCompares] = useState(observableCompares.value);
  useEffect(() => {
    console.log("compares", compares);
    if (compares) {
      localStorage.setItem("compares", JSON.stringify(compares));
    }
    observableCompares.value = compares;
  }, [compares]);

  const addCompare = kinderCode => {
    const newCompares = [...compares].filter(code => kinderCode !== code);
    newCompares.push(kinderCode);
    setCompares(newCompares);
  };
  const removeCompare = kinderCode => {
    const newCompares = [...compares].filter(code => kinderCode !== code);
    setCompares(newCompares);
  };
  return [compares, addCompare, removeCompare];
};
