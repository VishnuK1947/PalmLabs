import { ReactNode, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export function Layout({
  menu,
  children,
  onGuestContinue,
}: {
  menu?: ReactNode;
  children: ReactNode;
  onGuestContinue: () => void;
}) {
  const { toast } = useToast();

  const handleGuestContinue = (event: React.MouseEvent) => {
    event.preventDefault();
    toast({
      title: "Continuing as Guest",
      description: "You're being redirected to the next page.",
    });
    onGuestContinue();
  };

  return (
    <div className="flex h-screen w-full flex-col bg-gradient-to-br from-cyan-300 via-white-300 to-yellow-300 text-white">
      <style jsx global>{`
        .sign-in-area {
          color: #498B8A;
        }
        .sign-in-area button {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: all 0.2s ease-in-out;
        }
        .sign-in-area button:hover {
          box-shadow: 0 10px 15px -3px rgba(100, 100, 1000, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .sign-in-area button[type="submit"],
        .sign-in-area button:has(.send-sign-in-link) {
          background-color: #498B8A;
          color: white;
          transition: all 0.2s ease-in-out;
        }
        .sign-in-area button[type="submit"]:hover,
        .sign-in-area button:has(.send-sign-in-link):hover {
          background-color: black;
        }
        .sign-in-area button:has(.github-button) {
          background-color: #00CED1 !important;
          color: white !important;
          border: none !important;
          transition: all 0.2s ease-in-out;
        }
        .sign-in-area button:has(.github-button):hover {
          background-color: #008B8B !important;
        }
        .sign-in-area input[type="email"] {
          border-color: #D3D3D3 !important; /* Light grey */
          border-width: 1px !important;
          transition: all 0.2s ease-in-out;
        }
        .sign-in-area input[type="email"]:hover,
        .sign-in-area input[type="email"]:focus {
          border-color: #498B8A !important;
          box-shadow: 0 0 0 2px rgba(73, 139, 138, 0.2);
        }
      `}</style>
      <header className="sticky top-0 z-10 flex min-h-20 backdrop-blur">
        <nav className="container w-full justify-between flex flex-row items-center gap-0">
          <div className="flex items-center gap-6 md:gap-10">
            <a href="/">
              {/* Logo or brand name can go here */}
            </a>
            <div className="flex items-center gap-4 text-sm">
              {/* Other header elements */}
            </div>
          </div>
          {menu}
          <div className="flex items-center gap-4">
            {/* Continue as Guest Link */}
            <a
              href="#"
              className="transition-colors hover:text-gray-300 text-sm"
              onClick={handleGuestContinue}
            >
              Continue as Guest
            </a>
          </div>
        </nav>
      </header>
      <main className="flex grow flex-col overflow-hidden">
        {/* Add big title at the top */}
        <div className="flex justify-center items-center p-4 mt-20">
          <img
            src="public/yellow2.png"
            alt="PalmLabs Logo"
            className="h-32 mr-4"
          />
          <h1 className="text-4xl font-bold [font-family:'PortLligat_Slab-Regular',Helvetica] text-white text-[150px]">
            PalmLabs
          </h1>
        </div>
        {/* Container for the sign-in area with white border, drop shadow, curved edges, and teal text */}
        <div className="flex justify-center items-center mt-8">
          <div className="sign-in-area bg-white border-4 border-white rounded-lg shadow-lg p-8">
            {children}
          </div>
        </div>
      </main>
      <footer className="hidden sm:block">
        <div className="container py-4 text-sm leading-loose">
          {/* Additional footer content */}
        </div>
      </footer>
      <Toaster />
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