import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBanner from "@/components/StatsBanner";
import Categories from "@/components/Categories";
import Manufacturing from "@/components/Manufacturing";
import VersatileUsage from "@/components/VersatileUsage";
import AboutUs from "@/components/AboutUs";
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
        <VersatileUsage />
        <AboutUs />
        <FeaturedProducts />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}

