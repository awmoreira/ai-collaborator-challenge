// Loading.tsx

import React from "react";
import "./styles.css";

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
  return (
    <div className="loading-container">
      <p>{message}</p>
      <div className="loading-spinner" data-testid="loading-spinner"></div>
    </div>
  );
};

export default Loading;
