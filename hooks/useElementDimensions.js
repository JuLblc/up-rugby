import { useState, useEffect } from "react";

export const useElementDimensions = (element) => {
  const [elementDimensions, setElementDimensions] = useState({
    elementHeight: undefined,
    elementWidth: undefined,
  });

  useEffect(() => {
    function handleResize() {
      if (element) {
        setElementDimensions({
          elementHeight: element.offsetHeight,
          elementWidth: element.offsetWidth,
        });
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [element]); // Effect is only run on element change

  return elementDimensions;
};
