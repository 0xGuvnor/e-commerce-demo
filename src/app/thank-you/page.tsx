import ThankYou from "@/components/thank-you";
import { Suspense } from "react";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

function ThankYouPage({ searchParams }: Props) {
  return (
    <Suspense>
      <ThankYou orderId={searchParams.orderId as string} />
    </Suspense>
  );
}
export default ThankYouPage;
