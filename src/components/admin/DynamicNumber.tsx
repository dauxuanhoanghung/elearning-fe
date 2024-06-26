import numeral from "numeral";
import { useEffect, useState } from "react";

const NumberDynamic: React.FC<{
  prefix?: string;
  suffix?: string;
  value: number;
  duration?: number;
}> = ({ prefix = "", suffix = "", value, duration = 500 }) => {
  const [newValue, setNewValue] = useState<number>(0);

  const newValueFormatted =
    newValue < 1000 ? newValue : numeral(newValue).format("0,0");

  const stepDurationMs = 25;

  const timeoutIds = [];

  const grow = (growIncrement) => {
    const incrementedStep = Math.ceil(newValue + growIncrement);

    if (incrementedStep > value) {
      setNewValue(value);
      return false;
    }

    setNewValue(incrementedStep);

    timeoutIds.push(
      setTimeout(() => {
        grow(growIncrement);
      }, stepDurationMs),
    );
  };

  useEffect(() => {
    grow(value / (duration / stepDurationMs));

    return () => {
      timeoutIds.forEach((tid) => {
        clearTimeout(tid);
      });
    };
  });

  return (
    <div>
      {prefix}
      {newValueFormatted}
      {suffix}
    </div>
  );
};

export default NumberDynamic;
