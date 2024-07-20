"use client";

import Image, { StaticImageData } from "next/image";
import MaxWidthWrapper from "./max-width-wrapper";
import WhatPeopleAreBuying from "../../public/what-people-are-buying.png";
import {
  CSSProperties,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { useInView } from "framer-motion";
import { splitArray } from "@/utils/helpers";
import { PHONES } from "@/constants/phones";
import { cn } from "@/lib/utils";
import Phone from "./phone";

function Reviews() {
  return (
    <MaxWidthWrapper className="relative max-w-5xl">
      <Image
        src={WhatPeopleAreBuying}
        alt=""
        aria-hidden
        className="absolute -left-32 top-1/3 hidden select-none xl:block"
      />

      <ReviewGrid />
    </MaxWidthWrapper>
  );
}
export default Reviews;

function ReviewGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const columns = splitArray(PHONES, 3);

  const column1 = columns[0];
  const column2 = columns[1];
  const column3 = splitArray(columns[2], 2);

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3 "
    >
      {isInView && (
        <>
          <ReviewColumn
            reviews={[...column2, ...column3[1]]}
            msPerPixel={10}
            reviewClassName={(reviewIndex) =>
              cn({
                "md:hidden": reviewIndex >= column1.length + column3[0].length,
                "lg:hidden": reviewIndex >= column1.length,
              })
            }
          />
          <ReviewColumn
            reviews={[...column1, ...column3.flat(), ...column2]}
            msPerPixel={15}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= column2.length ? "lg:hidden" : ""
            }
          />
          <ReviewColumn
            reviews={column3.flat()}
            msPerPixel={10}
            className="hidden md:block"
          />
        </>
      )}

      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100"></div>
    </div>
  );
}

interface ReviewColumnProps {
  reviews: StaticImageData[];
  className?: string;
  reviewClassName?: (reviewIndex: number) => string;
  msPerPixel?: number;
}

function ReviewColumn({
  reviews,
  className,
  reviewClassName,
  msPerPixel = 0,
}: ReviewColumnProps) {
  const columnRef = useRef<HTMLDivElement>(null);
  const [columnHeight, setColumnHeight] = useState(0);
  const duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => {
    if (!columnRef.current) return;

    const resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0);
    });

    resizeObserver.observe(columnRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={columnRef}
      style={{ "--marquee-duration": duration } as CSSProperties}
      className={cn("animate-marquee space-y-8 py-4", className)}
    >
      {reviews.concat(reviews).map((imgSrc, index) => (
        <Review
          key={index}
          imgSrc={imgSrc}
          className={cn(reviewClassName?.(index % reviews.length))}
        />
      ))}
    </div>
  );
}

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: StaticImageData;
}

function Review({ imgSrc, className, ...props }: ReviewProps) {
  const POSSIBLE_ANIMATION_DELAYS = [
    "0s",
    "0.1s",
    "0.2s",
    "0.3s",
    "0.4s",
    "0.5s",
  ];

  const animationDelay =
    POSSIBLE_ANIMATION_DELAYS[
      Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
    ];

  return (
    <div
      style={{ animationDelay }}
      className={cn(
        "animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5",
        className,
      )}
      {...props}
    >
      <Phone imgSrc={imgSrc} />
    </div>
  );
}
