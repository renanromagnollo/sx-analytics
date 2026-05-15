type Props = {
  data: {
    serviceId: string;

    serviceName: string;

    totalRevenue: number;

    totalAttendances: number;

    averageTicket: number;
  }[];
};

export function ServicesRanking({
  data,
}: Props) {
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

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Serviços Mais Relevantes
        </h2>

        <p className="text-sm text-muted-foreground">
          Performance financeira dos serviços.
        </p>

      </div>

      <div className="space-y-4">

        {data.map((service) => (
          <div
            key={service.serviceId}
            className="
              flex
              items-center
              justify-between
              border-b
              pb-4
            "
          >

            <div>

              <h3 className="font-medium">
                {service.serviceName}
              </h3>

              <p
                className="
                  text-sm
                  text-muted-foreground
                "
              >
                {
                  service.totalAttendances
                } atendimentos
              </p>

            </div>

            <div className="text-right">

              <p className="font-semibold">
                R${" "}
                {Number(
                  service.totalRevenue
                ).toFixed(2)}
              </p>

              <p
                className="
                  text-sm
                  text-muted-foreground
                "
              >
                Ticket médio: R${" "}
                {Number(
                  service.averageTicket
                ).toFixed(2)}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}