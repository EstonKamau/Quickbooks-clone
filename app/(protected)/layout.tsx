import HeaderAuth from "@/components/header-auth";
import Sidebar from "@/components/sidebar";
import "../globals.css";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <div className="flex h-screen relative">
          {/* Add relative positioning to the container */}
          <div className="relative z-10">
            {/* Increase z-index for sidebar container */}
            <Sidebar />
          </div>
          <div 
            className="flex-1 flex flex-col -ml-1 relative z-0" 
            id="main-content"
          >
            <header className="bg-white shadow-sm h-10 flex items-center px-5 relative z-0">
              <HeaderAuth />
            </header>
            <main className="flex-1 overflow-auto p-3">
              <div className="max-w-7xl mx-auto">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}