const Loader = () => {
  return (
    <div className="max-w-screen-2xl mx-auto w-full px-4 min-h-[calc(100dvh-80px)] grid place-items-center">
      <div className="space-y-3">
        <div className="h-28 w-28 mx-auto">
          <img
            src="/loading.gif"
            alt="loading anime gif"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="">
          <p>Wait while we load page for you!</p>
        </div>
      </div>
    </div>
  );
};
export default Loader;
