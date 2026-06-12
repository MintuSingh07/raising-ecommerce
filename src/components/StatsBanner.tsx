export default function StatsBanner() {
  const stats = [
    {
      value: "20+",
      label: "Years of Experience",
      icon: (
        <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      value: "500+",
      label: "Dealers Network",
      icon: (
        <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      value: "Export Quality",
      label: "Manufacturing",
      icon: (
        <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
    },
    {
      value: "Trusted",
      label: "Across India",
      icon: (
        <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative w-[90%] max-w-7xl mx-auto -mt-10 z-20">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium py-2 sm:py-4 md:py-6 px-3 sm:px-6">
        <div className="grid grid-cols-4 gap-1 sm:gap-6 lg:gap-8 divide-x divide-slate-100">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-3 lg:gap-4 text-center sm:text-left ${
                idx > 0 ? "pl-1 sm:pl-4 lg:pl-6" : ""
              }`}
            >
              <div className="flex-shrink-0 p-1 sm:p-2 bg-blue-50/50 rounded-lg sm:rounded-xl">
                {stat.icon}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-sm md:text-lg lg:text-2xl font-semibold text-dark-navy leading-none tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[8px] sm:text-[10px] md:text-xs font-medium text-slate-light mt-0.5 sm:mt-1 leading-tight">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
