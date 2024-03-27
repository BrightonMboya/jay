import { type ControllerRenderProps } from "react-hook-form";
import { TripSchemaType } from "~/pages/trips/new";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Button from "~/components/ui/Button";

import { cn } from "~/utils/utils";
import { z } from "zod";

import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/Popover";



interface Props {
  field: ControllerRenderProps<TripSchemaType, "bookedOn" | "departureDate">;
}
export default function TripDatePicker({ field }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "text-left font-normal",
            !field.value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />

          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          // onChange={(date: any) => field.onChange(date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
