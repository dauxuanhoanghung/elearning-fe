import { CircularProgress } from "@mui/material";
import React from "react";

const Spinner = () => {
  return (
    <div>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 
        -translate-y-1/2 flex items-center justify-center z-50"
      >
        <CircularProgress color="success" />
      </div>
    </div>
  );
};

export default Spinner;
