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

const trips = [
  {
    value: "jamesTrip",
    label: "James Trip",
  },
  {
    value: "natasha",
    label: "natasha",
  },
  {
    value: "amina",
    label: "amina",
  },
];

export function SelectTrip() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? trips.find((trip) => trip.value === value)?.label
            : "Select trip..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search trip..." className="h-9" />
          <CommandEmpty>No trip found.</CommandEmpty>
          <CommandGroup>
            {trips.map((trip) => (
              <CommandItem
                key={trip.value}
                value={trip.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {trip.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === trip.value ? "opacity-100" : "opacity-0",
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
