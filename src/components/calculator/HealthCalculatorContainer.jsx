import { useState } from "react";
import BMICalculator from "./BMICalculator";
import GeneticHeightCalculator from "./GeneticHeightCalculator";
import ProteinCalculator from "./ProteinCalculator";

const TABS = [
  { id: "bmi", label: "⚖️ BMI" },
  { id: "genetic", label: "🧬 Genetic" },
  { id: "protein", label: "🥩 Protein" },
];

export default function HealthCalculatorContainer() {
  const [activeTab, setActiveTab] = useState("bmi");

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* ─── Tab Navigation ─── */}
      <div className="flex border-b-2 border-[#808080] gap-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1 text-xs font-bold border-t-2 border-x-2 border-[#808080] rounded-t-sm transition-all
              ${
                activeTab === tab.id
                  ? "bg-[#d4a843] border-b-0 shadow-none"
                  : "bg-[#c0c0c0] hover:bg-[#d0d0d0]"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── Content Area ─── */}
      {/* Render kondisional agar tiap tab punya instance & state sendiri */}
      <div className="flex-1 overflow-y-auto pr-1">
        {activeTab === "bmi" && <BMICalculator />}
        {activeTab === "genetic" && <GeneticHeightCalculator />}
        {activeTab === "protein" && <ProteinCalculator />}
      </div>
    </div>
  );
}
