import Artplayer from "artplayer"
import Option from "artplayer/types/option"
import { useEffect, useRef } from "react"

type PlayerProps = {
    className: string
    option: Option
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getInstance?: any
}

const Player = ({ className, option, getInstance } : PlayerProps) => {
  const artRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const art = new Artplayer({
        ...option,
        container: artRef.current!
    })

    art.on("video:progress", () => {
       console.log(art.currentTime);
    })

    art.on("resize", () => {
        art.subtitle.style({
            fontSize: art.height * 0.05 + "px",
        })
    })

    if(getInstance && typeof getInstance === "function") {
        getInstance(art);
    }

    return () => {
        if(art) {
            art.destroy(false)
        }
    }
  })

  return (
    <div ref={artRef} className={className} />
  )
}
export default Player