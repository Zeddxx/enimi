// React imports
import { Navigate, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// utilities
import { cn } from "@/lib/utils";

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
  Verify,
  Watch,
  WatchLater,
} from "@/pages";

import Toaster from "@/components/toaster";
import { useAuth } from "@/context";
import ProtectedRoute from "@/layouts/protected-route";
import OpenedMenu from "@/components/menu/opened-menu";

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

      <header className="w-full py-2 bg-primary">
        <div className="max-w-screen-2xl w-full mx-auto px-4">
          <p className="text-center text-sm">
            If you are getting error white registering please raise an issue on <a href="https://github.com/Zeddxx/enimi" className="underline underline-offset-2" target="_blank">github</a>.
          </p>
        </div>
      </header>

      {/* Opened menu! */}
      <OpenedMenu />

      {/* all enimi routes! */}
      <Routes>
        <Route path="/" index element={<Landing />} />
        <Route path="/home" index element={<Home />} />
        <Route path="/anime/:animeId" element={<Info />} />
        <Route path="/watch/:episodeId" element={<Watch />} />
        <Route path="/search" element={<Search />} />
        <Route path="/stay-alive" element={<Alive />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/verify" element={<Verify />} />

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

        {/* <Route element={!isLoggedIn ? <AuthLayout /> : <Navigate to="/home" />}>

        </Route> */}
        {!isLoggedIn && (
          <>
            <Route
              path="/login"
              element={
                <ProtectedRoute>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute>
                  <Register />
                </ProtectedRoute>
              }
            />
          </>
        )}

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
