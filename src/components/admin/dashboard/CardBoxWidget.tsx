import { Card } from "@/components/ui/card";
import NumberDynamic from "../DynamicNumber";
import PillTagTrend from "../PillTag/Trend";

type Props = {
  number: number;
  numberPrefix?: string;
  numberSuffix?: string;
  icon: any;
  iconColor: any;
  label: string;
  trendLabel?: string;
  trendType?: any;
  trendColor?: any;
};

const CardBoxWidget: React.FC<Props> = (props) => {
  const {
    trendType,
    trendLabel,
    trendColor,
    icon: Icon,
    label,
    number,
    numberSuffix,
    numberPrefix,
  } = props;

  return (
    <Card>
      <div className="flex-1 p-6">
        {trendLabel && trendType && trendColor && (
          <div className="mb-3 flex items-center justify-between">
            <PillTagTrend
              label={trendLabel}
              type={trendType}
              color={trendColor}
              small
            />
          </div>
        )}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg leading-tight text-gray-500 dark:text-slate-400">
              {label}
            </h3>
            <h1 className="text-3xl font-semibold leading-tight">
              <NumberDynamic
                value={number}
                prefix={numberPrefix}
                suffix={numberSuffix}
              />
            </h1>
          </div>
          <div className="h-12">
            <Icon className="h-12" size={40} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CardBoxWidget;
