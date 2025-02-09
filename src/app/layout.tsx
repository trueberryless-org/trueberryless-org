import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const jetBrainsMono = localFont({
    src: "./fonts/JetBrainsMono-Regular.woff2", // Regular weight
    variable: "--font-jetbrains-mono",
    weight: "100 900", // Assuming you have all weights available
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${jetBrainsMono.variable} antialiased`}>{children}</body>
        </html>
    );
}
