import { ReactNode } from "react";

type Props = {
  title: string;

  value: string;

  description: string;

  icon: ReactNode;

  trend?: number;
};

export function KpiCard({
  title,
  value,
  description,
  icon,
  trend,
}: Props) {

  const isPositive =
    trend !== undefined
      ? trend >= 0
      : true;

  return (
    <div
      className="
        rounded-2xl
        border
        bg-card
        p-6
        shadow-sm
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div>

          <p
            className="
              text-sm
              text-muted-foreground
            "
          >
            {title}
          </p>

          <h2
            className="
              mt-2
              text-3xl
              font-bold
            "
          >
            {value}
          </h2>

        </div>

        <div
          className="
            rounded-xl
            border
            p-3
          "
        >
          {icon}
        </div>

      </div>

      <div className="mt-4">

        <p
          className="
            text-sm
            text-muted-foreground
          "
        >
          {description}
        </p>

        {trend !== undefined && (
          <p
            className={`
              mt-2
              text-sm
              font-medium
              ${isPositive
                ? "text-green-600"
                : "text-red-600"
              }
            `}
          >

            {isPositive ? "↑" : "↓"}

            {" "}

            {Math.abs(trend).toFixed(1)}%

            {" "}

            vs período anterior

          </p>
        )}

      </div>

    </div>
  );
}