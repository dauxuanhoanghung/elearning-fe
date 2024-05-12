import { Check, ChevronDown, ChevronUp, Info, ShieldAlert } from "lucide-react";
import PillTag from "./index";

const PillTagTrend: React.FC<{ small: boolean; [props: string]: any }> = ({
  small = false,
  ...props
}) => {
  const trendIcon = {
    up: ChevronUp,
    down: ChevronDown,
    success: Check,
    danger: ShieldAlert,
    warning: ShieldAlert,
    info: Info,
  }[props.type];
  return (
    <PillTag
      label={props.label}
      color={props.color}
      icon={trendIcon}
      small={small}
    />
  );
};

export default PillTagTrend;
