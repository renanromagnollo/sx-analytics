export function Header() {
  return (
    <header
      className="
        border-b
        px-8
        py-4
        bg-background
      "
    >
      <div className="flex items-center justify-between">

        <div>
          <h2 className="font-semibold">
            Dashboard
          </h2>

          <p className="text-sm text-muted-foreground">
            Inteligência operacional
          </p>
        </div>

        <div
          className="
            h-10
            w-10
            rounded-full
            bg-muted
          "
        />

      </div>
    </header>
  );
}