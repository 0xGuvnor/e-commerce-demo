"use server";

import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { BASE_PRICE, PRODUCT_PRICES } from "@/utils/constants";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Order } from "@prisma/client";

export async function createCheckoutSession({
  configId,
}: {
  configId: string;
}) {
  const configuration = await prisma.configuration.findUnique({
    where: { id: configId },
  });

  if (!configuration) {
    throw new Error("No configuration found");
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("You need to be logged in");
  }

  const { finish, material } = configuration;

  let price = BASE_PRICE;
  if (finish === "textured") price += PRODUCT_PRICES.finish.textured;
  if (material === "polycarbonate")
    price += PRODUCT_PRICES.material.polycarbonate;

  let order: Order | undefined;

  const existingOrder = await prisma.order.findFirst({
    where: {
      userId: user.id,
      configurationId: configuration.id,
    },
  });

  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await prisma.order.create({
      data: {
        amonut: price / 100,
        userId: user.id,
        configurationId: configuration.id,
      },
    });
  }

  const product = await stripe.products.create({
    name: "Custom iPhone Case",
    images: [configuration.imgUrl],
    default_price_data: {
      currency: "USD",
      unit_amount: price,
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: [{ price: product.default_price as string, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ["card", "paypal"],
    mode: "payment",
    shipping_address_collection: { allowed_countries: ["US", "SG", "DE"] },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
  });

  return { url: stripeSession.url };
}
