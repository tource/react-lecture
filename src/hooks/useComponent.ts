import { useEffect, useState } from "react";

// 화면의 리사이즈를 체크하는 용도의 customHook
// useComponent함수를 실행시 리턴 모양

interface WindowSize {
  width: number;
  height: number;
}

const useComponent = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};
export default useComponent;
