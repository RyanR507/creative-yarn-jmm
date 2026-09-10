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
import OrderProcess from "./sections/OrderProcess";
import OrderForm from "./sections/OrderForm";
import Testimonials from "./sections/Testimonials";
import Shipping from "./sections/Shipping";
import FAQ from "./sections/FAQ";
import BrandStory from "./sections/BrandStory";
import FinalCTA from "./sections/FinalCTA";
import Footer from "./sections/Footer";

function App() {
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
        <OrderProcess />
        <OrderForm />
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
