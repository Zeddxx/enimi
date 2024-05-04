import React from "react";

// anime typpes imports.
import { ISource } from "@/types/anime.types";

// enimi player imports
import Artplayer from "artplayer";
import Player from "./player";
import Option from "artplayer/types/option";

// player plugin imports
import Hls from "hls.js";

type EnimiPlayerProps = {
  sources: ISource[];
  id: string
};

// to disable the version of artplayer displaying on console
Artplayer.LOG_VERSION = false;

const EnimiPlayer = ({ sources, id }: EnimiPlayerProps) => {
  // to store the url of the anime video quality.
  const [url, setUrl] = React.useState<string>("");

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
    id: id,
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

  React.useEffect(() => {
    fetchDefaultUrl();
  }, []);

  return (
    <Player option={options} className="-z-10 art-container aspect-video" />
  );
};
export default EnimiPlayer;
