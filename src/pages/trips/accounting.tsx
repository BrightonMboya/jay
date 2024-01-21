import Layout from "~/components/Layout/Layout";
import { useRouter } from "next/router";
import { data } from "~/components/trips/TripsList";

export default function Page() {
  const { query } = useRouter();
  const tripId = query.tripId;
  const trip = data.filter((trip) => trip.id === Number(tripId));
  console.log(trip);
  return (
    <Layout>
      <main>
        <p>{query.tripId}</p>
      </main>
    </Layout>
  );
}
