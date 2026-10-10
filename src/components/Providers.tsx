"use client";

import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: {
            background: "#1c2430",
            color: "#f7f3ec",
            borderRadius: "12px",
            fontSize: "14px",
          },
        }}
      />
    </>
  );
}
