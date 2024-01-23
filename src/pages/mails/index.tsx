import { Mail } from "~/components/Mail/Mail";
import { accounts, mails } from "~/components/Mail//data";
import Layout from "~/components/Layout/Layout";

export default function MailPage() {
  const defaultLayout = undefined;
  const defaultCollapsed = undefined;

  return (
    <Layout>
      <div className="hidden flex-col pt-10 md:flex">
        
        <Mail
          accounts={accounts}
          mails={mails}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </Layout>
  );
}
