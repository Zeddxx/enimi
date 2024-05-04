import React from "react"

const useScroll = (threshold = 20) => {
    const [isScrolled, setIsScrolled] = React.useState<boolean>(false)

    React.useEffect(() => {
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