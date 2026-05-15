import Link from "next/link";

type Props = {
  currentPeriod: string;
};

const periods = [
  {
    label: "7 dias",
    value: "7d",
  },
  {
    label: "30 dias",
    value: "30d",
  },
  {
    label: "90 dias",
    value: "90d",
  },
];

export function PeriodFilter({
  currentPeriod,
}: Props) {
  return (
    <div className="flex gap-2">

      {periods.map((period) => (
        <Link
          key={period.value}
          href={`/dashboard?period=${period.value}`}
          className={`
            rounded-lg
            border
            px-4
            py-2
            text-sm
            transition

            ${currentPeriod ===
              period.value
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
            }
          `}
        >
          {period.label}
        </Link>
      ))}

    </div>
  );
}