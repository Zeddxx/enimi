import { useEffect, useState } from "react"

const useScroll = (threshold = 20) => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false)

    useEffect(() => {
        const handleWatchScroll = () => {
            if(scrollY > threshold) {
                setIsScrolled(true);
            }else {
                setIsScrolled(false);
            }
        }

        document.addEventListener("scroll", handleWatchScroll);

        return () => {
            document.removeEventListener("scroll", handleWatchScroll);
        }
    }, [threshold])

    return { isScrolled };
}
export default useScroll