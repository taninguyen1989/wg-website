import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/src/context/LanguageContext";

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-jakarta",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
});

export const metadata: Metadata = {
    title: "WG Technology JSC - Luxury Enterprise",
    description: "Modern minimalist website for WG",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${jakarta.variable} ${playfair.variable} font-sans antialiased text-foreground bg-background`}>
                <LanguageProvider>
                    {children}
                </LanguageProvider>
            </body>
        </html>
    );
}
