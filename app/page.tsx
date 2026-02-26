import HeroBanner from "@/components/home/HeroBanner";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyBuyo from "@/components/home/WhyBuyo";

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <CategorySection />
      <FeaturedProducts />
      <WhyBuyo />
    </main>
  );
}