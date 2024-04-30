import { Toaster as ReactHotToast } from "react-hot-toast";

const Toaster = () => {
  return (
    <ReactHotToast
      toastOptions={{
        className: "dark:bg-black bg-white rounded border border-muted dark:text-white",
      }}
    />
  );
};
export default Toaster;
