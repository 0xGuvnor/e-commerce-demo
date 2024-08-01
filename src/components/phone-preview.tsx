"use client";

import { CaseColour } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface Props {
  croppedImgUrl: string;
  colour: CaseColour;
}

function PhonePreview({ colour, croppedImgUrl }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [renderedDimensions, setRenderedDimensions] = useState({
    height: 0,
    width: 0,
  });

  const handleResize = () => {
    if (!ref.current) return;

    const { width, height } = ref.current.getBoundingClientRect();
    setRenderedDimensions({ height, width });
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [ref.current]);

  let caseBackgroundColour = "bg-zinz-950";
  if (colour === "blue") caseBackgroundColour = "bg-blue-950";
  if (colour === "rose") caseBackgroundColour = "bg-rose-950";

  return (
    <AspectRatio ref={ref} ratio={3000 / 2001} className="relative">
      <div
        style={{
          left:
            renderedDimensions.width / 2 -
            renderedDimensions.width / (1216 / 121),
          top: renderedDimensions.height / 6.22,
        }}
        className="absolute z-20 scale-[1.0352]"
      >
        <img
          src={croppedImgUrl}
          alt="Uploaded photo"
          width={renderedDimensions.width / (3000 / 637)}
          className={cn(
            "phone-skew relative z-20 rounded-b-[10px] rounded-t-[15px] md:rounded-b-[20px] md:rounded-t-[30px]",
            caseBackgroundColour,
          )}
        />
      </div>

      <div className="relative z-40 size-full">
        <img
          alt="Phone"
          src="/clearphone.png"
          className="pointer-events-none size-full rounded-md antialiased"
        />
      </div>
    </AspectRatio>
  );
}
export default PhonePreview;
