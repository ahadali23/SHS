import React from "react";
import "../styles/loading.css";

const Loading = ({ size = "medium", isVisible }) => {
  let defaultSize = 50;

  switch (size) {
    case "small":
      defaultSize = 30;
      break;
    case "medium":
      defaultSize = 50;
      break;
    case "large":
      defaultSize = 70;
      break;
    default:
      defaultSize = parseInt(size, 10) || 50;
  }

  const bubbleSize = {
    width: `${defaultSize * 0.25}px`,
    height: `${defaultSize * 0.25}px`,
  };

  if (isVisible === false) {
    return null;
  }

  return (
    <div className="loadingContainer">
      <div
        className="loadingBox"
        style={{ width: `${defaultSize}px`, height: `${defaultSize}px` }}
      >
        <div className="bubble bubble-1" style={bubbleSize}></div>
        <div className="bubble bubble-2" style={bubbleSize}></div>
        <div className="bubble bubble-3" style={bubbleSize}></div>
      </div>
    </div>
  );
};

export default Loading;
