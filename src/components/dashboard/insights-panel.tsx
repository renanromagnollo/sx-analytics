type Insight = {
  type: "positive" | "negative" | "info";
  title: string;
  description: string;
};

type Props = {
  insights: Insight[];
};

export function InsightsPanel({ insights }: Props) {
  return (
    <div className="grid gap-4">
      {insights.map((insight, index) => (
        <div
          key={index}
          className="border rounded-xl p-4"
        >
          <p className="font-semibold">
            {insight.title}
          </p>

          <p className="text-sm text-muted-foreground">
            {insight.description}
          </p>
        </div>
      ))}
    </div>
  );
}