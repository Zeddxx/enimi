import { IAnimeInfo } from "@/types/anime.types"
import { Button } from "../ui/button"
import { converUppercase } from "@/lib/utils"

const InfoContainer = ({ info } : { info: IAnimeInfo }) => {
  
  return (
    <aside className="2xl:max-w-xs w-full p-3 border border-muted rounded">
          <div className="h-full">
            <div className="w-full rounded overflow-hidden h-28 relative before:absolute before:bottom-0 before:w-full before:h-1/2 before:left-0 before:bg-gradient-to-t before:from-[#121212] before:via-[#121212]/70 before:to-transparent before:z-10">
              <img
                src={info?.bannerImage ?? info?.coverImage.large}
                alt="anime banner image"
                className="object-cover brightness-75 h-full w-full"
              />
            </div>
            <div className="mt-1">
              <h1 className="text-xl font-semibold text-primary">
                {converUppercase(info?.title.userPreferred)}
              </h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {info?.genres.map((genre) => (
                  <span
                    key={genre}
                    className="text-xs px-2 py-px border border-muted text-muted-foreground"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* brief description. */}
              <div className="max-h-28 mt-3 overflow-y-scroll">
                <p
                  dangerouslySetInnerHTML={{ __html: info?.description ?? "" }}
                  className="text-muted-foreground"
                ></p>
              </div>

              {/* episodes */}
              <div className="mt-3">
                <p className="text-sm">
                  Total Episodes: {info?.anime_episodes.length}
                </p>
              </div>

              {/* bookmark button */}
              <Button className="w-full mt-3">
                Bookmark
              </Button>
            </div>
          </div>
        </aside>
  )
}
export default InfoContainer