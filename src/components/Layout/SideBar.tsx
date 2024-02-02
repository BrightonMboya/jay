import Link from "next/link";
import BlurImage from "../ui/BlurImage";
import {
  CubeIcon,
  PersonIcon,
  EnvelopeClosedIcon,
  MagicWandIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import Button from "../ui/Button";
import { Plane } from "lucide-react";
import { UserButton, useClerk } from "@clerk/nextjs";

export default function SideBar() {
  const router = useRouter();
  const { signOut } = useClerk();

  return (
    <section className="fixed font-montserrat">
      <div className="flex w-[150px] flex-col items-center justify-center space-y-7 pt-5 ">
        <UserButton
          appearance={{
            variables: {},
          }}
        />

        <Link href="/mails">
          <div
            className={`flex items-center justify-center space-x-2
              ${
                router.pathname.startsWith("/mail")
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
          >
            <EnvelopeClosedIcon width={20} height={20} />

            <h3 className="font-montserrat">Mail</h3>
          </div>
        </Link>
        <Link href="/trips">
          <div
            className={`flex items-center justify-center space-x-2
              ${
                router.pathname.startsWith("/trips")
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
          >
            <PersonIcon width={20} height={20} />

            <h3 className="font-montserrat">Trips</h3>
          </div>
        </Link>

        <Link href="/itienaries">
          <div
            className={`flex items-center justify-center space-x-2
              ${
                router.pathname.startsWith("/itienaries")
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
          >
            <Plane width={20} height={20} />
            <h3 className="font-montserrat">Itienaries</h3>
          </div>
        </Link>

        <Link href="/accounting">
          <div
            className={`flex items-center justify-center space-x-2
              ${
                router.pathname.startsWith("/accounting")
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
          >
            <span>$</span>

            <h3 className="font-montserrat">Accounting</h3>
          </div>
        </Link>

        <Link href="/assets">
          <div
            className={`flex items-center justify-center space-x-2
              ${
                router.pathname.startsWith("/assets")
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
          >
            <CubeIcon width={20} height={20} />

            <h3 className="font-montserrat">Assets</h3>
          </div>
        </Link>

        <Link href="/contacts">
          <div
            className={`flex items-center justify-center space-x-2
              ${
                router.pathname.startsWith("/contacts")
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
          >
            <PersonIcon width={20} height={20} />

            <h3 className="font-montserrat">Contacts</h3>
          </div>
        </Link>

        <Button
          className="fixed bottom-10 ml-10 w-[150px]"
          variant="destructive"
          onClick={() => signOut(() => router.push("/"))}
        >
          Log out
        </Button>
      </div>
    </section>
  );
}
