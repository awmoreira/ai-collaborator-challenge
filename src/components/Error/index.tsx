import React, { useEffect, useState } from "react";
import "./styles.css"

interface ErrorProps {
  message: string | undefined;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return isVisible && <div className="error-message">{message}</div>;
};

export default Error;
