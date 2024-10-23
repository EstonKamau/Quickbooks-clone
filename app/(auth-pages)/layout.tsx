import "../globals.css";
import HeaderAuth from "@/components/header-auth";
import { ThemeProvider } from "next-themes";
import { GeistSans } from "geist/font/sans";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col">
            <nav className="w-full flex justify-between items-center border-b border-b-foreground/10 h-16 p-3"> {/* Full width */}
              <div className="flex gap-5 items-center font-semibold">
                <Link href={"/"}>QuickBooks Clone</Link>
              </div>
              <div>
                <HeaderAuth />
              </div>
            </nav>
            <div className="flex-1 flex flex-col gap-20 items-center">
              <div className="flex flex-col gap-20 max-w-5xl p-5 w-full"> {/* Center content within max width */}
                {children}
              </div>
            </div>
            <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
              <p>
                Powered by{" "}
                <a
                  href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                  target="_blank"
                  className="font-bold hover:underline"
                  rel="noreferrer"
                >
                  Eston
                </a>
              </p>
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}