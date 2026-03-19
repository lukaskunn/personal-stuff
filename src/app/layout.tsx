import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "My Stuff — Lucas Oliveira",
  description: "A collection of small personal projects for practicing frontend & 3D.",
};

const gloockFont = localFont({
  variable: "--font-gloock",
  src: [
    {
      path: "../../public/assets/fonts/gloock/Gloock-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ]
})

const robotoMonoFont = localFont({
  variable: "--font-roboto-mono",
  src: [
    {
      path: "../../public/assets/fonts/roboto-mono/RobotoMono-Italic-VariableFont_wght.ttf",
      weight: "100 700",
      style: "italic",
    },
    {
      path: "../../public/assets/fonts/roboto-mono/RobotoMono-VariableFont_wght.ttf",
      weight: "100 700",
      style: "normal",
    }
  ]
})

const robotoFont = localFont({
  variable: "--font-roboto",
  src: [
    {
      path: "../../public/assets/fonts/roboto/Roboto-VariableFont_wdth,wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/roboto/Roboto-Italic-VariableFont_wdth,wght.ttf",
      weight: "100 900",
      style: "italic",
    }
  ]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${robotoMonoFont.variable} ${robotoFont.variable} ${gloockFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
