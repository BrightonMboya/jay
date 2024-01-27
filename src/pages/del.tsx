import { useRef, useState } from "react";
import Layout from "~/components/Layout/Layout";
import BasicInfoForm, {
  type BasicInfoFormValues,
} from "~/components/itienary/forms/BasicInfo";
import { SubmitHandler } from "react-hook-form";
import Button from "~/components/ui/Button";

export default function Page() {
  const [formData, setFormData] = useState<{
    basicInfo: BasicInfoFormValues;
  } | null>(null);

  const handleBasicItienaryInfo: SubmitHandler<BasicInfoFormValues> = (
    data,
  ) => {
    console.log("<<<<<<<");
    console.log(data);
    console.log(">>>>>>>");
  };

  const [page, setPage] = useState(0);
  const MultiPageForm = () => {
    switch (page) {
      case 0:
        return (
          <BasicInfoForm
            onSubmitReady={handleBasicItienaryInfo}
            setNextPage={setPage}
          />
        );

      case 1:
        return <h3>hello World</h3>;
    }
  };

  return (
    <Layout>
      <main>{MultiPageForm()}</main>
    </Layout>
  );
}
