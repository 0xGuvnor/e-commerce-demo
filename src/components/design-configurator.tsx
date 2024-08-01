"use client";

import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { BASE_PRICE } from "@/utils/constants";
import { base64ToBlob, formatPrice } from "@/utils/helpers";
import {
  ColourKey,
  ColourObject,
  COLOURS,
  FINISHES,
  MATERIALS,
  MODELS,
} from "@/utils/validators";
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import NextImage from "next/image";
import { useRef, useState } from "react";
import { Rnd } from "react-rnd";
import ResizeHandle from "./resize-handle";
import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { useToast } from "./ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { updateConfig, UpdateConfigArgs } from "@/app/configure/design/actions";
import { useRouter } from "next/navigation";

interface Props {
  imgUrl: string;
  configId: string;
  imageDimensions: { width: number; height: number };
}

const defaultColour = "black" as ColourKey;

function DesignConfigurator({ configId, imageDimensions, imgUrl }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const [options, setOptions] = useState<{
    colour: ColourObject;
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
  }>({
    colour: COLOURS[defaultColour],
    model: MODELS.options.at(-1) ?? MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });
  const [renderedDimension, setRenderedDimension] = useState({
    width: imageDimensions.width / 4,
    height: imageDimensions.height / 4,
  });
  const [renderedPosition, setRenderedPosition] = useState({ x: 150, y: 205 });
  const phoneCaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { startUpload } = useUploadThing("imageUploader");

  const { mutate: saveConfig, isPending } = useMutation({
    mutationKey: ["save-config"],
    mutationFn: (args: UpdateConfigArgs) => {
      return Promise.all([saveConfiguration(), updateConfig(args)]);
    },
    onSuccess: () => {
      router.push(`/configure/preview?id=${configId}`);
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  const saveConfiguration = async () => {
    try {
      const {
        left: caseLeft,
        top: caseTop,
        width,
        height,
      } = phoneCaseRef.current!.getBoundingClientRect();

      const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect();

      const leftOffset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;

      const actualX = renderedPosition.x - leftOffset;
      const actualY = renderedPosition.y - topOffset;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      const userImage = new Image();
      userImage.crossOrigin = "anonymous";
      userImage.src = imgUrl;
      await new Promise((resolve) => (userImage.onload = resolve));

      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimension.width,
        renderedDimension.height,
      );

      const base64 = canvas.toDataURL();
      const base64Data = base64.split(",")[1];

      const blob = base64ToBlob(base64Data, "image/png");
      const file = new File([blob], "userImage.png", { type: "image/png" });

      await startUpload([file], { configId });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description:
          "There was a problem saving your config, please try again.",
      });
    }
  };

  return (
    <div className="relative mb-20 mt-20 grid grid-cols-1 pb-20 lg:grid-cols-3">
      <div
        ref={containerRef}
        className="relative col-span-2 flex h-[37.5rem] w-full max-w-4xl items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <div className="pointer-events-none relative aspect-[896/1831] w-60 bg-opacity-50">
          <AspectRatio
            ref={phoneCaseRef}
            ratio={896 / 1831}
            className="pointer-events-none relative z-50 w-full"
          >
            <NextImage
              src={"/phone-template.png"}
              alt="Phone"
              fill
              className="pointer-events-none z-50 select-none"
            />
          </AspectRatio>

          <div className="absolute inset-0 bottom-px left-[3px] right-[3px] top-px z-40 rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]"></div>

          <div
            className={cn(
              "absolute inset-0 bottom-px left-[3px] right-[3px] top-px rounded-[32px]",
              `${options.colour.bg}`,
            )}
          ></div>
        </div>

        <Rnd
          default={{
            x: 150,
            y: 205,
            height: imageDimensions.height / 4,
            width: imageDimensions.width / 4,
          }}
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <ResizeHandle />,
            bottomLeft: <ResizeHandle />,
            topRight: <ResizeHandle />,
            topLeft: <ResizeHandle />,
          }}
          onResizeStop={(_, __, ref, ___, { x, y }) => {
            setRenderedDimension({
              height: parseInt(ref.style.height.slice(0, -2)),
              width: parseInt(ref.style.width.slice(0, -2)),
            });

            setRenderedPosition({ x, y });
          }}
          onDragStop={(_, data) => {
            const { x, y } = data;

            setRenderedPosition({ x, y });
          }}
          className="absolute z-20 border-[2px] border-primary/20"
        >
          <div className="relative size-full">
            <NextImage
              src={imgUrl}
              alt="Uploaded image"
              fill
              className="pointer-events-none"
            />
          </div>
        </Rnd>
      </div>

      <div className="col-span-full flex h-[37.5rem] w-full flex-col bg-white lg:col-span-1">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-white"
          ></div>

          <div className="px-8 pb-12 pt-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Customise your case
            </h2>

            <Separator className="my-6 h-px w-full bg-zinc-200" />

            <div className="relative mt-4 flex h-full flex-col justify-between gap-6">
              <RadioGroup
                defaultValue={defaultColour}
                onValueChange={(value) => {
                  setOptions((prev) => ({
                    ...prev,
                    colour: COLOURS[value as ColourKey],
                  }));
                }}
              >
                <Label>
                  Colour:{" "}
                  <span className="font-bold">{options.colour.label}</span>
                </Label>

                <div className="mt-3 flex items-center space-x-3">
                  {Object.entries(COLOURS).map(([key, colour]) => (
                    <RadioGroupItem
                      key={key}
                      id={key}
                      value={key}
                      showIndicator={false}
                      className={`size-8 border-transparent ring-2 ring-transparent ring-offset-2 transition ease-in-out active:ring-offset-0 data-[state=checked]:ring-primary ${colour.bg}`}
                    />
                  ))}
                </div>
              </RadioGroup>

              <div className="relative flex w-full flex-col gap-3">
                <Label>Model</Label>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      role="combobox"
                      variant={"outline"}
                      className="w-full justify-between"
                    >
                      {options.model.label}
                      <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    {MODELS.options.map((model) => (
                      <DropdownMenuItem
                        key={model.value}
                        onClick={() => {
                          setOptions((prev) => ({ ...prev, model }));
                        }}
                        className={cn(
                          "flex cursor-default items-center gap-1 p-1.5 text-sm hover:bg-zinc-100",
                          model.label === options.model.label && "bg-zinc-200",
                        )}
                      >
                        <Check
                          className={cn(
                            "mr-2 size-4",
                            model.label === options.model.label
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {model.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {[MATERIALS, FINISHES].map(
                ({ name, options: selectableOptions }) => (
                  <RadioGroup
                    key={name}
                    defaultValue={options[name].value}
                    onValueChange={(value) => {
                      setOptions((prev) => ({
                        ...prev,
                        [name]: selectableOptions.find(
                          (option) => option.value === value,
                        ),
                      }));
                    }}
                  >
                    <Label className="capitalize">{name}</Label>

                    <div className="mt-3 space-y-4">
                      {selectableOptions.map((option) => (
                        <div
                          key={option.value}
                          className={cn(
                            "relative block cursor-pointer gap-2 rounded-lg border-2 border-zinc-200 bg-white px-6 py-4 shadow-sm outline-none ring-0 focus:outline-none focus:ring-0 sm:flex sm:items-center sm:justify-between",
                            "has-[button[data-state=checked]]:border-primary",
                          )}
                        >
                          <div className="flex flex-col gap-1 text-sm">
                            <RadioGroupItem
                              id={option.value}
                              value={option.value}
                              className="absolute inset-0 size-full rounded-none opacity-0"
                            />
                            <Label
                              htmlFor={option.value}
                              className="cursor-pointer select-none font-medium text-gray-900"
                            >
                              {option.label}
                            </Label>

                            {option.description && (
                              <span className="block text-gray-500 sm:inline">
                                {option.description}
                              </span>
                            )}
                          </div>

                          <span className="text-sm font-medium text-gray-900">
                            {formatPrice(option.price / 100)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                ),
              )}
            </div>
          </div>
        </ScrollArea>

        <div className="h-16 w-full bg-white px-8">
          <div className="h-px w-full bg-zinc-200"></div>

          <div className="flex size-full items-center justify-end">
            <div className="flex w-full items-center gap-6">
              <p className="whitespace-nowrap font-medium">
                {formatPrice(
                  (BASE_PRICE + options.finish.price + options.material.price) /
                    100,
                )}
              </p>

              <Button
                size={"sm"}
                disabled={isPending}
                onClick={() =>
                  saveConfig({
                    configId,
                    colour: options.colour.value,
                    finish: options.finish.value,
                    material: options.material.value,
                    model: options.model.value,
                  })
                }
                className="w-full"
              >
                {isPending ? (
                  <span className="animate-pulse">Saving...</span>
                ) : (
                  <>
                    Continue <ArrowRight className="ml-1.5 inline size-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DesignConfigurator;
