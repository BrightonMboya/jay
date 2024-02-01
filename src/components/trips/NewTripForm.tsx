"use client";

import { AssetLabel, ItemLayout } from "~/pages/contacts/new";
import Input from "~/components/ui/Input";
import { Textarea } from "~/components/ui/TextArea";
import Button from "~/components/ui/Button";
import { type UseFormRegister, type Control } from "react-hook-form";
import { TripSchemaType } from "~/pages/trips/new";
import { Controller } from "react-hook-form";

import * as React from "react";

import TripDatePicker from "./tripDatePicker";
import TripGenderPicker from "./tripGenderPicker";

interface Props {
  register: UseFormRegister<TripSchemaType>;
  control: Control<TripSchemaType>;
}

export default function NewTripForm({ register, control }: Props) {
  return (
    <>
      <section className="relative mt-[50px] flex flex-col space-y-[30px] ">
        <ItemLayout>
          <AssetLabel label="Guest Full Name" />
          <Input placeholder="Jay Gaspary" {...register("guestName")} />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel label="Primary Email" />
          <Input placeholder="doe@gmail.com" {...register("email")} />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel
            label="Gender"
            caption="Gender of the guest as it appears in passport"
          />
          <Controller
            control={control}
            name="gender"
            render={({ field }) => <TripGenderPicker field={field} />}
          />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel label="Booked On" caption="When was this trip booked" />
          <Controller
            control={control}
            name="bookedOn"
            render={({ field }) => <TripDatePicker field={field} />}
          />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel
            label="Date of Arrival"
            caption="When is this guest arriving"
          />
          <Controller
            control={control}
            name="dateOfArrival"
            render={({ field }) => <TripDatePicker field={field} />}
          />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel
            label="Departure Date"
            caption="When is this guest leaving the country"
          />
          <Controller
            control={control}
            name="departureDate"
            render={({ field }) => <TripDatePicker field={field} />}
          />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel label="No of Days" caption="How long is this tri[" />
          <Input
            type="number"
            placeholder="2"
            {...register("noOfDays", {
              valueAsNumber: true,
            })}
          />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel
            label="Itenary Link"
            caption="Paste the link to the itenary of this trip"
          />
          <Input
            placeholder="www.wetu.com/itenary"
            {...register("itienaryLink")}
          />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel label="Citizenship" />
          <Input placeholder="Denmark" {...register("citizenship")} />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel
            label="Notes"
            caption="Enter additional details about this guest"
          />

          <Textarea
            placeholder="Add short notes about this guest"
            {...register("description")}
          />
        </ItemLayout>
      </section>
      <Button className="mt-[50px] w-full">Save Trip</Button>
    </>
  );
}
