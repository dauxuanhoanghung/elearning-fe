import { useEffect, useRef, useState } from "react";

export const useTypingEffect = (
  typingText,
  interKeyStrokeDurationInMs = 100,
) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const currentPositionRef = useRef(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPosition((value) => value + 1);
      currentPositionRef.current += 1;
      if (currentPositionRef.current > typingText.length) {
        clearInterval(intervalId);
      }
    }, interKeyStrokeDurationInMs);
    return () => {
      clearInterval(intervalId);
      currentPositionRef.current = 0;
      setCurrentPosition(0);
    };
  }, [interKeyStrokeDurationInMs, typingText]);

  return typingText.substring(0, currentPosition);
};
