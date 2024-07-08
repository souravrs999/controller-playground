import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GamepadProvider from "@/providers/gamepad";
import { cn } from "@/util/style";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Controller playground",
  description:
    "Interact with the underlying Gamepad API. connect your game controllers and test various functionalities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "scroll-smooth antialiased")}>
        <GamepadProvider>{children}</GamepadProvider>
      </body>
    </html>
  );
}
