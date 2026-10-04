import { ArrowRight } from "lucide-react";

const analyses = [
  {
    name: "Sarah Jenkins, CCIM",
    email: "sarah.jenkins@austinretail.com",
    type: "Property",
    score: "76/100",
    completed: false,
  },
  {
    name: "Marcus Vance",
    email: "marcus@vancehospitality.com",
    type: "Business",
    score: "91/100",
    completed: true,
  },
  {
    name: "Elena Rostova",
    email: "elena@dallascreadvisors.com",
    type: "Property",
    score: "84/100",
    completed: true,
  },
  {
    name: "David Chen",
    email: "david@matchacraft.com",
    type: "Property",
    score: "76/100",
    completed: true,
  },
] as const;

const RecentAnalyses = () => {
  return (
    <section className="overflow-hidden rounded-md border border-[#C9D7E8] bg-white shadow-[0_2px_6px_rgba(24,39,75,0.03)]">
      <header className="flex h-[54px] items-center justify-between px-5">
        <h2 className="text-[17px] font-semibold tracking-[-0.02em] text-[#131B2E]">
          Recent Analyses
        </h2>
        <a
          href="/projects"
          className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1F64FF] transition hover:text-[#0B4DE2]"
        >
          View all <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.7} />
        </a>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] table-fixed border-collapse">
          <thead className="bg-[#E7ECF4] text-left">
            <tr className="h-[46px] text-[12px] font-medium text-[#303A4C]">
              <th className="w-[32%] px-5 font-medium">User</th>
              <th className="w-[24%] px-3 font-medium">Type</th>
              <th className="w-[22%] px-3 font-medium">Fit Score</th>
              <th className="w-[22%] px-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {analyses.map((analysis) => {
              const isHighScore = Number.parseInt(analysis.score, 10) >= 90;

              return (
                <tr key={analysis.email} className="h-[61px] border-t border-[#D8DEE8] text-[#192238]">
                  <td className="px-5 py-2">
                    <p className="max-w-[210px] truncate text-[13px] font-medium leading-4">{analysis.name}</p>
                    <p className="max-w-[210px] truncate text-[10px] leading-3 text-[#5B6980]">{analysis.email}</p>
                  </td>
                  <td className="px-3 py-2 text-[12px] text-[#3A4050]">{analysis.type}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-medium leading-3 ${isHighScore ? "bg-[#EDFCF2] text-[#08A94E]" : "bg-[#EEF7FF] text-[#2858F6]"}`}>
                      {analysis.score}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium leading-3 ${analysis.completed ? "bg-[#EDFCF2] text-[#08A94E]" : "bg-[#EEF7FF] text-[#2858F6]"}`}>
                      <span className={`h-2 w-2 rounded-full ${analysis.completed ? "bg-[#08A94E]" : "bg-[#2858F6]"}`} />
                      {analysis.completed ? "Completed" : "In Progress"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentAnalyses;
