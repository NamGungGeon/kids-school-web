import { useEffect, useRef, React, useState } from "react";

export function usePrevState(state) {
  const ref = useRef(state);
  console.log("ref install", ref.current);
  useEffect(() => {
    console.log("ref", ref.current, state);
    ref.current = state;
  }, [state]);
  return ref.current;
}
