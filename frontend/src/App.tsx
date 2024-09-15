import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Chat } from "@/Chat/Chat";
import { ChatIntro } from "@/Chat/ChatIntro";
import { Layout } from "@/Layout";
import { SignInForm } from "@/SignInForm";
import { UserMenu } from "@/components/UserMenu";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import GuestPage from "@/components/GuestPage";


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
        <Route path="/guest-page" element={
          <GuestPage>
          </GuestPage>
        } />
      </Routes>
    </Router>
  );
}