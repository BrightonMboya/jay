import { NoAsset } from "~/components/Assets";

export default function Page() {
  return (
    <main className="pl-5">
    
      <NoAsset
        bigTitle="You haven't added your Guests yet"
        smallTitle="It's easier to manage, and contact your guests. Go ahead and them now"
        c2a="Add Guests"
        c2aUrl="/contacts/new"
      />
    </main>
  );
}
