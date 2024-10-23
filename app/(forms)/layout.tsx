import "../globals.css";
import { GeistSans } from "geist/font/sans";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <div className="max-w-7xl flex flex-col gap-12 items-start">{children}</div>
      </body>
    </html>
  );
}