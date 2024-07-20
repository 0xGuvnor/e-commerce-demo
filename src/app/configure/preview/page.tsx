import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import DesignPreview from "@/components/design-preview";

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

async function PreviewPage({ searchParams }: Props) {
  const { id } = searchParams;

  if (!id || typeof id !== "string") {
    notFound();
  }

  const configuration = await prisma.configuration.findUnique({
    where: { id },
  });

  if (!configuration) {
    notFound();
  }

  return <DesignPreview configuration={configuration} />;
}
export default PreviewPage;
