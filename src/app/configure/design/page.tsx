import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import DesignConfigurator from "@/components/design-configurator";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function Design({ searchParams }: Props) {
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

  const { id: configId, imgUrl, width, height } = configuration;

  return (
    <DesignConfigurator
      configId={configId}
      imgUrl={imgUrl}
      imageDimensions={{ width, height }}
    />
  );
}
export default Design;
