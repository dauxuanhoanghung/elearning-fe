import { useEffect, useRef, useState } from "react";

export const useTypingEffect = (
  typingText: string,
  interKeyStrokeDurationInMs: number = 100,
): string => {
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const currentPositionRef = useRef<number>(0);

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
