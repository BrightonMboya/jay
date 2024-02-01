import { type ControllerRenderProps } from "react-hook-form";
import { TripSchemaType } from "~/pages/trips/new";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { z } from "zod";

interface Props {
  field: ControllerRenderProps<TripSchemaType>;
}

=

export default function TripGenderPicker({ field }: Props) {
  return (
    <RadioGroup defaultValue="male" onChange={field.onChange}>
      <div className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Male</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="female" id="r2" />
          <Label htmlFor="r2">Female</Label>
        </div>
      </div>
    </RadioGroup>
  );
}
