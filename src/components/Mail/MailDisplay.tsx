import Button from "~/components/ui/Button";

import { Separator } from "~/components/ui/seperator";
import { Textarea } from "~/components/ui/TextArea";

import { Mail } from "./data";

import { useState, useEffect } from "react";
import { AssetLabel, ItemLayout } from "~/pages/contacts/new";
import Input from "../ui/Input";

interface MailDisplayProps {
  mail: Mail | null;
}

export function MailDisplay({ mail }: MailDisplayProps) {
  const [emailBody, setEmailBody] = useState("");
  const [emailSubject, setEmailSubject] = useState<string>("");

  useEffect(() => {
    setEmailBody(mail?.text!);
    setEmailSubject(mail?.subject!);
  }, [mail]);
  return (
    <div className="flex h-full flex-col">
      <Separator />
      {mail ? (
        <div className="flex flex-1 flex-col">
          <div className="space-y-5  pl-4">
            <div className="flex items-center space-x-5 ">
              <AssetLabel label="Subject" />
              <Input
                className="w-[300px] "
                placeholder="alicesmith@example.com"
                value={emailSubject}
              />
            </div>

            <div className="flex items-center space-x-5 ">
              <AssetLabel label="Send To" />
              <Input
                className="w-[300px] "
                placeholder="alicesmith@example.com"
              />
            </div>
          </div>
          <Separator />

          <Textarea
            className="mx-4 mt-10 w-[90%] flex-1 whitespace-pre-wrap p-4 text-sm"
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
          />

          <Button className="ml-4 mr-auto mt-5">Send Email</Button>

          <Separator className="mt-auto" />
        </div>
      ) : (
        <div className="text-muted-foreground p-8 text-center">
          No message selected
        </div>
      )}
    </div>
  );
}
