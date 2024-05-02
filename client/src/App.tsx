// React imports
import { Navigate, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// utilities
import { cn } from "./lib/utils";

// Components
import ScrollTopTransition from "@/components/scroll-top-transition";
import Footer from "@/components/footer";
import Navbar from "@/components/shared/navbar";
import Navigator from "@/components/shared/navigator";

// pages
import {
  Alive,
  Home,
  Info,
  Landing,
  Login,
  Popular,
  Profile,
  Register,
  Search,
  Trending,
  Watch,
  WatchLater,
} from "./pages";
import AuthLayout from "./layouts/auth-layout";

import Toaster from "@/components/toaster";
import { useAuth } from "./context";
import ProtectedRoute from "./layouts/protected-route";
// import MainLayout from "./layouts/main-layouts";

export default function App() {
  const { isLoggedIn } = useAuth();

  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      {/* main enimi navbar */}
      <nav
        className={cn("w-full sticky top-0 z-[999] dark:bg-[#121212] bg-white")}
      >
        <Navbar />
      </nav>

      {/* all enimi routes! */}
      <Routes>
        <Route path="/" index element={<Landing />} />
        <Route path="/home" index element={<Home />} />
        <Route path="/:animeId" element={<Info />} />
        <Route path="/watch/:episodeId" element={<Watch />} />
        <Route path="/search" element={<Search />} />
        <Route path="/stay-alive" element={<Alive />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />

        {isLoggedIn && (
          <>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/watch-later"
              element={
                <ProtectedRoute>
                  <WatchLater />
                </ProtectedRoute>
              }
            />
          </>
        )}

        <Route element={!isLoggedIn ? <AuthLayout /> : <Navigate to="/home" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>

      {/* main application footer. */}
      <footer>
        <Footer />
      </footer>

      {/* a reseter to throw user to top whenever the pathname changes! */}
      <>
        <ScrollTopTransition />
      </>

      {/* scroll to top navigator. */}
      <>
        <Navigator />
      </>

      <Toaster />
    </HelmetProvider>
  );
}
