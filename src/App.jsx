import { useState } from "react";
import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import ThreadDivider from "./components/ThreadDivider";
import Hero from "./sections/Hero";
import About from "./sections/About";
import WhyCreativeYarn from "./sections/WhyCreativeYarn";
import ProductCategories from "./sections/ProductCategories";
import Gallery from "./sections/Gallery";
import Personalization from "./sections/Personalization";
import HowItWorks from "./sections/HowItWorks";
import Occasions from "./sections/Occasions";
import ChristmasComingSoon from "./sections/ChristmasComingSoon";
import PackagingBox from "./sections/PackagingBox";
import ProductShowcase from "./sections/ProductShowcase";
import OrderProcess from "./sections/OrderProcess";
import CreateYourIdea from "./sections/CreateYourIdea";
import Testimonials from "./sections/Testimonials";
import Shipping from "./sections/Shipping";
import FAQ from "./sections/FAQ";
import BrandStory from "./sections/BrandStory";
import FinalCTA from "./sections/FinalCTA";
import Footer from "./sections/Footer";

function App() {
  // Lets "Quiero crear el mío" in ProductShowcase preselect a product in the
  // Phase 3 order form below, without the two sections needing to know about
  // each other directly.
  const [presetProduct, setPresetProduct] = useState(null);

  return (
    <>
      <a href="#inicio" className="skip-link">
        Saltar al contenido principal
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhyCreativeYarn />
        <ThreadDivider variant="wave" />
        <ProductCategories />
        <ThreadDivider variant="dip" />
        <Gallery />
        <Personalization />
        <ThreadDivider variant="rise" />
        <HowItWorks />
        <Occasions />
        <ChristmasComingSoon />
        <ThreadDivider variant="wave" />
        <PackagingBox />
        <ProductShowcase onSelectProduct={setPresetProduct} />
        <OrderProcess />
        <CreateYourIdea presetProduct={presetProduct} />
        <Testimonials />
        <Shipping />
        <FAQ />
        <BrandStory />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;
