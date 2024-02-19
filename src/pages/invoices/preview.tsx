import { CardTitle, CardHeader, CardContent, Card } from "~/components/ui/Card";
import Button from "~/components/ui/Button";
import { Separator } from "~/components/ui/seperator";
import { TableCell, TableRow, TableBody, Table } from "~/components/ui/table";
import { useRouter } from "next/router";

export default function Component() {
  const { query } = useRouter();
  const invoiceId = query.invoiceId;
  console.log(invoiceId);
  return (
    <Card className="w-[70%]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Invoice</CardTitle>
        <Button size="sm">Download</Button>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <div className="font-semibold">Acme Inc</div>
            <div>1234 Main St.</div>
            <div>Anytown, CA 12345</div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="font-semibold">Invoice #3102</div>
            <div>Due date: June 30, 2022</div>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <div className="font-semibold">Sophia Anderson</div>
            <div>1234 Main St.</div>
            <div>Anytown, CA 12345</div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="font-semibold">Payment method</div>
            <div>Visa ending in 4242</div>
          </div>
        </div>
        <Separator />
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="w-[100px]">1x Product A</TableCell>
              <TableCell>Description of product A</TableCell>
              <TableCell className="text-right">1</TableCell>
              <TableCell className="text-right">$100.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[100px]">1x Product B</TableCell>
              <TableCell>Description of product B</TableCell>
              <TableCell className="text-right">1</TableCell>
              <TableCell className="text-right">$50.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[100px]">1x Product C</TableCell>
              <TableCell>Description of product C</TableCell>
              <TableCell className="text-right">1</TableCell>
              <TableCell className="text-right">$75.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Invoice was created on June 23, 2022
          </div>
          <div className="flex flex-col gap-1 md:gap-0">
            <div className="text-lg font-semibold md:text-xl">
              Total amount: $225.00
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Includes all taxes and fees
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
