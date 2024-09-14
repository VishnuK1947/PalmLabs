import { ReactNode } from "react";
import { GetStartedDialog } from "@/GetStarted/GetStartedDialog";

export function Layout({
  menu,
  children,
}: {
  menu?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen w-full flex-col bg-gradient-to-b from-cyan-300 via-white-300 to-yellow-300 text-white">
      <header className="sticky top-0 z-10 flex min-h-20 backdrop-blur">
        <nav className="container w-full justify-between flex flex-row items-center gap-0">
          <div className="flex items-center gap-6 md:gap-10">
            <a href="/">
              <h1 className="text-base font-semibold">React Template</h1>
            </a>
            <div className="flex items-center gap-4 text-sm">
              <GetStartedDialog>
                <button className="transition-colors hover:text-gray-300">
                  Help
                </button>
              </GetStartedDialog>
              <a
                href="https://docs.convex.dev"
                className="transition-colors hover:text-gray-300"
                target="_blank"
              >
                Docs
              </a>
            </div>
          </div>
          {menu}
        </nav>
      </header>
      <main className="flex grow flex-col overflow-hidden">
        {/* Add big title at the top */}
        <div className="flex justify-center items-center p-4 mt-20">
            <img src="public/PALMS22.png" alt="PalmLabs Logo" className="h-32 mr-4" />
            <h1 className="text-4xl font-bold [font-family:'PortLligat_Slab-Regular',Helvetica] text-white text-[150px]">PalmLabs</h1>
        </div>
        {children}
      </main>
      <footer className="hidden sm:block">
        <div className="container py-4 text-sm leading-loose">
          Built with {" "}
          <FooterLink href="https://www.convex.dev/">Convex</FooterLink>.
        </div>
      </footer>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="underline underline-offset-4 hover:no-underline"
      target="_blank"
    >
      {children}
    </a>
  );
}
