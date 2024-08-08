// react imports
import { Link, useLocation } from "react-router-dom";

// shadcn component imports.
import { Button, buttonVariants } from "@/components/ui/button";

// lucide icons imports
import { MenuIcon, Moon, Sun } from "lucide-react";

// utility functions imports
import { cn } from "@/lib/utils";

// context imports
import { useTheme } from "@/context";

// auth buttons imports
import SignedOut from "@/components/auth/signed-out";
import SignedIn from "@/components/auth/signed-in";
import UserButton from "@/components/auth/user-button";

// constants imports
import { NAVBAR_ITEMS } from "@/constants";

// components imports
import SearchModal from "@/components/shared/search-modal";

// redux imports
import { useDispatch } from "react-redux";
import { setIsMenuOpen } from "@/redux/utilities/utils.redux";

const Navbar = () => {
  const { toggleTheme } = useTheme();
  const { pathname } = useLocation();

  // redux dispatch state.
  const dispatch = useDispatch();

  const callbackUrl = encodeURIComponent(pathname);

  return (
    <div className="max-w-screen-2xl flex items-center h-16 justify-between w-full mx-auto px-4">

      <div className="flex items-center gap-x-3">
      {/* menu trigger container button */}
        <Button
          onClick={() => dispatch(setIsMenuOpen(true))}
          className="flex"
          variant="outline"
          size="icon"
        >
          <MenuIcon />
        </Button>

        {/* main application logo! */}
        <Link to="/home" className="flex items-center">
          <span className="h-8 w-8">
            <img
              src="/logo.gif"
              alt="enimi logo"
              className="h-full w-full object-cover"
            />
          </span>
        </Link>
      </div>

      {/* the navbar items... */}
      <ul className="items-center justify-between gap-x-3 hidden">
        {NAVBAR_ITEMS.map((item) => (
          <li
            className={cn(
              "hover:text-primary duration-300 font-medium hover:underline underline-offset-4",
              pathname === item.path && "underline text-primary"
            )}
            key={item.name}
          >
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center w-fit gap-x-3">
        {/* Search button */}
        <SearchModal />
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="relative flex-shrink-0"
        >
          <Sun className="h-4 w-4 absolute dark:opacity-100 opacity-0 dark:-rotate-90 rotate-0 transition-all duration-300" />
          <Moon className="h-4 w-4 absolute dark:opacity-0 opacity-100 dark:rotate-0 -rotate-90 transition-all duration-300" />
        </Button>

        {/* if user is signed out the only show this links */}
        <SignedOut className="min-w-[13rem] hidden lg:block w-full">
          <Link
            to={`/login?callbackUrl=${callbackUrl}`}
            className={cn(buttonVariants({ className: "w-full" }))}
          >
            Login
          </Link>
        </SignedOut>

        {/* show user button only to signed in user! */}
        <SignedIn className="flex items-center justify-center">
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
export default Navbar;
