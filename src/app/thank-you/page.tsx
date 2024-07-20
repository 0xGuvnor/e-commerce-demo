interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

function ThankYouPage({ searchParams }: Props) {
  return <div>{searchParams.orderId}</div>;
}
export default ThankYouPage;
