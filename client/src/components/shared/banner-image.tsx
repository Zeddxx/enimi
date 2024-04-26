const BannerImage = ({ bannerImage, fallbackImg } : { bannerImage: string, fallbackImg: string }) => {
  return (
    <div className="info_banner_container">
        <img
          src={bannerImage ?? fallbackImg}
          alt="anime banner image"
          className="h-full w-full object-cover"
        />
      </div>
  )
}
export default BannerImage