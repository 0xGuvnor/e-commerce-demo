"use server";

import { OrderStatus } from "@prisma/client";
import prisma from "@/lib/db";

export async function changeOrderStatus({
  id,
  newStatus,
}: {
  id: string;
  newStatus: OrderStatus;
}) {
  await prisma.order.update({
    where: { id },
    data: { status: newStatus },
  });
}
