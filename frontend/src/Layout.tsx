import { ReactNode } from "react";
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
          background-color: black;
          color: white;
          border: 2px solid black;
          border-radius: 4px;
          padding: 0.5rem;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .sign-in-area button:has(.github-button):hover {
          background-color: #333333 !important;
          color: #ffffff;
        }
        .sign-in-area input[type="email"]:hover,
        .sign-in-area input[type="email"]:focus {
          border-color: #498B8A !important;
        }
        .guest-button {
          background-color: rgba(73, 139, 138, 0.4);
          border: 0px solid white;
          color: 498B8A;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          transition: all 0.3s ease-in-out;
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          margin-top: 1rem;
          box-shadow: 0 0 10px 3px rgba(0, 255, 255, 0.3);
        }
        .guest-button:hover {
          background-color: white;
          color: #498B8A;
          box-shadow: 0 0 15px 5px rgba(0, 255, 255, 0.5);
        }
        .logo {
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
          transition: filter 0.3s ease;
        }
        .logo:hover {
          filter: drop-shadow(0 6px 8px rgba(0, 0, 0, 0.5));
        }
      `}</style>
      <header className="sticky top-0 z-10 flex min-h-16 backdrop-blur">
        <nav className="container w-full justify-between flex flex-row items-center gap-0">
          <div className="flex items-center gap-6 md:gap-10">
            <a href="/"></a>
            <div className="flex items-center gap-4 text-sm"></div>
          </div>
          {menu}
        </nav>
      </header>
      <main className="flex grow flex-col overflow-hidden">
        <div className="flex justify-center items-center p-4 mt-8">
          <img
            src="public/yellow2.png"
            alt="PalmLabs Logo"
            className="h-24 mr-4 logo"
          />
          <h1 className="text-4xl font-bold font-poppins text-white text-[100px] drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)]">
            PalmLabs
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center mt-12">
          <div className="sign-in-area bg-white border-4 border-white rounded-lg shadow-lg p-6">
            {children}
          </div>
          <button
            className="guest-button text-sm font-medium mt-4"
            onClick={handleGuestContinue}
          >
            Continue as Guest
          </button>
        </div>
      </main>
      <Toaster />
    </div>
  );
}