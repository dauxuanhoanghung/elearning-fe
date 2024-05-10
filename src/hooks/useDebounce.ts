import { debounce } from "lodash";
import { useCallback } from "react";

type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;

export const useDebounce = <T extends (...args: any[]) => any>(
  fnToDebounce: T,
  durationInMs: number = 100,
): DebouncedFunction<T> => {
  if (isNaN(durationInMs)) {
    throw new TypeError("durationInMs for debounce should be a number");
  }
  if (fnToDebounce == null) {
    throw new TypeError("fnToDebounce cannot be null");
  }
  if (typeof fnToDebounce !== "function") {
    throw new TypeError("fnToDebounce should be a function");
  }

  return useCallback(debounce(fnToDebounce, durationInMs), [
    fnToDebounce,
    durationInMs,
  ]);
};
