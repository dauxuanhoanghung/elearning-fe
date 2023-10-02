import React from "react";
import { CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999, // Ensure it's on top of other content
        }}
      >
        <CircularProgress color="success" />
      </div>
      {/* Your other content goes here */}
    </div>
  );
};

export default Spinner;
