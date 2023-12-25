import Link from "next/link";
import BlurImage from "../ui/BlurImage";
import {
  CubeIcon,
  PersonIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/router";

export default function SideBar() {
  const router = useRouter();

  return (
    <section className="font-montserrat ">
      <div className="flex flex-col items-center justify-center space-y-4 pt-5 ">
        <Link href="/" className="pl-1">
          <div className="relative h-[60px] w-[60px]">
            <BlurImage
              imageUrl="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D"
              rounded={true}
              preload={false}
            />
          </div>
        </Link>

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
      </div>
    </section>
  );
}
