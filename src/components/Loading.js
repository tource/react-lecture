import React, { useEffect } from "react";

const Loading = () => {
  const LoadingCss = {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    zIndex: 9999,
    background: "rgba(0,0,0,0.5)",
  };

  useEffect(() => {}, []);

  return <div style={LoadingCss}>로딩장면</div>;
};

export default Loading;
