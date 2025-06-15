import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const metadata: Metadata = {
  title: "Posts app",
  description: "Created by polrmn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers.StoreProvider>
          <Providers.AntdProvider>
            <AntdRegistry>{children}</AntdRegistry>
          </Providers.AntdProvider>
        </Providers.StoreProvider>
      </body>
    </html>
  );
}
