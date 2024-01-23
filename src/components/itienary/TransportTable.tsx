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

interface Transport {
  id: string;
  date: string;
  company: string;
  pickup: string;
  dropOff: string;
  type: string;
}

interface Props {
  transport: Transport[];
}

export function TransportTable({ transport }: Props) {
  return (
    <Table className="mt-10">
      <TableHeader>
        <TableRow>
          <TableHead className="">Date</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Pick Up</TableHead>
          <TableHead>Drop Off</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transport.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.date}</TableCell>
            <TableCell>{item.company}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell className="">{item.pickup}</TableCell>
            <TableCell>{item.dropOff}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
