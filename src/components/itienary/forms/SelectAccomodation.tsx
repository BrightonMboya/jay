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
import { SelectProps } from "./SelectDestination";
import { Controller } from "react-hook-form";

export default function SelectAccomodation({
  organizationEmail,
  control,
  idx,
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { data } = api.accomodation.accomodationPicker.useQuery({
    organizationEmail: organizationEmail,
  });

  return (
    <Controller
      name={`daysManagement.${idx}.accomodationId`}
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
                    (accomodation) =>
                      accomodation.name.toLowerCase() === value.toLowerCase(),
                  )?.name
                : "select accomodation..."}
              <CaretSortIcon className=" h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0">
            <Command>
              <CommandInput
                placeholder="Search accomodation..."
                className="h-9"
              />
              <CommandEmpty>No accomodation found.</CommandEmpty>
              <CommandGroup>
                {data?.map((accomodation) => (
                  <CommandItem
                    key={accomodation.name}
                    value={accomodation.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      field.onChange(accomodation.id)
                      //   console.log(value);
                      setOpen(false);
                    }}
                  >
                    {accomodation.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === accomodation.name
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
