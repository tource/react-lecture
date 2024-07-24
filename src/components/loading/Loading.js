import React from "react";
import { MoonLoader } from "react-spinners";

const Loading = () => {
  const LoadingCss = {
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  };
  return (
    <div style={LoadingCss}>
      <MoonLoader size={60} speedMultiplier={0.5} />
    </div>
  );
};

export default Loading;
