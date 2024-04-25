import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import SearchModal from "./search-modal";

const Navbar = () => {
  return (
    <div className="max-w-screen-2xl flex items-center h-16 justify-between w-full mx-auto px-4">
      <Link to="/home" className="flex items-center">
        <span className="h-8 w-8">
          <img
            src="/logo.gif"
            alt="enimi logo"
            className="h-full w-full object-cover -hue-rotate-180"
          />
        </span>
        <p className="font-medium text-2xl ml-2 text-pretty text-primary">enimi</p>
      </Link>

      <div className="flex items-center gap-x-3">
        {/* Search button */}
      <SearchModal />

        <Button>Login</Button>
      </div>
    </div>
  );
};
export default Navbar;
