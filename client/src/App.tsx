import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import Navbar from "./components/shared/navbar";
import Info from "./pages/info";
import ScrollTopTransition from "./components/scroll-top-transition";
import Watch from "./pages/watch";
import { HelmetProvider } from "react-helmet-async";
import useScroll from "./hooks/use-scroll";
import { cn } from "./lib/utils";
import Home from "./pages/home";
import Search from "./pages/search";

export default function App() {
  const { isScrolled } = useScroll()

  const helmetContext = {}
  return (
    <HelmetProvider context={helmetContext}>
      <nav className={cn(
        "w-full fixed top-0 z-[99999] duration-300",
        isScrolled ? "bg-white" : "bg-transparent"
      )}>
        <Navbar />
      </nav>
      <Routes>
        <Route path="/" index element={<Landing />} />
        <Route path="/home" index element={<Home />} />
        <Route path="/:animeId" element={<Info />} />
        <Route path="/watch/:episodeId" element={<Watch />} />
        <Route path="/search" element={<Search />} />
      </Routes>

      <ScrollTopTransition />
    </HelmetProvider>
  );
}
