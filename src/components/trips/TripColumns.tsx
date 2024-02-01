import Link from "next/link";
import { type TripSchemaType } from "~/pages/trips/new";
import {
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuLabel,
} from "~/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Checkbox } from "~/components/ui/checkbox";
import Button from "~/components/ui/Button";
import { z } from "zod";

const newSchema = z.object({
  id: z.number(),
});
type TripId = z.infer<typeof newSchema>;
type extendedTripType = TripSchemaType | TripId;

export const columns: ColumnDef<extendedTripType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "guestName",
    header: "Guest Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("guestName")}</div>
    ),
  },
  {
    accessorKey: "tripType",
    header: "Trip Type",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("tripType")}</div>
    ),
  },
  {
    accessorKey: "noOfDays",
    header: "Duration",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("noOfDays")}</div>
    ),
  },
  {
    accessorKey: "dateBooked",
    header: "Date Booked",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("dateBooked")}</div>
    ),
  },
  {
    accessorKey: "arrivalDate",
    header: "Arrival Date",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("arrivalDate")}</div>
    ),
  },
  {
    accessorKey: "departureDate",
    header: "Date of Departure",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("departureDate")}</div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const trip = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white font-montserrat">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem className="cursor-pointer">
              View Operations
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Link
                href={{
                  pathname: "/trips/reservations",
                  query: { tripId: trip.id },
                }}
              >
                View Reservations
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              View Customer Experience
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Link
                href={{
                  pathname: "/trips/accounting",
                  query: { tripId: trip.id },
                }}
              >
                View Accounting
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
