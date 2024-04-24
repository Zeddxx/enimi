import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import Navbar from "./components/shared/navbar";
import Info from "./pages/info";
import ScrollTopTransition from "./components/scroll-top-transition";
import Watch from "./pages/watch";

export default function App() {
  return (
    <>
      <nav className="w-full sticky top-0 bg-white z-[99999]">
        <Navbar />
      </nav>
      <Routes>
        <Route path="/" index element={<Landing />} />
        <Route path="/:animeId" element={<Info />} />
        <Route path="/watch/:episodeId" element={<Watch />} />
      </Routes>

      <ScrollTopTransition />
    </>
  );
}
