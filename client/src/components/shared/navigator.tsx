import useScroll from "@/hooks/use-scroll"
import { ChevronUp } from "lucide-react";
import { Button } from "../ui/button";

const Navigator = () => {
  const { isScrolled } = useScroll()

  // if user is not scrolled the desired threshold until hide the component!
  if(!isScrolled) return null;

  const handleScrollTop = () => {
    window.scroll({ top: 0, behavior: "smooth" })
  }

  return (
    <Button onClick={handleScrollTop} size="icon" className="fixed bottom-4 right-4 grid place-items-center z-20 h-12 w-12 rounded-full">
        <ChevronUp className="h-5 w-5" />
    </Button>
  )
}
export default Navigator