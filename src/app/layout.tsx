import type { Metadata } from "next";
import { Inter, Recursive } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/providers";
import { constructMetadata } from "@/utils/helpers";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursive.className}>
        <Navbar />

        <main className="grainy-light flex min-h-[calc(100vh-3.5rem-1px)] flex-col justify-between">
          <Providers>{children}</Providers>
          <Footer />
        </main>

        <Toaster />
      </body>
    </html>
  );
}
