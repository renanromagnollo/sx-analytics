type Props = {
  data: {
    professionalId: string;

    professionalName: string;

    totalRevenue: number;

    totalAttendances: number;

    averageTicket: number;
  }[];
};

export function ProfessionalsRanking({
  data,
}: Props) {
  return (
    <div className="border rounded-xl p-6">

      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Ranking de Profissionais
        </h2>

        <p className="text-sm text-muted-foreground">
          Performance financeira dos profissionais.
        </p>
      </div>

      <div className="space-y-4">

        {data.map((professional) => (
          <div
            key={professional.professionalId}
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
                {professional.professionalName}
              </h3>

              <p className="text-sm text-muted-foreground">
                {
                  professional.totalAttendances
                } atendimentos
              </p>
            </div>

            <div className="text-right">

              <p className="font-semibold">
                R${" "}
                {Number(
                  professional.totalRevenue
                ).toFixed(2)}
              </p>

              <p className="text-sm text-muted-foreground">
                Ticket médio: R${" "}
                {Number(
                  professional.averageTicket
                ).toFixed(2)}
              </p>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}