import { TripsTable } from "./TripsTable";
import { serengetiItienary } from "./data";
import Image from "next/legacy/image";

export default function ItienaryPage() {
  return (
    <main>
      <section>
        <div className="relative h-screen">
          <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-start justify-center bg-zinc-900/80 text-white">
            <img
              src={serengetiItienary.backGroundUrl}
              className="absolute left-0 right-0 top-0 -z-50 h-screen w-screen object-cover opacity-80"
            />
            <div className="container text-center">
              <p className="text-xl">{serengetiItienary.guestName}</p>
              <h1 className="pt-7 text-5xl">
                {serengetiItienary.itienaryName}
              </h1>
              <p className="pt-5">{`${serengetiItienary.numberOfDays} Days / ${serengetiItienary.numberOfNights} Nights`}</p>

              <div className="mt-5 flex items-center justify-center space-x-5">
                {serengetiItienary.destinations.map((item) => (
                  <p className="text-lg">{item.name}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl">
          <p className="text-4xl text-primary">Introduction</p>
          <p className="pt-5 tracking-wide text-slate-500">
            {serengetiItienary.intro}
          </p>

          <p className="pt-10 text-4xl text-primary">Trip Summary</p>
          <TripsTable trips={serengetiItienary.destinations} />
        </div>
      </section>
    </main>
  );
}
