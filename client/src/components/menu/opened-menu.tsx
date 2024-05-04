// react redux imports
import { useSelector, useDispatch } from "react-redux";

// shadcn components imports...
import { Button, buttonVariants } from "@/components/ui/button";

// redux stores imports
import { RootState } from "@/redux/store";
import { setIsMenuOpen } from "@/redux/utilities/utils.redux";

// utility functions...
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import { NAVBAR_ITEMS } from "@/constants";

const OpenedMenu = () => {
  // redux hooks.
  const dispatch = useDispatch();
  const { isMenuOpen } = useSelector((state: RootState) => state.setUtility);

  // react hooks.
  const { pathname } = useLocation();
  const callbackUri = encodeURIComponent(pathname);

  // and side-effect to hide the scrollbar when menu is open else add the scrollbar to right as default.
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // an sideeffect to make the menu close when event the pathname changes.
  React.useEffect(() => {
    dispatch(setIsMenuOpen(false));
  }, [pathname, dispatch]);

  return (
    <>
      {/* menu container */}
      <aside
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "fixed left-0 lg:hidden transition-[width] z-[99999] duration-300 top-0 h-screen overflow-hidden bg-white dark:bg-black py-3",
          isMenuOpen ? "w-[20rem] sm:w-[24rem]" : "w-0"
        )}
      >
        <div className="px-4 flex flex-col justify-between w-full h-full">
          <div className="space-y-7">
            <Button
              onClick={() => dispatch(setIsMenuOpen(false))}
              className="flex lg:hidden"
              variant="outline"
              size="icon"
            >
              <X className="h-5 w-5" />
            </Button>

            <ul className="flex flex-col gap-4 text-start">
              {NAVBAR_ITEMS.map((item) => (
                <li className="text-3xl" key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-primary transition-colors"
                  >
                    {item.name}.
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {isMenuOpen && (
            <Link
              className={cn(buttonVariants({ className: "w-full" }))}
              to={`/login?callbackUrl=${callbackUri}`}
            >
              Login
            </Link>
          )}
        </div>
      </aside>

      {/* menu background = */}
      {isMenuOpen && (
        <div
          onClick={() => dispatch(setIsMenuOpen(false))}
          className="fixed z-[9999] bg-black/50 w-full h-screen inset-0"
        ></div>
      )}
    </>
  );
};
export default OpenedMenu;
