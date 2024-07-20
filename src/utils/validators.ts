import { CaseColour } from "@prisma/client";
import { PRODUCT_PRICES } from "./constants";

export type ColourObject = {
  label: string;
  bg: string;
  value: CaseColour;
};

export const COLOURS = {
  black: { label: "Black", bg: "bg-zinc-900", value: "black" },
  blue: { label: "Blue", bg: "bg-blue-950", value: "blue" },
  rose: { label: "Rose", bg: "bg-rose-950", value: "rose" },
} as const;

export type ColourKey = keyof typeof COLOURS;

export const MODELS = {
  name: "models",
  options: [
    { label: "iPhone X", value: "iphonex" },
    { label: "iPhone 11", value: "iphone11" },
    { label: "iPhone 12", value: "iphone12" },
    { label: "iPhone 13", value: "iphone13" },
    { label: "iPhone 14", value: "iphone14" },
    { label: "iPhone 15", value: "iphone15" },
  ],
} as const;

export const MATERIALS = {
  name: "material",
  options: [
    {
      label: "Silicone",
      value: "silicone",
      description: undefined,
      price: PRODUCT_PRICES.material.silicone,
    },
    {
      label: "Soft Polycarbonate",
      value: "polycarbonate",
      description: "Scratch-resistant coating",
      price: PRODUCT_PRICES.material.polycarbonate,
    },
  ],
} as const;

export const FINISHES = {
  name: "finish",
  options: [
    {
      label: "Smooth Finish",
      value: "smooth",
      description: undefined,
      price: PRODUCT_PRICES.finish.smooth,
    },
    {
      label: "Textured Finish",
      value: "textured",
      description: "Soft grippy texture",
      price: PRODUCT_PRICES.finish.textured,
    },
  ],
} as const;
