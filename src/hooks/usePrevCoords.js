import { useRef, useEffect } from "react";
const usePrevCoords = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
export default usePrevCoords;
