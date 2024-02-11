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
import { Control, Controller } from "react-hook-form";
import { DayManagementValues } from "./DayManagementForm";

interface Props {
  organizationEmail: string;
  control: Control<DayManagementValues>;
}

export default function SelectDestination({ organizationEmail, control }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { data } = api.destinations.destinationPicker.useQuery({
    organizationEmail: organizationEmail,
  });

  return (
    <Controller
      name="destinationId"
      control={control}
      render={({ field }) => (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value
                ? data?.find(
                    (destination) =>
                      destination.name.toLowerCase() === value.toLowerCase(),
                  )?.name
                : "Select destination..."}
              <CaretSortIcon className=" h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0">
            <Command>
              <CommandInput
                placeholder="Search destination..."
                className="h-9"
              />
              <CommandEmpty>No destination found.</CommandEmpty>
              <CommandGroup>
                {data?.map((destination) => (
                  <CommandItem
                    key={destination.name}
                    value={destination.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      field.onChange(destination.id);
                      //   console.log(value);
                      setOpen(false);
                    }}
                  >
                    {destination.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === destination.name
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    />
  );
}
