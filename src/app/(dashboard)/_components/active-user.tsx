"use client";

import { useState } from "react";

const periods = ["30 days", "7 days", "12 months"] as const;
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// These points keep the tooltip values aligned with the two lines in the chart.
const monthlyActivity = [
  { completed: 0, inProgress: 0, completedY: 376, inProgressY: 376 },
  { completed: 520_000, inProgress: 1_200_000, completedY: 183, inProgressY: 121 },
  { completed: 640_000, inProgress: 1_650_000, completedY: 139, inProgressY: 54 },
  { completed: 120_000, inProgress: 450_000, completedY: 223, inProgressY: 158 },
  { completed: 70_000, inProgress: 170_000, completedY: 289, inProgressY: 237 },
  { completed: 75_000, inProgress: 150_000, completedY: 282, inProgressY: 237 },
  { completed: 90_000, inProgress: 220_000, completedY: 269, inProgressY: 219 },
  { completed: 45_000, inProgress: 35_000, completedY: 311, inProgressY: 284 },
  { completed: 35_000, inProgress: 5_000, completedY: 319, inProgressY: 370 },
  { completed: 80_000, inProgress: 180_000, completedY: 204, inProgressY: 318 },
  { completed: 500_000, inProgress: 580_000, completedY: 147, inProgressY: 166 },
  { completed: 450_000, inProgress: 460_000, completedY: 168, inProgressY: 171 },
] as const;

const formatUsers = (value: number) => new Intl.NumberFormat("en-US").format(value);

const ActiveUser = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<(typeof periods)[number]>("12 months");
  const [activeMonth, setActiveMonth] = useState<number | null>(null);

  return (
    <section className="overflow-hidden rounded-[3px] border border-[#C9D7E8] bg-white shadow-[0_2px_6px_rgba(24,39,75,0.03)]">
      <header className="flex flex-col gap-3 border-b border-[#D8DEE8] px-4 py-3 sm:h-[60px] sm:flex-row sm:items-center sm:justify-between sm:py-0">
        <h2 className="text-[18px] font-semibold leading-none tracking-[-0.02em] text-[#131B2E]">Active User</h2>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1 rounded-md bg-[#EDFCF2] px-2 py-1 text-[11px] font-medium leading-3 text-[#08A94E]">
            <span className="h-2 w-2 rounded-full bg-[#08A94E]" /> Completed
          </div>
          <div className="inline-flex items-center gap-1 rounded-md bg-[#EEF7FF] px-2 py-1 text-[11px] font-medium leading-3 text-[#2858F6]">
            <span className="h-2 w-2 rounded-full bg-[#2858F6]" /> In Progress
          </div>
          <div className="inline-flex rounded-[3px] border border-[#E1E8F2] bg-[#FBFCFE] p-0.5">
            {periods.map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setSelectedPeriod(period)}
                className={`rounded-[3px] px-3 py-[7px] text-[10px] font-medium leading-none transition sm:px-3.5 ${selectedPeriod === period ? "bg-[#285DE7] text-white shadow-sm" : "text-[#55647B] hover:bg-[#F0F4FA]"}`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="overflow-hidden px-4 pb-3 pt-4 sm:px-4">
        <div className="relative w-full">
          <svg
            className="h-auto w-full"
            viewBox="0 0 940 405"
            fill="none"
            role="img"
            aria-label="Active user completed and in-progress activity by month. Hover or focus a month to view user totals."
            onMouseLeave={() => setActiveMonth(null)}
          >
            <g stroke="#DCE5F1" strokeWidth="1">
              <path d="M64 18H926" />
              <path d="M64 88H926" />
              <path d="M64 160H926" />
              <path d="M64 232H926" />
              <path d="M64 304H926" />
              <path d="M64 376H926" />
            </g>

            <g fill="#667A99" fontFamily="inherit" fontSize="16" textAnchor="end">
              <text x="48" y="24">5M</text>
              <text x="48" y="94">1M</text>
              <text x="48" y="166">500k</text>
              <text x="48" y="238">100k</text>
              <text x="48" y="310">50k</text>
              <text x="48" y="382">0</text>
            </g>

            <path
              d="M64 376 C88 292 109 218 137 183 C165 147 190 135 217 139 C245 142 254 182 279 223 C304 264 336 282 373 289 C410 296 430 286 451 282 C475 278 502 267 531 269 C562 272 575 290 603 311 C630 331 661 331 686 319 C713 307 735 263 764 204 C792 145 811 139 837 147 C867 156 889 170 926 168"
              stroke="#159E4A"
              strokeDasharray="8 8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="5"
            />

            <path
              d="M64 376 C91 276 112 181 140 121 C167 65 191 47 218 54 C248 61 265 115 293 158 C321 202 340 228 373 237 C405 246 425 247 452 237 C479 227 507 213 535 219 C564 225 578 243 592 284 C606 326 628 363 658 370 C690 378 711 357 732 318 C758 271 782 195 811 166 C838 138 858 142 881 151 C903 160 915 164 926 171"
              stroke="#285DE7"
              strokeDasharray="8 8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="5"
            />

            {activeMonth !== null && (
              <g pointerEvents="none">
                <path d={`M${64 + activeMonth * 78.36} 18V376`} stroke="#AFC2DF" strokeDasharray="4 4" strokeWidth="1.5" />
                <circle cx={64 + activeMonth * 78.36} cy={monthlyActivity[activeMonth].completedY} r="6" fill="white" stroke="#159E4A" strokeWidth="3" />
                <circle cx={64 + activeMonth * 78.36} cy={monthlyActivity[activeMonth].inProgressY} r="6" fill="white" stroke="#285DE7" strokeWidth="3" />
              </g>
            )}

            <g>
              {months.map((month, index) => {
                const startX = index === 0 ? 64 : 64 + (index - 0.5) * 78.36;
                const width = index === 0 || index === months.length - 1 ? 39.18 : 78.36;

                return (
                  <rect
                    key={`${month}-hover-target`}
                    x={startX}
                    y="18"
                    width={width}
                    height="358"
                    fill="transparent"
                    tabIndex={0}
                    role="button"
                    aria-label={`${month}: ${formatUsers(monthlyActivity[index].completed)} completed users and ${formatUsers(monthlyActivity[index].inProgress)} in-progress users`}
                    onMouseEnter={() => setActiveMonth(index)}
                    onFocus={() => setActiveMonth(index)}
                    onBlur={() => setActiveMonth(null)}
                    onClick={() => setActiveMonth(index)}
                  />
                );
              })}
            </g>

            <g fill="#667A99" fontFamily="inherit" fontSize="16" textAnchor="middle">
              {months.map((month, index) => (
                <text key={month} x={64 + index * 78.36} y="400">{month}</text>
              ))}
            </g>
            <g fill="#667A99" fontSize="14" textAnchor="middle">
              {months.slice(0, -1).map((month, index) => (
                <text key={`${month}-divider`} x={103 + index * 78.36} y="400">·</text>
              ))}
            </g>
          </svg>

          {activeMonth !== null && (
            <div
              className="pointer-events-none absolute top-3 z-10 w-[164px] rounded-md border border-[#E4EBF4] bg-white px-3 py-2 text-[11px] shadow-[0_5px_16px_rgba(35,51,82,0.14)]"
              style={{
                left: `${(activeMonth / (months.length - 1)) * 100}%`,
                transform: `translateX(${activeMonth > 8 ? "-100%" : activeMonth === 0 ? "0" : "-35%"})`,
              }}
              role="status"
              aria-live="polite"
            >
              <p className="border-b border-[#EEF1F5] pb-1.5 font-semibold text-[#1D293D]">{months[activeMonth]} 2026</p>
              <p className="mt-1.5 flex items-center justify-between gap-3 text-[#159E4A]">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#159E4A]" />Completed</span>
                <b className="font-semibold text-[#1D293D]">{formatUsers(monthlyActivity[activeMonth].completed)}</b>
              </p>
              <p className="mt-1 flex items-center justify-between gap-3 text-[#285DE7]">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#285DE7]" />In Progress</span>
                <b className="font-semibold text-[#1D293D]">{formatUsers(monthlyActivity[activeMonth].inProgress)}</b>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ActiveUser;
