import { useEffect } from "react";

export function useScrollToTop({ children, location: { pathname } }) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return children || null;
}
