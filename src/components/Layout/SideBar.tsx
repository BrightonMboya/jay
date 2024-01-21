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

export default function SideBar() {
  const router = useRouter();

  return (
    <section className="fixed font-montserrat">
      <div className="flex w-[150px] flex-col items-center justify-center space-y-7 pt-5 ">
        <Link href="/" className="pl-1">
          <div className="relative h-[60px] w-[60px]">
            <BlurImage
              imageUrl="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D"
              rounded={true}
              preload={false}
            />
          </div>
        </Link>

        {/* <Link href="/ai">
          <div
            className={`flex items-center justify-center space-x-2
              ${
                router.pathname.startsWith("/ai")
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
          >
            <MagicWandIcon width={20} height={20} />

            <h3 className="font-montserrat">Assistant</h3>
          </div>
        </Link> */}

        {/* <Link href="/mails">
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
        </Link> */}
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

        <Button className="fixed bottom-10 w-[150px] ml-10"
        variant="destructive"
        >Log out</Button>
      </div>
    </section>
  );
}
