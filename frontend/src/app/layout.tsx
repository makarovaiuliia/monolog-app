import type { Metadata } from "next";
import localFont from "next/font/local";
import "../shared/styles/global.css";
import { observer } from "mobx-react-lite";
import { authStore } from "@/features/auth/model/authStore";
import { useEffect } from "react";

const Chocolates = localFont({
  src: [
    {
      path: "./ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./DemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Light.otf",
      weight: "200",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "monolog app",
  description:
    "monolog is an app for keeping a personal diary and mood logging. Share you thoughts, pain, happiness and sadness with us",
};

export default observer(function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    authStore.refreshToken();
  }, []);

  if (authStore.loading) {
    return <p>Loading...</p>;
  }

  return (
    <html lang="en">
      <body className={`${Chocolates.className}`}>{children}</body>
    </html>
  );
});
