import { useState } from "react";
import Layout from "~/components/Layout/Layout";
import BasicInfoForm, {
  type BasicInfoFormValues,
  basicInfoInitialValues,
} from "~/components/itienary/forms/BasicInfo";
import { SubmitHandler } from "react-hook-form";
import DayManagementForm, {
  dayManagementSchema,
  type DayManagementValues,
} from "~/components/itienary/forms/DayManagementForm";
import { useUser } from "@clerk/nextjs";
import Button from "~/components/ui/Button";
import { api } from "~/utils/api";

export default function Page() {
  const [basicInfo, setBasicInfo] = useState<BasicInfoFormValues>(
    basicInfoInitialValues,
  );
  const [dayManagementData, setDayManagementData] =
    useState<DayManagementValues[]>();

  const user = useUser();
  const organizationEmail = user.user?.primaryEmailAddress
    ?.emailAddress as unknown as string;

  const handleBasicItienaryInfo: SubmitHandler<BasicInfoFormValues> = (
    data,
  ) => {
    setBasicInfo(data);

    // console.log(data, "Hello good morning");
    console.log(basicInfo, "how is this null");

    // console.log(data);

    setPage(() => page + 1);
  };

  const handleDayManagementInfo: SubmitHandler<DayManagementValues> = (
    data,
  ) => {
    // console.log("*********");
    console.log(data);
    // console.log("*********");
    setBasicInfo(data);
    setPage(() => page + 1);
  };

  const [page, setPage] = useState(0);

  function handleCreateItienary() {
    const daysdata = dayManagementSchema.parse(dayManagementData);
    mutateAsync({
      dayManagementSchema: { daysManagement: daysdata.daysManagement },
      organizationEmail: organizationEmail,
      guestName: basicInfo?.guestName,
      itienaryName: basicInfo?.itienaryName,
      numberOfDays: basicInfo?.numberOfDays,
      numberOfNights: basicInfo?.numberOfNights,
      numberOfGuests: basicInfo?.numberOfGuests,
      description: basicInfo?.description,
      pricePerPerson: basicInfo?.pricePerPerson,
    });
  }
  const MultiPageForm = () => {
    switch (page) {
      case 0:
        return <BasicInfoForm onSubmitReady={handleBasicItienaryInfo} />;

      case 1:
        return (
          <DayManagementForm
            onSubmitReady={handleDayManagementInfo}
            setPage={setPage}
            page={page}
            organizationEmail={organizationEmail}
          />
        );

      case 2:
        return <Button onClick={handleCreateItienary}>Log me </Button>;
    }
  };

  const { mutateAsync } = api.itienary.create.useMutation();

  return (
    <Layout>
      <main>{MultiPageForm()}</main>
    </Layout>
  );
}
