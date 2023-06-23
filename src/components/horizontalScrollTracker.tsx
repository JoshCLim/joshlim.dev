"use client";

import useWindowScroll from "~/hooks/useWindowScroll";
import useDocumentHeight from "~/hooks/useDocumentSize";
import useWindowSize from "~/hooks/useWindowSize";

const HorizontalScrollTracker = () => {
  const [state] = useWindowScroll();
  const documentHeight = useDocumentHeight();
  const windowSize = useWindowSize();
  const windowHeight = windowSize.height;

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-[#1f1f1f]">
      <div
        className="h-full"
        style={{
          width: `${(state.y / (documentHeight - windowHeight)) * 100}%`,
          background:
            "rgb(2,0,36) linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)",
        }}
      ></div>
    </div>
  );
};

export default HorizontalScrollTracker;
