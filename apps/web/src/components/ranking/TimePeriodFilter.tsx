import { ToggleGroup, ToggleGroupItem } from "@repo/ui/components/toggle-group";
import { cn } from "@repo/ui/utils";

interface TimePeriodFilterProps {
  activePeriod: string;
  onPeriodChange: (period: string) => void;
}

export const TimePeriodFilter = ({
  activePeriod,
  onPeriodChange,
}: TimePeriodFilterProps) => {
  const periods = ["Diario", "Semanal", "Mensual"];

  return (
    <div className="flex justify-center mb-8 bg-white rounded-xl">
      <ToggleGroup
        type="single"
        onValueChange={onPeriodChange}
        className="bg-transparent rounded-xl p-1 flex items-center justify-center"
      >
        {periods.map((period) => (
          <ToggleGroupItem
            key={period}
            value={period}
            aria-label={`Toggle ${period}`}
            className={cn(
              "flex-1 px-2 sm:px-4 md:px-8 py-2 !rounded-xl font-medium transition-all duration-200 text-sm sm:text-base",
              activePeriod === period
                ? "!bg-red-500 !text-white shadow-lg font-semibold"
                : "text-gray-600 hover:text-gray-800",
            )}
          >
            {period}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
