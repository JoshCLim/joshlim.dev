import { useEffect, useState } from "react";

function useDocumentHeight() {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    setHeight(height);
  }, []);

  return height;
}

export default useDocumentHeight;
