import Button from "~/components/ui/Button";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex w-[1000px] items-center justify-between pt-[40px] ">
      <h3 className="text-3xl font-medium ">Guests at Tazama</h3>
      <div className="flex items-center gap-2">
        <Link href="/contacts/guests">
          <Button variant="ghost">View Guests</Button>
        </Link>
        <Link href="/contacts/new">
          <Button>New Asset</Button>
        </Link>
      </div>
    </div>
  );
}
