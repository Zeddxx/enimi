const Footer = () => {
  return (
    <div className="max-w-screen-2xl mx-auto w-full px-4 mt-12 border-t border-muted py-6">
      <div className="flex flex-col items-center gap-4 justify-center">
        <div className="flex gap-2 flex-col items-center">
          <div className="h-10 w-10">
            <img
              src="/logo.gif"
              className="h-full w-full object-cover"
              alt="enimi logo gif"
            />
          </div>
          <h6 className="text-primary text-4xl font-medium">enimi</h6>
        </div>

        <div className="w-full">
            <p className="text-sm text-center text-muted-foreground">
                enimi does not store any anime data and enimi is just created for learning purpose only and the intentions are just to show this project as a source of knowledge.
            </p>
            <p className="text-sm text-center text-muted-foreground">
                Any queries related to this project can be listen on <a className="text-primary underline underline-offset-2" href="https://github.com/Zeddxx/enimi" target="_blank">GitHub</a>
            </p>
        </div>

        <div className="">
            <p className="">
                All right reserved to its corresponding developer.
            </p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
