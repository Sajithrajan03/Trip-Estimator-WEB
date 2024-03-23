import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Trip Estimator",
  description: "Streamlining Trip Planning Processes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[rgb(6,55,129)] min-h-screen`}>{children}</body>
    </html>
  );
}
