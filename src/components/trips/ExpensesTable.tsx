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
import { api } from "~/utils/api";
import { format } from "date-fns";

export interface TripExpenseProps {
  tripId: number;
  organizationEmail: string;
  expenseType: string;
}

export function ExpenseTable({ tripId, organizationEmail, expenseType }: TripExpenseProps) {
  const { data, isLoading } = api.tripAccounting.fetchExpenseType.useQuery({
    tripId: tripId,
    organizationEmail: organizationEmail,
    expenseType: expenseType
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
