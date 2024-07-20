import MaxWidthWrapper from "@/components/max-width-wrapper";
import Steps from "@/components/steps";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function ConfigurationLayout({ children }: Props) {
  return (
    <MaxWidthWrapper className="flex flex-1 flex-col">
      <Steps />
      {children}
    </MaxWidthWrapper>
  );
}
export default ConfigurationLayout;
