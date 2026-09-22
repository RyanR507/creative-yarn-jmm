import { useLayoutEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigationType } from "react-router-dom";
import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import Footer from "./sections/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import PoliciesHub from "./pages/PoliciesHub";
import PolicyPage from "./pages/PolicyPage";
import NotFoundPage from "./pages/NotFoundPage";
import { jumpScroll, jumpToTop } from "./utils/scroll";

// React Router swaps pages without a browser navigation, so the browser
// neither scrolls to a "#section" in the new page nor resets the scroll
// position. This does both, only when the PAGE changes:
//  - arriving with a hash (e.g. "/#personalizados") -> jump to that section;
//  - arriving without one -> start at the top;
//  - first load with a hash (deep link) -> jump to it, since the browser tried
//    before React had rendered anything;
//  - back/forward -> left alone so the browser restores its own position;
//  - a hash change inside the same page -> left to the browser's native
//    (smooth) anchor scrolling.
function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const previousPathname = useRef(null);

  // Layout effect: runs after the new page is in the DOM but before the
  // browser paints, so there's no flash of the old scroll position.
  useLayoutEffect(() => {
    const isFirstRender = previousPathname.current === null;
    const pathChanged = previousPathname.current !== pathname;
    previousPathname.current = pathname;

    if (!isFirstRender && (!pathChanged || navigationType === "POP")) return undefined;

    const id = hash ? decodeURIComponent(hash.slice(1)) : "";
    const target = id ? document.getElementById(id) : null;

    if (!target) {
      if (!isFirstRender) jumpToTop();
      return undefined;
    }

    jumpScroll(() => target.scrollIntoView());

    // Images/layout above the target can still be settling; re-align once if
    // the visitor hasn't scrolled in the meantime.
    const landedAt = window.scrollY;
    const timer = window.setTimeout(() => {
      if (window.scrollY !== landedAt) return;
      const expectedTop = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      if (Math.abs(target.getBoundingClientRect().top - expectedTop) > 8) {
        jumpScroll(() => target.scrollIntoView());
      }
    }, 400);
    return () => window.clearTimeout(timer);
  }, [pathname, hash, key, navigationType]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <Navbar />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos/:slug" element={<ProductPage />} />
        <Route path="/politicas" element={<PoliciesHub />} />
        <Route path="/politicas/:slug" element={<PolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;
