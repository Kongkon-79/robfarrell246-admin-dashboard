"use client";

import { useState } from "react";

const periods = ["30 days", "7 days", "12 months"] as const;
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Each value is a short column of tiled blocks, creating the stepped chart shown in the design.
const monthlyTiles = [
  [2, 3, 4, 5, 3], [8, 10, 11, 9, 6], [5, 7, 8, 6, 4], [3, 4, 6, 3, 2],
  [4, 7, 10, 11, 8], [9, 10, 8, 7, 5], [4, 5, 4, 3, 4], [4, 7, 10, 6, 5],
  [4, 8, 5, 4, 7], [3, 6, 3, 4, 5], [4, 5, 6, 7, 4], [3, 4, 6, 9, 4],
] as const;

const yLabels = ["$300k", "$225k", "$150k", "$75k", "$0k"];

const RevenueAndProfit = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<(typeof periods)[number]>("12 months");
  const [activeMonth, setActiveMonth] = useState(5);

  return (
    <section className="overflow-hidden rounded-md border border-[#C9D7E8] bg-white shadow-[0_2px_6px_rgba(24,39,75,0.03)]">
      <header className="flex h-[60px] items-center justify-between border-b border-[#D8DEE8] px-5">
        <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-[#131B2E]">Revenue &amp; Profit</h2>
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
      </header>

      <div className="overflow-hidden px-3 pb-3 pt-4 sm:px-4">
        <div className="relative w-full">
          <svg className="h-auto w-full" viewBox="0 0 760 348" fill="none" role="img" aria-label="Revenue and profit by month">
            <g fill="#F8FAFD">
              {Array.from({ length: 12 }).flatMap((_, row) =>
                Array.from({ length: 66 }).map((__, column) => (
                  <rect key={`${row}-${column}`} x={56 + column * 10.35} y={4 + row * 13.2} width="8.5" height="11" rx="1.5" />
                )),
              )}
            </g>

            <g fill="#64758E" fontFamily="inherit" fontSize="15" textAnchor="end">
              {yLabels.map((label, index) => <text key={label} x="45" y={18 + index * 77}>{label}</text>)}
            </g>

            {monthlyTiles.map((columns, monthIndex) =>
              columns.map((height, columnIndex) => {
                const x = 57 + monthIndex * 54.8 + columnIndex * 10.35;
                const hoverable = monthIndex === activeMonth;
                const blocks = Array.from({ length: height });
                const paleBlocks = Array.from({ length: Math.max(1, Math.round(height * 0.75)) });

                return (
                  <g key={`${monthIndex}-${columnIndex}`} onMouseEnter={() => setActiveMonth(monthIndex)} className="cursor-pointer">
                    {blocks.map((_, blockIndex) => (
                      <rect key={`dark-${blockIndex}`} x={x} y={281 - blockIndex * 13.2} width="8.5" height="11" rx="1.5" fill={hoverable ? "#536983" : "#64758E"} />
                    ))}
                    {paleBlocks.map((_, blockIndex) => (
                      <rect key={`light-${blockIndex}`} x={x} y={281 - (height + blockIndex) * 13.2} width="8.5" height="11" rx="1.5" fill={hoverable ? "#D5DFEB" : "#E0E7F0"} />
                    ))}
                  </g>
                );
              }),
            )}

            <g fill="#667A99" fontFamily="inherit" fontSize="14" textAnchor="middle">
              {months.map((month, index) => <text key={month} x={70 + index * 54.8} y="325">{month}</text>)}
            </g>
            <g fill="#667A99" fontSize="13" textAnchor="middle">
              {months.slice(0, -1).map((month, index) => <text key={`${month}-dot`} x={97.5 + index * 54.8} y="325">·</text>)}
            </g>
          </svg>

          <div
            className="pointer-events-none absolute w-[109px] rounded-md bg-white px-2.5 py-2 text-[11px] text-[#5D6D85] shadow-[0_4px_12px_rgba(35,51,82,0.10)]"
            style={{ left: `${12 + activeMonth * 7.2}%`, top: "46px" }}
          >
            <p className="border-b border-[#EEF1F5] pb-1 font-medium text-[#1D293D]">{months[activeMonth]} 2026</p>
            <p className="mt-1 flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#64758E]" />Revenue <b className="text-[#1D293D]">$100k</b></p>
            <p className="mt-1 flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#64758E]" />Profit <b className="text-[#1D293D]">$50k</b></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueAndProfit;
