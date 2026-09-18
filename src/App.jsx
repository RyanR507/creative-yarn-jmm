import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import Footer from "./sections/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import PoliciesHub from "./pages/PoliciesHub";
import PolicyPage from "./pages/PolicyPage";

function ScrollToHashOnLoad() {
  // Deep links (e.g. opening the site directly at #explora-la-coleccion): the
  // browser tries to scroll to the hash before React has rendered anything,
  // so it silently fails. Retry once everything is actually on the page.
  useEffect(() => {
    if (!window.location.hash) return;
    const target = document.querySelector(window.location.hash);
    target?.scrollIntoView();
  }, []);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <Navbar />
      <ScrollToHashOnLoad />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos/:slug" element={<ProductPage />} />
        <Route path="/politicas" element={<PoliciesHub />} />
        <Route path="/politicas/:slug" element={<PolicyPage />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;
