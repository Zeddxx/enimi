const AnimePoster = ({ coverImage } : { coverImage: string }) => {
  return (
    <div className="anime_card_cover shrink-0 h-max">
            <img
              draggable={false}
              src={coverImage}
              alt="anime cover image"
              className="w-full h-full object-cover"
            />
          </div>
  )
}
export default AnimePoster