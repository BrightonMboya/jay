import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/utils/api";
import { format } from "date-fns";
import { type TripExpenseProps } from "./ExpensesTable";

export function AccountingTable({
  tripId,
  organizationEmail,
}: Omit<TripExpenseProps, "expenseType">) {
  const { data, isLoading } = api.tripAccounting.fetchExpenseAndSales.useQuery({
    tripId: tripId,
    organizationEmail: organizationEmail,
  });

  return (
    <Table className="mt-10">
      <TableCaption>All expenses related to this trip</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Rack Rate Amount</TableHead>
          <TableHead>Stock Rate amount</TableHead>
          <TableHead>Paid</TableHead>
        </TableRow>
      </TableHeader>
      {data?.length !== 0 && !isLoading && (
        <>
          <TableBody>
            {data?.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">
                  {expense.expenseName}
                </TableCell>
                <TableCell>{format(expense.date, "PPP")}</TableCell>
                <TableCell>{expense.rackRateAmount}</TableCell>
                <TableCell>{expense.stockRateAmount}</TableCell>
                <TableCell>{expense.paid ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </>
      )}
    </Table>
  );
}
