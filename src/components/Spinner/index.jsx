import React from "react";
import { CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transition: "translateX(-50%, -50%)",
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
