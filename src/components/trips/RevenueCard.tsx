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

export default function TripRevenueCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Sales</CardTitle>
        <CardDescription>Record all sales you made for this trip</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input id="salesType" placeholder="trip booking" />
              <Label htmlFor="salesType">Sales Type</Label>
              <Input id="salesType" placeholder="trip booking" />
            </div>
            <div>
              <Label htmlFor="salesName">Sales Name</Label>
              <Input id="salesName" placeholder="Sales Name" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="salesAmount">Amount</Label>
              <Input id="salesAmount" placeholder="Amount" type="number" />
            </div>
            <div>
              <Label htmlFor="salesDate">Date</Label>
              <Input id="salesDate" placeholder="Date" type="date" />
            </div>
          </div>

          <Label htmlFor="salesName">Description</Label>
          <Input id="salesName" placeholder="hotel reservation" />

          <Label>Receipt</Label>

          <div className="flex w-full items-center justify-center">
            <label className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center ">
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG (MAX 2MB)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>

          <Button className="w-full" type="submit">
            Submit Sale
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}