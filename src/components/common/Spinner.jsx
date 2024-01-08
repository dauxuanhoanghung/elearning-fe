import { CircularProgress } from "@mui/material";
import React from "react";

const Spinner = () => {
  return (
    <div>
      <div
        className="absolute left-1/2 top-1/2 z-50 flex 
        -translate-x-1/2 -translate-y-1/2 transform items-center justify-center"
      >
        <CircularProgress color="success" />
      </div>
    </div>
  );
};

export default Spinner;
