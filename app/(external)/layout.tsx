import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevLights Performance Review - External Access",
  description: "External access to DevLights Performance Review system",
};

export default function ExternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <div className="flex flex-col min-h-screen">
          <header className="bg-primary text-white px-4 py-3 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/white-logo.png"
                  alt="DevLights Logo"
                  width={40}
                  height={40}
                  priority
                />
              </div>
            </div>
          </header>
          
          <main className="flex-grow py-6">
            {children}
          </main>
          
          <footer className="mt-auto bg-gray-100 py-4 border-t">
            <div className="container mx-auto px-4 text-center text-sm text-gray-500">
              <p>© {new Date().getFullYear()} DevLights. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}