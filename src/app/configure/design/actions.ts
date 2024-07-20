"use server";

import {
  CaseColour,
  CaseFinish,
  CaseMaterial,
  PhoneModel,
} from "@prisma/client";
import prisma from "@/lib/db";

export type UpdateConfigArgs = {
  colour: CaseColour;
  finish: CaseFinish;
  material: CaseMaterial;
  model: PhoneModel;
  configId: string;
};

export async function updateConfig({
  colour,
  finish,
  material,
  model,
  configId,
}: UpdateConfigArgs) {
  await prisma.configuration.update({
    where: { id: configId },
    data: { colour, finish, material, model },
  });
}
