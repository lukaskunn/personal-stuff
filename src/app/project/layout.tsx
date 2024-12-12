import type { Metadata } from "next";
// import "./globals.css";

export const metadata: Metadata = {
  title: "My Stuff - Lucas Oliveira",
  description: "Welcome to my personal stuff!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
