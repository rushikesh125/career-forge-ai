"use client"
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/store/store";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <Provider store={store}>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
