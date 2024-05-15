import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Wrapper from "./Wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TODO List App",
  description: "Make your paperwork less"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Provider store={store}> */}
        <Wrapper>{children}</Wrapper>
        {/* </Provider> */}
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
