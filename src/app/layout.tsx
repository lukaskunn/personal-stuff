import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Stuff — Lucas Oliveira",
  description: "A collection of small personal projects for practicing frontend & 3D.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
