import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppRouter } from "@shamba/api";
import { inferProcedureInput } from "@trpc/server";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { api as trpc } from "~/utils/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/UI/select";
import { useToast } from "~/hooks/useToast";
import { Button, Input, Label } from "../UI";
import { ToastAction } from "../UI/Toast";

const schema = z.object({
  fullName: z.string().nonempty(),
  whatsappNumber: z.string().regex(/^[+]260\d{9}$/),
  mobileProvider: z.string(),
});

type ValidationSchema = z.infer<typeof schema>;

const RegistrationForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedProvider, setSelectedProvider] = React.useState<string>("");
  const TOSclass =
    "w-4 h-4 text-gray-900 bg-gray-100 border-slate-300 rounded accent-green ";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({ resolver: zodResolver(schema) });

  const farmersRouter = trpc.farmer.add.useMutation({});
  const tokenXml = trpc.payments.getToken.useQuery().data;
  const paymentRouter = trpc.payments.sendMobileToken.useMutation({
    onSuccess: () => {
      router.push("/zambia/success");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: ` ${error.message}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        duration: 1500,
      });
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    type Input = inferProcedureInput<AppRouter["payments"]["sendMobileToken"]>;
    const input: Input = {
      phoneNumber: data.whatsappNumber,
      transactionToken: tokenXml,
      mobileMoneyProvider: selectedProvider,
    };
    type newFarmerInput = inferProcedureInput<AppRouter["farmer"]["add"]>;
    const newFarmerInput: newFarmerInput = {
      fullName: data.fullName,
      phoneNumber: data.whatsappNumber,
    };

    try {
      // console.log(tokenXml, "token");
      paymentRouter.mutateAsync(input);
      // farmersRouter.mutateAsync(newFarmerInput);
    } catch (cause) {
      console.log(cause);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `Please make sure your number is a valid Zambian number`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        duration: 1500,
      });
    }
  };
  return (
    <form
      className="flex flex-col justify-center space-y-5 pl-5 md:ml-[7rem] md:mt-[2rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col ">
        <Label htmlFor="userName" className="relative">
          Full Name{" "}
          <sup className="text-medium absolute bottom-0 text-lg text-red-600">
            *
          </sup>
        </Label>

        <Input
          {...register("fullName")}
          className="mt-2 w-[300px]"
          placeholder="Hariet Ngulube"
        />
        {errors?.fullName?.message && (
          <span className="text-sm text-red-500">
            Please enter your full name
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-col">
        <Label htmlFor="whatsappNumber" className="relative">
          Phone Number{" "}
          <sup className="text-medium absolute bottom-0 text-lg text-red-600">
            *
          </sup>
        </Label>

        <Input
          type="string"
          placeholder="+260780321733"
          {...register("whatsappNumber")}
          className="mt-2 w-[300px]"
        />
        {errors?.whatsappNumber?.message && (
          <span className="text-sm text-red-500">
            Please enter a whatsapp number in form of +260xxxxxxxxx
          </span>
        )}
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="provider" className="relative">
          Mobile Provider{" "}
          <sup className="text-medium absolute bottom-0 text-lg text-red-600">
            *
          </sup>
        </Label>
        <Input
          value={selectedProvider}
          {...register("mobileProvider")}
          className="hidden"
        />
        <div className="w-[300px]">
          <Select
            onValueChange={(value) => {
              setSelectedProvider(value);
            }}
          >
            <SelectTrigger id="crops">
              <SelectValue placeholder="Airtel" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="airtel">Airtel</SelectItem>
              <SelectItem value="mtn">MTN</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {errors?.mobileProvider?.message && (
          <span className="text-sm text-red-500">
            Please enter the mobile provider, mtn or airtel
          </span>
        )}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <Input
          id="terms and conditions"
          type="checkbox"
          required
          className={TOSclass}
        />
        <label className="text-left text-sm font-medium text-gray-800">
          By registering, you agree to our
          <Link
            href="https://drive.google.com/file/d/1jtE0kkYDu6c4t0pUQC_s6IEBk0nrT_rY/view?usp=sharing"
            replace
          >
            <p className="text-gold ml-1 font-medium hover:underline ">
              Terms and Conditions.
            </p>
          </Link>
          You may receive sms/whatsapp notifications from us and can opt out any
          time.
        </label>
      </div>

      {farmersRouter.error && (
        <div className="text-sm text-red-500">
          <h3>Something went wrong, try again</h3>
        </div>
      )}

      <Button disabled={farmersRouter.isLoading} type="submit">
        {farmersRouter.isLoading ? "Loading..." : " Sign Up"}
      </Button>
    </form>
  );
};

export default RegistrationForm;
