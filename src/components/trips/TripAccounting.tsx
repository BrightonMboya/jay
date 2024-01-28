import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/Tabs";
import TripExpenseCard from "./TripExpenseCard";
import TripRevenueCard from "./RevenueCard";

export default function TripAccounting() {
  return (
    <Tabs defaultValue="expenses" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="expenses">Expenses</TabsTrigger>
        <TabsTrigger value="sales">Sales</TabsTrigger>
      </TabsList>

      <TabsContent value="expenses">
        <TripExpenseCard />
      </TabsContent>

      <TabsContent value="sales">
        <TripRevenueCard />
      </TabsContent>
    </Tabs>
  );
}
