import React from "react";
import { useLocation } from "react-router-dom";

const ScrollTopTransition = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0, left: 0 });
  }, [pathname]);

  return null;
};
export default ScrollTopTransition;
