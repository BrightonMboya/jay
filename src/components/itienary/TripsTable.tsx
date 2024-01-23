import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

interface Trip {
  id: string;
  name: string;
  date: string;
  accomodation: string;
  description: string;
  basis: string;
  nights: string;
  imgs: string[];
  activities: string[];
}

interface Props {
  trips: Trip[];
}

export function TripsTable({ trips }: Props) {
  return (
    <Table className="mt-10">
      <TableCaption>A summary of where you will be travelling</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead
            className="
        "
          >
            Start Date
          </TableHead>
          <TableHead>Accomodation</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead>Basis</TableHead>
          <TableHead>Nights</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trips.map((trip) => (
          <TableRow key={trip.id}>
            <TableCell className="font-medium">{trip.date}</TableCell>
            <TableCell>{trip.accomodation}</TableCell>
            <TableCell>{trip.name}</TableCell>
            <TableCell className="">{trip.basis}</TableCell>
            <TableCell>{trip.nights}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
