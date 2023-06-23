import React from "react";

const useWindowScroll: () => [
  { x: number; y: number },
  (...args: unknown[]) => void
] = () => {
  const [state, setState] = React.useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });

  const scrollTo = React.useCallback((...args: unknown[]) => {
    if (typeof args[0] === "object") {
      window.scrollTo(args[0] as ScrollToOptions);
    } else if (typeof args[0] === "number" && typeof args[1] === "number") {
      window.scrollTo(args[0], args[1]);
    } else {
      throw new Error(
        `Invalid arguments passed to scrollTo. See here for more info. https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo`
      );
    }
  }, []);

  React.useLayoutEffect(() => {
    const handleScroll = () => {
      setState({ x: window.pageXOffset, y: window.pageYOffset });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return [state, scrollTo];
};

export default useWindowScroll;
