import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Chat } from "@/Chat/Chat";
import { ChatIntro } from "@/Chat/ChatIntro";
import { Layout } from "@/Layout";
import { SignInForm } from "@/SignInForm";
import { UserMenu } from "@/components/UserMenu";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

// New GuestPage component
const GuestPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-cyan-300 via-white-300 to-yellow-300">
      <h1 className="text-4xl font-bold text-white mb-4">Welcome, Guest!</h1>
      <p className="text-xl text-white">This is your basic guest page.</p>
    </div>
  );
};

// Main content component
const MainContent = () => {
  const navigate = useNavigate();
  const user = useQuery(api.users.viewer);

  const handleGuestContinue = () => {
    navigate('/guest-page');
  };

  return (
    <Layout 
      onGuestContinue={handleGuestContinue}
      menu={ 
        <Authenticated>
          <UserMenu>{user?.name ?? user?.email}</UserMenu>
        </Authenticated>
      }
    >
      <>
        <Authenticated>
          <ChatIntro />
          <Chat viewer={(user ?? {})._id!} />
        </Authenticated>
        <Unauthenticated>
          <SignInForm />
        </Unauthenticated>
      </>
    </Layout>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/guest-page" element={<GuestPage />} />
      </Routes>
    </Router>
  );
}