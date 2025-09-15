"use client";
import { Geist, Geist_Mono, Josefin_Slab , EB_Garamond , Inter  } from "next/font/google";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getUserInfo } from './utils/auth';
import "./globals.css";

const josefin = Josefin_Slab({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["400", "700"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const userInfo = await getUserInfo();
      if (userInfo && pathname === '/auth/signin') {
        redirectToDashboard(userInfo);
      }
    } catch (error) {
      // No session, continue normally
    } finally {
      setIsLoading(false);
    }
  };

  const redirectToDashboard = (user: any) => {
    if (user.is_staff) {
      router.push('/Dashboard/Admin');
    } else if (user.role === 'agent') {
      router.push('/Dashboard/Agent');
    } else if (user.role === 'citoyen') {
      router.push('/Dashboard/citoyen');
    }
  };

  if (isLoading) {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} ${garamond.variable} ${inter.variable} ${josefin.variable} antialiased`}>
          <div className="flex justify-center items-center h-screen">
            <div>Loading...</div>
          </div>
        </body>
      </html>
    );
  }

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
