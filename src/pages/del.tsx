import { useState } from "react";
import Layout from "~/components/Layout/Layout";
import BasicInfoForm, {
  type BasicInfoFormValues,
} from "~/components/itienary/forms/BasicInfo";
import { SubmitHandler } from "react-hook-form";
import DayManagementForm, {
  type DayManagementValues,
} from "~/components/itienary/forms/DayManagementForm";

export default function Page() {
  const [formData, setFormData] = useState<{
    basicInfo: BasicInfoFormValues;
  } | null>(null);

  const [dayManagementData, setDayManagementData] = useState<{
    dayManagement: DayManagementValues;
  } | null>(null);

  const handleBasicItienaryInfo: SubmitHandler<BasicInfoFormValues> = (
    data,
  ) => {
    console.log("<<<<<<<");
    console.log(data);
    console.log(">>>>>>>");
    setPage(() => page + 1);
  };

  const handleDayManagementInfo: SubmitHandler<DayManagementValues> = (
    data,
  ) => {
    console.log("*********");
    console.log(data);
    console.log("*********");
  };

  const [page, setPage] = useState(0);
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
          />
        );
    }
  };

  return (
    <Layout>
      <main>{MultiPageForm()}</main>
    </Layout>
  );
}
