"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "~/utils/utils";
import Button from "~/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/Popover";
import { api } from "~/utils/api";

export default function BankSelector() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { data } = api.fetchTrips.tripNames.useQuery({
    organizationEmail: organizationEmail,
  });
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value
            ? data?.find(
                (trip) => trip.guestName.toLowerCase() === value.toLowerCase(),
              )?.guestName
            : "Select trip..."}
          <CaretSortIcon className=" h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search trip..." className="h-9" />
          <CommandEmpty>No trip found.</CommandEmpty>
          <CommandGroup>
            {data?.map((trip) => (
              <CommandItem
                key={trip.guestName}
                value={trip.guestName}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  console.log(value);
                  setOpen(false);
                }}
              >
                {trip.guestName}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === trip.guestName ? "opacity-100" : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
