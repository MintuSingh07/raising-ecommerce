import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer id="contact" className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-slate-100">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-6">
            <Link href="/" className="flex items-center group">
              <div className="relative h-[50px] w-[109px] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="RISING Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            
            <p className="text-sm text-slate-body leading-relaxed max-w-sm">
              Leading manufacturer of industrial lighting and appliances, delivering quality, reliability & performance across India. Engineered for every challenge.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <Link href="https://linkedin.com" className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-light hover:bg-primary hover:text-white hover:border-primary transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
              {/* Facebook */}
              <Link href="https://facebook.com" className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-light hover:bg-primary hover:text-white hover:border-primary transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                </svg>
              </Link>
              {/* Instagram */}
              <Link href="https://instagram.com" className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-light hover:bg-primary hover:text-white hover:border-primary transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              {/* YouTube */}
              <Link href="https://youtube.com" className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-light hover:bg-primary hover:text-white hover:border-primary transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.163c-.272-.98-1.04-1.748-2.02-2.02-1.78-.48-8.978-.48-8.978-.48s-7.198 0-8.978.48c-.98.272-1.748 1.04-2.02 2.02-.48 1.78-.48 8.978-.48 8.978s0 7.198.48 8.978c.272.98 1.04 1.748 2.02 2.02 1.78.48 8.978.48 8.978.48s7.198 0 8.978-.48c.98-.272 1.748-1.04 2.02-2.02.48-1.78.48-8.978.48-8.978s0-7.198-.48-8.978zm-14.498 11.337v-9l6 4.5-6 4.5z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Links Column 1: Products */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-sm font-semibold text-dark-navy tracking-wider uppercase">Products</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-light">
              <li><Link href="/collections/torches" className="hover:text-primary transition-colors">LED Torches</Link></li>
              <li><Link href="/collections/spotlights" className="hover:text-primary transition-colors">Spotlights</Link></li>
              <li><Link href="/collections/emergency-lights" className="hover:text-primary transition-colors">Emergency Lights</Link></li>
              <li><Link href="/collections/rechargeable" className="hover:text-primary transition-colors">Rechargeable Products</Link></li>
              <li><Link href="/collections/industrial" className="hover:text-primary transition-colors">Industrial Solutions</Link></li>
            </ul>
          </div>

          {/* Links Column 2: Company */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-sm font-semibold text-dark-navy tracking-wider uppercase">Company</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-light">
              <li><Link href="/#about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#quality" className="hover:text-primary transition-colors">Quality Assurance</Link></li>
              <li><Link href="#careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/#contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Links Column 3: Resources */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-sm font-semibold text-dark-navy tracking-wider uppercase">Resources</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-light">
              <li><Link href="#brochure" className="hover:text-primary transition-colors">Brochure</Link></li>
              <li><Link href="/#product" className="hover:text-primary transition-colors">Products</Link></li>
              <li><Link href="#warranty" className="hover:text-primary transition-colors">Warranty</Link></li>
              <li><Link href="#downloads" className="hover:text-primary transition-colors">Downloads</Link></li>
              <li><Link href="#faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Links Column 4: Contact info */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-sm font-semibold text-dark-navy tracking-wider uppercase">Contact Us</h4>
            <ul className="space-y-3 text-xs font-medium text-slate-light">
              <li className="flex gap-2">
                <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>F-30, Industrial Area, Narela, Delhi - 110040, India</span>
              </li>
              <li className="flex gap-2 items-center">
                <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+91 11 4707 2571</span>
              </li>
              <li className="flex gap-2 items-center">
                <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8m-2 11H4a2 2 0 01-2-2V7a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2z" />
                </svg>
                <span>info@risingappliances.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-xs font-medium text-slate-light gap-4">
          <span>© 2026 Rising Appliances. All Rights Reserved.</span>
          <div className="flex gap-4">
            <Link href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
