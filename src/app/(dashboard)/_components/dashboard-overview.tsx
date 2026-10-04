"use client";

import { useQuery } from "@tanstack/react-query";
import { Bell, CircleDollarSign, Coins, RefreshCcw, Users } from "lucide-react";
import { useSession } from "next-auth/react";

import DashboardOverviewSkeleton from "./dashboard-overview-skeleton";
import { DashboardOverviewsApiResponse } from "./dashboard-overview-data-type";

const overviewCards = [
  {
    label: "Total Users",
    key: "totalUsers",
    fallbackKey: undefined,
    icon: Users,
    accent: "#3478FF",
    chartFill: "#F0F5FF",
    iconClass: "border-[#3478FF] bg-[#F4F7FF] text-[#3478FF]",
    trend: "M1 43 C5 31 8 32 12 29 S18 35 22 26 S28 34 33 29 S39 22 44 29 S50 33 56 26 S62 28 67 24 S73 25 78 18 S84 21 89 15 S95 17 100 8 S106 10 111 1",
    trendLabel: "+18% MoM",
    trendClass: "bg-[#F0F5FF] text-[#3478FF]",
    valuePrefix: "",
    currency: false,
  },
  {
    label: "Active Subscribers",
    key: "totalSubmissions",
    fallbackKey: undefined,
    icon: Bell,
    accent: "#0793B8",
    chartFill: "#ECFCFF",
    iconClass: "border-[#0793B8] bg-[#F0FCFF] text-[#0793B8]",
    trend: "M1 44 C5 34 9 37 14 30 S20 31 25 29 S31 35 36 27 S42 33 48 27 S54 31 59 22 S65 28 70 20 S76 25 81 17 S88 21 93 12 S100 17 105 7 S109 10 111 1",
    trendLabel: "+24 this month",
    trendClass: "bg-[#ECFCFF] text-[#0793B8]",
    valuePrefix: "",
    currency: false,
  },
  {
    label: "Monthly Revenue",
    key: "totalRevenue",
    fallbackKey: undefined,
    icon: CircleDollarSign,
    accent: "#20B75A",
    chartFill: "#EEFCF3",
    iconClass: "border-[#20B75A] bg-[#F0FCF4] text-[#20B75A]",
    trend: "M1 43 C6 31 10 35 15 28 S21 34 26 25 S32 30 37 26 S43 34 49 24 S55 30 60 22 S66 29 71 20 S77 25 82 16 S88 20 93 12 S100 16 105 6 S109 9 111 1",
    trendLabel: "+12.4% MoM",
    trendClass: "bg-[#EEFCF3] text-[#20B75A]",
    valuePrefix: "$",
    currency: true,
  },
  {
    label: "Credits Consumed",
    key: "totalPayments",
    fallbackKey: undefined,
    icon: Coins,
    valuePrefix: "",
    accent: "#F5A524",
    chartFill: "#FFFAEA",
    iconClass: "border-[#F5A524] bg-[#FFF9E9] text-[#F5A524]",
    trend: "M1 44 C6 35 10 38 15 30 S21 34 26 26 S32 30 37 24 S43 28 48 22 S54 29 59 18 S65 24 70 17 S76 20 81 13 S87 17 92 9 S99 12 104 5 S108 9 111 1",
    trendLabel: "Current billing cycle",
    trendClass: "bg-[#FFFAEA] text-[#F5A524]",
    currency: false,
  },
] as const;

function TrendChart({ color, fill, path }: { color: string; fill: string; path: string }) {
  return (
    <svg aria-hidden="true" className="h-[58px] w-[100px] shrink-0" viewBox="0 0 112 48" fill="none" preserveAspectRatio="none">
      <path d={`${path} V48 H1 Z`} fill={fill} />
      <path d={path} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
    </svg>
  );
}

const formatNumber = (value?: number) =>
  new Intl.NumberFormat("en-US").format(value ?? 0);

export function DashboardOverview() {
  const session = useSession();
  const token = (session?.data?.user as { accessToken?: string })?.accessToken;

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<DashboardOverviewsApiResponse>({
    queryKey: ["dashboard-overview"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/overview`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to fetch dashboard overview");
      }

      const response = await res.json();

      if (!response?.success) {
        throw new Error(response?.message || "Failed to fetch dashboard overview");
      }

      return response;
    },
    enabled: !!token,
  });

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <DashboardOverviewSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6">
        <div className="flex min-h-[120px] flex-col items-center justify-center rounded-lg border border-[#F3D8D8] bg-white px-5 py-6 text-center shadow-[0px_4px_8px_0px_rgba(0,0,0,0.08)]">
          <h3 className="text-base font-semibold text-[#343A40]">
            Failed to load overview
          </h3>
          <p className="mt-1 text-sm text-[#777777]">
            {error?.message || "Something went wrong while fetching dashboard data."}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 inline-flex h-10 items-center gap-2 rounded-md border border-[#6A735F] px-4 text-sm font-medium text-[#4F5B45] transition hover:bg-[#F1F2F0]"
          >
            <RefreshCcw className="h-4 w-4" />
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-3 px-4 py-3 sm:grid-cols-2 sm:px-5 lg:grid-cols-4">
      {overviewCards.map(({ label, key, fallbackKey, icon: Icon, valuePrefix = "", iconClass, currency, accent, chartFill, trend, trendLabel, trendClass }) => {
        const value = data?.data?.[key] ?? (fallbackKey ? data?.data?.[fallbackKey] : undefined) ?? 0;
        return (
        <div
          key={key}
          className="group relative min-h-[129px] overflow-hidden rounded-md border border-[#D9E1EB] bg-white px-3 py-3 shadow-[0_2px_5px_rgba(24,39,75,0.04)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(24,39,75,0.09)]"
        >
          <span className={`flex h-8 w-8 items-center justify-center rounded-[5px] border ${iconClass}`}>
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </span>
          <div className="mt-3 min-w-0 pr-[100px]">
            <p className="truncate text-[21px] font-bold leading-none tracking-[-0.02em] text-[#131928]">
              {valuePrefix}{currency ? formatNumber(value) : formatNumber(value)}
            </p>
            <p className="mt-1 truncate text-[11px] font-medium leading-none text-[#596579]">{label}</p>
            <span className={`mt-1 inline-flex rounded px-1 py-0.5 text-[9px] font-medium leading-none ${trendClass}`}>{trendLabel}</span>
          </div>
          <div className="absolute bottom-3 right-3"><TrendChart color={accent} fill={chartFill} path={trend} /></div>
        </div>
        );
      })}
    </div>
  );
}
