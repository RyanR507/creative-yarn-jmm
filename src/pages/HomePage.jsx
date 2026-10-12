import ThreadDivider from "../components/ThreadDivider";
import Hero from "../sections/Hero";
import About from "../sections/About";
import WhyCreativeYarn from "../sections/WhyCreativeYarn";
import ProductCategories from "../sections/ProductCategories";
import HowItWorks from "../sections/HowItWorks";
import ChristmasComingSoon from "../sections/ChristmasComingSoon";
import PackagingBox from "../sections/PackagingBox";
import Testimonials from "../sections/Testimonials";
import Shipping from "../sections/Shipping";
import FAQ from "../sections/FAQ";
import BrandStory from "../sections/BrandStory";
import FinalCTA from "../sections/FinalCTA";

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <WhyCreativeYarn />
      <ThreadDivider variant="wave" />
      <ProductCategories />
      <ThreadDivider variant="dip" />
      <HowItWorks />
      <ChristmasComingSoon />
      <ThreadDivider variant="wave" />
      <PackagingBox />
      <Testimonials />
      <Shipping />
      <FAQ />
      <BrandStory />
      <FinalCTA />
    </main>
  );
}
