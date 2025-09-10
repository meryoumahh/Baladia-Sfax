import type { Metadata } from "next";
import { Geist, Geist_Mono, Josefin_Slab , EB_Garamond , Inter  } from "next/font/google";
import "./globals.css";



const josefin = Josefin_Slab({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["400", "700"], // choose the weights you need
});

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reclamation App",
  description: "Created with love <3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${garamond.variable} ${inter.variable} ${josefin.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
