import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

const SectionCard = ({
  orderIndex,
  sectionName,
  children,
  hideIcon = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card>
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">
          Section {orderIndex}: {sectionName}
        </Typography>
        {!hideIcon && (
          <IconButton
            onClick={toggleExpansion}
            aria-expanded={isExpanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        )}
      </CardContent>
      {!hideIcon && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <CardContent>{children}</CardContent>
        </Collapse>
      )}
    </Card>
  );
};

export default SectionCard;
