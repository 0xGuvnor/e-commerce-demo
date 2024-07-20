import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { HTMLAttributes } from "react";
import PhoneDark from "../../public/phone-template-dark-edges.png";
import PhoneWhite from "../../public/phone-template-white-edges.png";

interface Props extends HTMLAttributes<HTMLDivElement> {
  imgSrc: StaticImageData | string;
  dark?: boolean;
}

function Phone({ imgSrc, dark = false, className, ...props }: Props) {
  return (
    <div
      className={cn(
        "pointer-events-none relative z-50 overflow-hidden",
        className,
      )}
      {...props}
    >
      <Image
        src={dark ? PhoneDark : PhoneWhite}
        alt="Phone image"
        className="pointer-events-none z-50 select-none object-contain"
      />

      <div className="absolute inset-0 -z-10">
        {typeof imgSrc === "string" ? (
          <img
            src={imgSrc}
            alt="Phone overlay image"
            className="min-h-full min-w-full object-cover"
          />
        ) : (
          <Image
            src={imgSrc}
            alt="Phone overlay image"
            className="min-h-full min-w-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
export default Phone;
