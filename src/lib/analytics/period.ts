export function getPeriodStartDate(
  period: string
) {
  const now = new Date();

  switch (period) {
    case "7d":
      return new Date(
        now.setDate(now.getDate() - 7)
      );

    case "30d":
      return new Date(
        now.setDate(now.getDate() - 30)
      );

    case "90d":
      return new Date(
        now.setDate(now.getDate() - 90)
      );

    default:
      return new Date(
        now.setDate(now.getDate() - 30)
      );
  }
}