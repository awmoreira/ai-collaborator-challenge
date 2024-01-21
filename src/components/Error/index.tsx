import React from "react";
import "./styles.css";

interface ErrorProps {
  message: string | undefined;
}

const ErrorComponent: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="error-container">
      <p className="error-message">{message}</p>
    </div>
  );
};

export default ErrorComponent;
