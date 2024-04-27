// React imports
import { Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// utilities
import { cn } from "./lib/utils";

// Components
import ScrollTopTransition from "@/components/scroll-top-transition";
import Footer from "@/components/footer";
import Navbar from "@/components/shared/navbar";
import Navigator from "@/components/shared/navigator";

// pages
import { Home, Info, Landing, Search, Watch } from "./pages";

export default function App() {
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
    </HelmetProvider>
  );
}
