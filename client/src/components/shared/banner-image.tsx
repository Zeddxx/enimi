const BannerImage = ({ bannerImage } : { bannerImage: string }) => {
  return (
    <div className="info_banner_container">
        <img
          src={bannerImage}
          alt="anime banner image"
          className="h-full w-full object-cover"
        />
      </div>
  )
}
export default BannerImage