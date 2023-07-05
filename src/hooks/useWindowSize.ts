import React from "react";

const useWindowSize: () => { width: number; height: number } = () => {
  const [size, setSize] = React.useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  React.useLayoutEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
};

export default useWindowSize;
