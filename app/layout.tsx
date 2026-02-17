import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auditorio GW Chapman - UNAC",
  description: "Auditorio institucional de clase mundial para eventos académicos, conferencias y ceremonias.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
