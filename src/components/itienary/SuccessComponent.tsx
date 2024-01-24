import {  Result } from "antd";
import Button from "../ui/Button";

export default function SuccessComponent() {
  return (
    <Result
    className="font-montserrat border-[2px] border-primary bg-white shadow-lg rounded-md m t-10"
      status="success"
      title="Successfully Created the Itienary"
      subTitle="Itienary Link: https://www.tazamaafricasafaris.com/about. Go ahead and share it with your guests"
    //   extra={[
    //     <Button type="primary" key="console">
    //       Go Console
    //     </Button>,
    //     <Button key="buy">Buy Again</Button>,
    //   ]}
    />
  );
}
