import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBanner from "@/components/StatsBanner";
import Categories from "@/components/Categories";
import Manufacturing from "@/components/Manufacturing";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedProducts from "@/components/FeaturedProducts";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/20 font-sans">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <StatsBanner />
        <Categories />
        <Manufacturing />
        <WhyChooseUs />
        <FeaturedProducts />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}

