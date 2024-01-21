import {
  CardContent,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/Card";
import Button from "../ui/Button";
import { Label } from "../ui/label";
import Input from "../ui/Input";

export default function TripExpenseCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Expenses</CardTitle>
        <CardDescription>Input the trip expenses details here</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <Label htmlFor="expenseName">Expense Name</Label>
          <Input id="expenseName" placeholder="Expense Name" />
          <Label htmlFor="expenseAmount">Amount</Label>
          <Input id="expenseAmount" placeholder="Amount" type="number" />
          <Label htmlFor="expenseName">Description</Label>
          <Input id="expenseName" placeholder="hotel reservation" />
          <Label htmlFor="expenseDate">Date</Label>
          <Input id="expenseDate" placeholder="Date" type="date" />
          <Button className="w-full" type="submit">
            Submit Expense
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
