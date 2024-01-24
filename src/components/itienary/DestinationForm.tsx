import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import { ItemLayout, AssetLabel } from "~/pages/contacts/new";
import Input from "../ui/Input";
import { DatePicker } from "../ui/DatePicker";
import { Textarea } from "../ui/TextArea";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

export default function DestinationForm() {
  return (
    <section className="pt-10">
      <p className="pb-5 text-4xl text-primary">Trip Destination Details</p>
      <Dragger {...props} className="mt-5">
        <div className="flex w-full items-center justify-center pt-5">
          <label className=" flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg ">
            <div className="flex flex-col items-center justify-center ">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">
                  Upload an Images for this destination
                </span>
                Maximum 5MB
              </p>
            </div>
          </label>
        </div>
      </Dragger>
      <div className="mt-10 space-y-[30px]">
        <ItemLayout>
          <AssetLabel
            label="Name"
            caption="Give this Destination a descriptive Name"
          />
          <Input placeholder="Arusha" />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel
            label="Date"
            caption="When will the Guest visit this destination"
          />
          <DatePicker />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel
            label="Accomodation"
            caption="Where will this guest spend the night"
          />
          <Input placeholder="Kahawa House" />
        </ItemLayout>
        <ItemLayout>
          <AssetLabel
            label="Nights"
            caption="How many Nights will the guest spend on this accomodation"
          />
          <Input placeholder="5" />
        </ItemLayout>
        <ItemLayout>
          <AssetLabel
            label="Basis"
            caption="What type of Basis is this Accomodation"
          />
          <Input placeholder="Private Villa" />
        </ItemLayout>
        <ItemLayout>
          <AssetLabel
            label="Description"
            caption="Give the guest a little description about this destination"
          />
          <Textarea placeholder="Tell the user what they will see on this destination" />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel
            label="Activities"
            caption="Enter a list of activities seperated by comma"
          />
          <Textarea placeholder="Hiking, Bird Watching, Animal Watching," />
        </ItemLayout>
      </div>
    </section>
  );
}
