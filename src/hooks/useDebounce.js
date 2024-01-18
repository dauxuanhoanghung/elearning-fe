import { debounce } from "lodash";
import { useCallback } from "react";

export const useDebounce = (fnToDebounce, durationInMs = 100) => {
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
