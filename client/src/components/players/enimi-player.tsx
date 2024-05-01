import { ISource } from "@/types/anime.types";
import Artplayer from "artplayer";
import Option from "artplayer/types/option";
import Hls from "hls.js";
import { useEffect, useState } from "react";
import Player from "./player";

type EnimiPlayerProps = {
  sources: ISource[];
};

Artplayer.LOG_VERSION = false;

const EnimiPlayer = ({ sources }: EnimiPlayerProps) => {
  const [url, setUrl] = useState<string>("");

  const fetchDefaultUrl = () => {
    if (!sources) return;

    sources &&
      sources.map((source) => {
        if (source.quality === "1080p") {
          setUrl(source.url);
        } else if (source.quality === "720p") {
          setUrl(source.url);
        } else if (source.quality === "default") {
          setUrl(source.url);
        }
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function playM3u8(video: any, url: string, art: Artplayer) {
    if (Hls.isSupported()) {
      if (art.hls) art.hls.destroy();
      const hls = new Hls();

      hls.loadSource(url);
      hls.attachMedia(video);
      art.hls = hls;

      art.on("destroy", () => hls.destroy());
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
    } else {
      art.notice.show = "Unsupported playback format: m3u8";
    }
  }

  const options: Option = {
    container: ".artplayer-app",
    url: url,
    customType: {
      m3u8: playM3u8,
    },
    icons: {
      loading: `<span class="animate-spin h-7 w-7">
        <img src="/video-loader.svg" class="invert object-contain h-full w-full" />
      </span>`,
    },
    volume: 1,
    isLive: false,
    muted: false,
    autoplay: false,
    autoOrientation: true,
    pip: true,
    autoSize: false,
    fastForward: true,
    autoMini: false,
    screenshot: false,
    setting: true,
    loop: false,
    flip: true,
    lock: true,
    playbackRate: true,
    fullscreen: true,
    fullscreenWeb: false,
    subtitleOffset: false,
    miniProgressBar: false,
    mutex: false,
    backdrop: true,
    playsInline: true,
    autoPlayback: true,
    airplay: true,
    theme: "#D6510D",
    moreVideoAttr: {
      crossOrigin: "anonymous",
    },
    quality:
      sources &&
      sources.map((source) => ({
        default: source.quality === "1080p",
        html: source.quality,
        url: source.url,
      })),
  };

  useEffect(() => {
    fetchDefaultUrl();
  }, []);

  return (
    <Player option={options} className="-z-10 art-container aspect-video" />
  );
};
export default EnimiPlayer;
