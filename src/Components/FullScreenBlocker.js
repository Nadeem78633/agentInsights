import React from "react";
import "./fullScreenBlocker.css"

const FullScreenBlocker = ({ onRetry }) => {
  return (
    <div className="fullscreen-blocker">
      <div className="fullscreen-content">
        <h3>Please enter fullscreen mode to start the quiz</h3>
        <button onClick={onRetry}>Enter Fullscreen</button>
      </div>
    </div>
  );
};

export default FullScreenBlocker;
