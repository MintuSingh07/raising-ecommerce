"use client";

export default function WhatsAppButton() {
  // Configurable WhatsApp number (using India country code by default)
  // Feel free to replace the number '919999999999' with the correct business number.
  const whatsappNumber = "919999999999";
  const message = encodeURIComponent("Hello! I visited your website and would like to inquire about your products.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 group select-none">
      {/* Decorative pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" style={{ animationDuration: "3s" }} />

      {/* Tooltip */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-dark-navy text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-lg border border-white/10 opacity-0 translate-x-3 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out whitespace-nowrap">
        Chat with Us
      </div>

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-108 hover:shadow-[#25D366]/30 active:scale-95 cursor-pointer relative border border-white/10"
        aria-label="Contact us on WhatsApp"
      >
        <svg
          viewBox="0 0 16 16"
          className="w-7 h-7 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
        </svg>
      </a>
    </div>
  );
}
