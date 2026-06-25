"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BlurText from "@/components/BlurText";
import { Home, ChevronRight, MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      
      // Reset status after a few seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 1500);
  };

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
            <span className="text-primary uppercase font-bold">Contact Us</span>
          </nav>

          {/* Hero Banner Section */}
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-slate-900 via-dark-navy to-slate-950 text-white p-8 sm:p-12 md:p-16 mb-16 shadow-premium border border-white/5 flex flex-col items-start gap-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,82,214,0.18)_0%,transparent_70%)] pointer-events-none" />
            
            <div className="max-w-3xl space-y-4 relative z-10">
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full inline-block">
                Get In Touch
              </span>
              
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight italic uppercase">
                <BlurText text="Contact Us" delay={20} animateBy="words" direction="bottom" />
              </h1>
              
              <p className="text-sm sm:text-base text-blue-50/80 leading-relaxed font-medium">
                <BlurText text="Have any questions or inquiry about our products? Reach out to us and our support team will get back to you shortly." delay={10} animateBy="words" direction="bottom" />
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
            {/* Left Side: Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-[32px] p-6 sm:p-10 border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.015)] shadow-premium">
              <h2 className="text-xl sm:text-2xl font-bold text-dark-navy mb-2 uppercase italic">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-slate-body mb-8 font-medium">
                Fill out the form below and a representative will assist you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold text-dark-navy uppercase tracking-wider block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-800 text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold text-dark-navy uppercase tracking-wider block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-800 text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-xs font-bold text-dark-navy uppercase tracking-wider block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-800 text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-bold text-dark-navy uppercase tracking-wider block">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Inquiry about product..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-800 text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold text-dark-navy uppercase tracking-wider block">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your inquiry details..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-800 text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-bold bg-primary text-white border border-white/20 shadow-lg shadow-primary/20 hover:bg-primary-navy hover:shadow-primary/35 transition-all duration-300 disabled:opacity-50 cursor-pointer active:scale-98"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5 ml-2" />
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs sm:text-sm font-semibold border border-emerald-100 animate-fadeIn">
                    ✓ Your message has been sent successfully. We will contact you soon.
                  </div>
                )}
              </form>
            </div>

            {/* Right Side: Office Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              {/* Address card */}
              <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-medium transition-all duration-300 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/[0.04] text-primary border border-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-accent">Our Location</h3>
                  <p className="text-sm font-semibold text-dark-navy leading-normal">
                    Wonder Appliances Private Limited<br />
                    E 330A, MIA, Basni Phase II<br />
                    Jodhpur - 342005, Rajasthan, India
                  </p>
                </div>
              </div>

              {/* Phone card */}
              <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-medium transition-all duration-300 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/[0.04] text-primary border border-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-accent">Phone Number</h3>
                  <p className="text-sm font-semibold text-dark-navy">
                    <a href="tel:+919468650719" className="hover:text-primary transition-colors">
                      +91- 9468650719
                    </a>
                  </p>
                </div>
              </div>

              {/* Email card */}
              <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-medium transition-all duration-300 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/[0.04] text-primary border border-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-accent">Email Address</h3>
                  <p className="text-sm font-semibold text-dark-navy">
                    <a href="mailto:info@wonderappliances.com" className="hover:text-primary transition-colors">
                      info@wonderappliances.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Working Hours card */}
              <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-medium transition-all duration-300 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/[0.04] text-primary border border-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-accent">Office Hours</h3>
                  <p className="text-sm font-semibold text-dark-navy">
                    Monday - Saturday: 9:00 AM - 6:00 PM
                  </p>
                  <p className="text-[11px] font-medium text-slate-body">
                    Sundays: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Visual */}
          <div className="w-full bg-white rounded-[32px] overflow-hidden border border-slate-150 shadow-premium p-4">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden">
              <iframe
                title="RISING Appliances Factory Location"
                src="https://maps.google.com/maps?cid=8408204520634229082&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
