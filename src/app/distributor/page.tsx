"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BlurText from "@/components/BlurText";
import { Home, ChevronRight, Award, ShieldCheck, Truck, Percent, Send } from "lucide-react";

export default function DistributorPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    investment: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        location: "",
        experience: "",
        investment: "",
        message: "",
      });
      
      // Reset status after a few seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 1500);
  };

  const benefits = [
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      title: "Market Leadership",
      desc: "Represent a household brand in portable lighting with 35+ years of production heritage and quality assurance.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: "Premium Quality & R&D",
      desc: "Access fully-certified, highly durable, and environmentally conscious LED products from our cutting-edge labs.",
    },
    {
      icon: <Truck className="w-6 h-6 text-primary" />,
      title: "Priority Supply & Logistics",
      desc: "Gain priority access to product launches, robust warehouse supply pipelines, and express transit updates.",
    },
    {
      icon: <Percent className="w-6 h-6 text-primary" />,
      title: "Profitable B2B Margins",
      desc: "Enjoy highly competitive reseller margins, dedicated account support, and promotional resources to scale.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/20 font-sans">
      <Navbar />

      <main className="flex-grow pt-24 lg:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-[11px] sm:text-xs font-semibold text-slate-light mb-8 select-none tracking-wide">
            <Link href="/" className="hover:text-primary transition-colors uppercase flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-350" />
            <span className="text-primary uppercase font-bold">Become a Distributor</span>
          </nav>

          {/* Hero Banner Section */}
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-slate-900 via-dark-navy to-slate-950 text-white p-8 sm:p-12 md:p-16 mb-16 shadow-premium border border-white/5 flex flex-col items-start gap-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,82,214,0.18)_0%,transparent_70%)] pointer-events-none" />
            
            <div className="max-w-3xl space-y-4 relative z-10">
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full inline-block">
                Distributorship Opportunities
              </span>
              
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight italic uppercase">
                <BlurText text="Become a Distributor" delay={20} animateBy="words" direction="bottom" />
              </h1>
              
              <p className="text-sm sm:text-base text-blue-50/80 leading-relaxed font-medium">
                <BlurText text="Join our extensive network of distributors, stockists, and dealers across India. Leverage RISING's state-of-the-art facilities and brand reputation to grow your business." delay={10} animateBy="words" direction="bottom" />
              </p>
            </div>
          </div>

          {/* Key Reseller Benefits Grid */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-accent block">
                Reseller Advantages
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-dark-navy tracking-tight uppercase italic">
                Why Distribute RISING Products?
              </h2>
              <div className="w-12 h-1 bg-primary rounded-full mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="bg-white rounded-[28px] p-6 border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/[0.04] border border-primary/10 flex items-center justify-center flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-dark-navy tracking-tight leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-body leading-relaxed font-medium">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Form Application Block */}
          <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-slate-100/80 shadow-premium max-w-4xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-dark-navy uppercase italic">
                Distributorship Application
              </h2>
              <p className="text-xs sm:text-sm text-slate-body font-medium">
                Submit details about your business setup below, and our B2B sales team will evaluate your profile.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="companyName" className="text-xs font-bold text-dark-navy uppercase tracking-wider block">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter registered business name"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-800 text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contactName" className="text-xs font-bold text-dark-navy uppercase tracking-wider block">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-800 text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold text-dark-navy uppercase tracking-wider block">
                    Business Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="business@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-800 text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs font-bold text-dark-navy uppercase tracking-wider block">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-800 text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label htmlFor="location" className="text-xs font-bold text-dark-navy uppercase tracking-wider block">
                    Preferred Territory (City, State)
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Jodhpur, Rajasthan"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-800 text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="experience" className="text-xs font-bold text-dark-navy uppercase tracking-wider block">
                    Business Experience (Years)
                  </label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    required
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g. 5"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-800 text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="investment" className="text-xs font-bold text-dark-navy uppercase tracking-wider block">
                    Expected Investment Capability
                  </label>
                  <select
                    id="investment"
                    name="investment"
                    required
                    value={formData.investment}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-800 text-sm font-semibold focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-300 cursor-pointer"
                  >
                    <option value="" disabled>Select range</option>
                    <option value="under-5l">Under ₹5 Lakhs</option>
                    <option value="5l-10l">₹5 Lakhs - ₹10 Lakhs</option>
                    <option value="10l-25l">₹10 Lakhs - ₹25 Lakhs</option>
                    <option value="above-25l">Above ₹25 Lakhs</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold text-dark-navy uppercase tracking-wider block">
                  Additional Details / Current Products
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your current distribution network and product offerings..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-800 text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-bold bg-primary text-white border border-white/20 shadow-lg shadow-primary/20 hover:bg-primary-navy hover:shadow-primary/35 transition-all duration-300 disabled:opacity-50 cursor-pointer active:scale-98"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <Send className="w-3.5 h-3.5 ml-2" />
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs sm:text-sm font-semibold border border-emerald-100 animate-fadeIn">
                  ✓ Your application has been submitted successfully. Our distributorship team will contact you.
                </div>
              )}
            </form>
          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
