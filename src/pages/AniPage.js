import React, { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";
const AniPage = () => {
  const BoxWrap = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    background: "yellow",
  };
  const BoxStyle = {
    width: 100,
    height: 100,
    background: "red",
  };

  // JSX 요소 참조하기
  const boxRef = useRef(null);

  const motionA = () => {
    anime({
      targets: boxRef.current,
      left: "240px",
      backgroundColor: "#FFF",
      borderRadius: ["0%", "50%"],
      easing: "easeInOutQuad",
    });
  };
  const motionB = () => {
    anime({
      targets: boxRef.current,
      scale: 10,
      duration: 2000,
      backgroundColor: "#F00",
    });
  };
  const motionC = () => {
    anime({
      targets: boxRef.current,
      scale: 1,
      left: 0,
      duration: 2000,
      backgroundColor: "#F00",
    });
  };

  useEffect(() => {
    const box = boxRef.current;
    anime({
      targets: box,
      translateX: 250,
      rotate: "1turn",
      duration: 5000,
    });
  }, []);

  return (
    <>
      <button
        onClick={() => {
          motionA();
        }}
      >
        효과1
      </button>
      <button
        onClick={() => {
          motionB();
        }}
      >
        효과2
      </button>
      <button
        onClick={() => {
          motionC();
        }}
      >
        효과3
      </button>
      <div style={BoxWrap}>
        <div style={BoxStyle} ref={boxRef}></div>
      </div>
    </>
  );
};

export default AniPage;
