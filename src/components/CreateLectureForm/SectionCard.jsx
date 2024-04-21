import React, { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    <>
      <Accordion type="multiple" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
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
    </>
  );
};

export default SectionCard;
