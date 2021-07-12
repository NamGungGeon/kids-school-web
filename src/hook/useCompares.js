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
  useEffect(() => {
    console.log("sync with localstorage");
    localStorage.setItem("compares", JSON.stringify(observableCompares.value));
  }, [observableCompares.value]);

  const sort = compares => {
    console.log("sort");
    return compares.sort((c1, c2) => {
      if (c1.kinderName > c2.kinderName) return -1;
      else if (c1.kinderName < c2.kinderName) return 1;
      else return 0;
    });
  };
  const addCompare = kinderCode => {
    const compares = toJS(observableCompares.value);
    const newCompares = [...compares].filter(code => kinderCode !== code);
    newCompares.push(kinderCode);
    observableCompares.value = sort(newCompares);
  };
  const removeCompare = kinderCode => {
    const compares = toJS(observableCompares.value);
    const newCompares = [...compares].filter(code => kinderCode !== code);
    observableCompares.value = sort(newCompares);
  };
  return [observableCompares.value, addCompare, removeCompare];
};
