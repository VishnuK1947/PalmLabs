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
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');

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
          box-shadow: 0 0 0 2px rgba(73, 139, 138, 0.2);
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
       
        .sign-in-area input[type="email"]:hover,
        .sign-in-area input[type="email"]:focus {
          border-color: #498B8A !important;
          box-shadow: 0 0 0 2px rgba(73, 139, 138, 0.2);
        }

        .guest-button {
          background-color: rgba(255, 255, 255, 0.2);
          border: 2px solid white;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          transition: all 0.2s ease-in-out;
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          margin-top: 1rem;
        }
        .guest-button:hover {
          background-color: white;
          color: #498B8A;
        }
      `}</style>
      <header className="sticky top-0 z-10 flex min-h-16 backdrop-blur">
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
        </nav>
      </header>
      <main className="flex grow flex-col overflow-hidden">
        {/* Add big title at the top with reduced top margin */}
        <div className="flex justify-center items-center p-4 mt-8">
          <img
            src="public/yellow2.png"
            alt="PalmLabs Logo"
            className="h-24 mr-4"
          />
          <h1 className="text-4xl font-bold font-poppins text-white text-[120px] drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)]">
            PalmLabs
          </h1>
        </div>
        {/* Container for the sign-in area with reduced top margin */}
        <div className="flex flex-col justify-center items-center mt-4">
          <div className="sign-in-area bg-white border-4 border-white rounded-lg shadow-lg p-6">
            {children}
          </div>
          {/* Continue as Guest Button */}
          <button
            className="guest-button text-sm font-medium"
            onClick={handleGuestContinue}
          >
            Continue as Guest
          </button>
        </div>
      </main>
      <footer className="hidden sm:block">
        <div className="container py-2 text-sm leading-loose">
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