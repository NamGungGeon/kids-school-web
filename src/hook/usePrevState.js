const { useEffect } = require("react");
const { useRef } = require("react");

export function usePrevState(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
