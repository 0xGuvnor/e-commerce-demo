import MaxWidthWrapper from "@/components/max-width-wrapper";
import Phone from "@/components/phone";
import { ArrowRight, Check, Star } from "lucide-react";
import YourImage from "../../public/your-image.png";
import Line from "../../public/line.png";
import OverlayImage from "../../public/testimonials/1.jpg";
import Snake2 from "../../public/snake-2.png";
import User1 from "../../public/users/user-1.png";
import User4 from "../../public/users/user-4.jpg";
import Arrow from "../../public/arrow.png";
import Horse from "../../public/horse.jpg";
import HorsePhone from "../../public/horse_phone.jpg";
import Image from "next/image";
import { Icons } from "@/components/icons";
import Reviews from "@/components/reviews";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="bg-slate-50">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-3 lg:gap-x-0 lg:pb-52 lg:pt-24 xl:gap-x-8 xl:pt-32">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="absolute -top-20 left-0 hidden w-28 lg:block">
                <Image
                  src={"/snake-1.png"}
                  alt="Logo"
                  width={100}
                  height={100}
                  className="w-full"
                />
              </div>
              <h1 className="relative mt-16 w-fit text-balance text-5xl font-bold !leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
                Your Image on a{" "}
                <span className="bg-green-600 px-2 text-white">Custom</span>{" "}
                Phone Case
              </h1>
              <p className="mt-8 max-w-prose text-balance text-center text-lg md:text-wrap lg:pr-10 lg:text-left">
                Capture your favourite memories with your own,{" "}
                <span className="font-semibold">one-of-one</span> phone case.
                CobraCase allows you to protect your memories, not just your
                phone case.
              </p>

              <ul className="mt-8 flex flex-col items-center space-y-2 text-left font-medium sm:items-start">
                <div className="space-y-2">
                  <li className="flex items-center gap-1.5 text-left">
                    <Check className="size-5 shrink-0 text-green-600" />
                    High-quality, durable materials
                  </li>
                  <li className="flex items-center gap-1.5 text-left">
                    <Check className="size-5 shrink-0 text-green-600" />5 year
                    print guarantee
                  </li>
                  <li className="flex items-center gap-1.5 text-left">
                    <Check className="size-5 shrink-0 text-green-600" />
                    Modern iPhone models supported
                  </li>
                </div>
              </ul>

              <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                <div className="flex -space-x-4">
                  <Image
                    src={"/users/user-1.png"}
                    alt="User image"
                    width={40}
                    height={40}
                    className="inline-block rounded-full ring-2 ring-slate-100"
                  />
                  <Image
                    src={"/users/user-2.png"}
                    alt="User image"
                    width={40}
                    height={40}
                    className="inline-block rounded-full ring-2 ring-slate-100"
                  />
                  <Image
                    src={"/users/user-3.png"}
                    alt="User image"
                    width={40}
                    height={40}
                    className="inline-block rounded-full ring-2 ring-slate-100"
                  />
                  <Image
                    src={"/users/user-4.jpg"}
                    alt="User image"
                    width={40}
                    height={40}
                    className="inline-block rounded-full ring-2 ring-slate-100"
                  />
                  <Image
                    src={"/users/user-5.jpg"}
                    alt="User image"
                    width={40}
                    height={40}
                    className="inline-block rounded-full object-cover ring-2 ring-slate-100"
                  />
                </div>

                <div className="flex flex-col items-center justify-between sm:items-start">
                  <div className="flex gap-0.5">
                    <Star className="size-4 fill-green-600 text-green-600" />
                    <Star className="size-4 fill-green-600 text-green-600" />
                    <Star className="size-4 fill-green-600 text-green-600" />
                    <Star className="size-4 fill-green-600 text-green-600" />
                    <Star className="size-4 fill-green-600 text-green-600" />
                  </div>

                  <p>
                    <span className="font-semibold">1,250+</span> happy
                    customers
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-full mt-32 flex h-fit w-full justify-center px-8 sm:px-16 md:px-0 lg:col-span-1 lg:mx-0 lg:mt-20">
            <div className="relative md:max-w-xl">
              <Image
                src={YourImage}
                alt="Your image text"
                className="absolute -top-20 left-56 hidden w-40 select-none sm:block lg:hidden lg:w-52 xl:block"
              />
              <Image
                src={Line}
                alt="Line"
                className="absolute -bottom-6 -left-6 w-20 select-none"
              />
              <Phone imgSrc={OverlayImage} className="w-64" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="bg-slate-100 py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col items-center gap-4 sm:gap-6 lg:flex-row">
            <h2 className="order-1 mt-2 text-balance text-center text-5xl font-bold !leading-tight tracking-tight text-gray-900 md:text-6xl">
              What our{" "}
              <span className="relative px-2">
                customers{" "}
                <Icons.underline className="pointer-events-none absolute inset-x-0 -bottom-6 hidden text-green-500 sm:block" />
              </span>{" "}
              say
            </h2>

            <Image
              src={Snake2}
              alt="Snake logo"
              className="-order-1 w-24 lg:order-2"
            />
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="mb-2 flex gap-0.5">
                <Star className="size-5 fill-green-600 text-green-600" />
                <Star className="size-5 fill-green-600 text-green-600" />
                <Star className="size-5 fill-green-600 text-green-600" />
                <Star className="size-5 fill-green-600 text-green-600" />
                <Star className="size-5 fill-green-600 text-green-600" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  "The case feels durable and I even got a compliment on the
                  design. I had the case for two and a half months now and{" "}
                  <span className="bg-slate-800 p-0.5 text-white">
                    the image is super clear
                  </span>
                  . My previous case had already started fading into a
                  yellow-ish color after a coiple weeks. Love it!"
                </p>
              </div>

              <div className="mt-2 flex gap-4">
                <Image
                  src={User1}
                  alt="User"
                  className="size-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">Jonathan</p>
                  <div className="flex items-center gap-1.5 text-zinc-600">
                    <Check className="size-4 stroke-[3px] text-green-600" />
                    <p className="text-sm">Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="mb-2 flex gap-0.5">
                <Star className="size-5 fill-green-600 text-green-600" />
                <Star className="size-5 fill-green-600 text-green-600" />
                <Star className="size-5 fill-green-600 text-green-600" />
                <Star className="size-5 fill-green-600 text-green-600" />
                <Star className="size-5 fill-green-600 text-green-600" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  "I bought the Galaxy Defender phone case, and it&apos;s
                  perfect! Fits my phone snugly, saved it from a drop, and looks
                  stylish. The built-in stand is super handy for watching
                  videos. Got lots of compliments already.{" "}
                  <span className="bg-slate-800 p-0.5 text-white">
                    Worth every penny!
                  </span>
                  "
                </p>
              </div>

              <div className="mt-2 flex gap-4">
                <Image
                  src={User4}
                  alt="User"
                  className="size-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">Josh</p>
                  <div className="flex items-center gap-1.5 text-zinc-600">
                    <Check className="size-4 stroke-[3px] text-green-600" />
                    <p className="text-sm">Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>

        <div className="pt-16">
          <Reviews />
        </div>
      </section>

      <section>
        <MaxWidthWrapper className="py-24">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="order-1 mt-2 text-balance text-center text-5xl font-bold !leading-tight tracking-tight text-gray-900 md:text-6xl">
                Upload your photo and get{" "}
                <span className="relative inline-block bg-green-600 px-2 text-white">
                  your own case
                </span>{" "}
                now
              </h2>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="relative flex grid-cols-2 flex-col items-center gap-40 md:grid">
              <Image
                src={Arrow}
                alt="Arrow"
                className="absolute left-1/2 top-[25rem] z-10 -translate-x-1/2 -translate-y-1/2 rotate-90 md:top-1/2 md:rotate-0"
              />

              <div className="relative h-80 w-full max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 md:h-full md:justify-self-end lg:rounded-2xl">
                <Image
                  src={Horse}
                  alt="Horse and woman"
                  className="size-full rounded-md bg-white object-cover shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>

              <Phone className="w-60" imgSrc={HorsePhone} />
            </div>
          </div>

          <ul className="mx-auto mt-12 w-fit max-w-prose space-y-2 sm:text-lg">
            <li className="w-fit">
              <Check className="mr-1.5 inline size-5 text-green-600" />
              High-quality silicone material
            </li>
            <li className="w-fit">
              <Check className="mr-1.5 inline size-5 text-green-600" />
              Scratch and fingerprint resistant coating
            </li>
            <li className="w-fit">
              <Check className="mr-1.5 inline size-5 text-green-600" />
              MagSafe™ compatible
            </li>
            <li className="w-fit">
              <Check className="mr-1.5 inline size-5 text-green-600" />5 year
              print warranty
            </li>

            <div className="flex justify-center">
              <Button asChild size={"lg"} className="mx-auto mt-8">
                <Link href={"/configure/upload"}>
                  Create your case now <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
            </div>
          </ul>
        </MaxWidthWrapper>
      </section>
    </main>
  );
}
