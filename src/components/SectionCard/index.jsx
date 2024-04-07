import React, { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const SectionCard = ({
  orderIndex,
  sectionName,
  children,
  hideExpand = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card>
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
          Section {orderIndex}: {sectionName}
        </Typography>
        {!hideExpand && (
          <IconButton
            onClick={toggleExpansion}
            aria-expanded={isExpanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        )}
      </CardContent>
      {!hideExpand && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <CardContent>{children}</CardContent>
        </Collapse>
      )}
    </Card>
  );
};

export default SectionCard;
