"use client";

import { ConfigProvider, theme } from "antd";
import { PropsWithChildren } from "react";

const AntdProvider = ({ children }: PropsWithChildren) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#1677ff",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdProvider;
