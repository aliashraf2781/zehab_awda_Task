import type { Metadata } from "next";
import "keen-slider/keen-slider.min.css";
import "./globals.css";
import "@fontsource-variable/cairo";
import Providers from "./Providers";
import Header from "@/components/LayoutComponents/Header/Header";
import Footer from "@/components/LayoutComponents/Footer/Footer";

export const metadata: Metadata = {
  title: "Pixi",
  description: "Pixi - Your Ultimate Ecommerce Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-cairo antialiased`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
