import { useState } from "react";
import { ProteinCalculatorModel } from "../../calculators/calculators";
import RetroButton from "../ui/RetroButton";
import RetroInput from "../ui/RetroInput";
import RetroSelect from "../ui/RetroSelect";

// Pilihan tingkat aktivitas (activity level → g/kg protein)
const activityOptions = [
  { value: "0.8", label: "Sedenter — jarang olahraga (0.8 g/kg)" },
  { value: "1.0", label: "Ringan — 1-3x/minggu (1.0 g/kg)" },
  { value: "1.2", label: "Sedang — 3-5x/minggu (1.2 g/kg)" },
  { value: "1.5", label: "Aktif — 6-7x/minggu (1.5 g/kg)" },
  { value: "1.8", label: "Sangat Aktif — atlet/kerja berat (1.8 g/kg)" },
];

export default function ProteinCalculator() {
  const [formData, setFormData] = useState({
    weight: "",
    activityLevel: "1.2",
  });
  const [result, setResult] = useState(null);

  const updateField = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const calculate = (e) => {
    e.preventDefault();

    // Instansiasi model OOP dengan data dari form
    const model = new ProteinCalculatorModel(
      formData.weight,
      formData.activityLevel,
    );

    setResult({
      dailyProtein: model.dailyProtein,
      weight: model.weight,
      perKg: parseFloat(formData.activityLevel),
    });
  };

  const handleReset = () => {
    setFormData({ weight: "", activityLevel: "1.2" });
    setResult(null);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="retro-groupbox">
        <span className="retro-groupbox-label">⚙️ Data Kalkulasi</span>
        <form onSubmit={calculate} className="flex flex-col gap-3">
          <RetroInput
            label="Berat Badan (kg):"
            id="prot-weight"
            type="number"
            value={formData.weight}
            onChange={updateField("weight")}
            placeholder="cth. 70"
            required
            min="1"
            step="0.1"
          />
          <RetroSelect
            label="Tingkat Aktivitas:"
            id="prot-activity"
            value={formData.activityLevel}
            onChange={updateField("activityLevel")}
            options={activityOptions}
          />
          <div className="flex gap-2">
            <RetroButton type="submit" primary>
              Hitung Kebutuhan Protein
            </RetroButton>
            <RetroButton onClick={handleReset}>Reset</RetroButton>
          </div>
        </form>
      </div>

      {result && (
        <div className="retro-groupbox">
          <span className="retro-groupbox-label">📊 Hasil</span>

          <div
            className="flex flex-col items-center py-3 mb-3"
            style={{
              background: "#000080",
              color: "#fff",
              border: "2px inset #808080",
            }}
          >
            <div style={{ fontSize: 11, opacity: 0.8 }}>
              Kebutuhan Protein Harian
            </div>
            <div style={{ fontSize: 32, fontWeight: "bold", lineHeight: 1.2 }}>
              {result.dailyProtein} g
            </div>
            <div style={{ fontSize: 11, opacity: 0.7 }}>
              {result.perKg} g × {result.weight} kg berat badan
            </div>
          </div>

          <table className="retro-table">
            <tbody>
              <tr>
                <td className="font-bold">Total Protein</td>
                <td className="font-bold text-[#000080]">
                  {result.dailyProtein} g/hari
                </td>
              </tr>
              <tr>
                <td className="font-bold">Berat Badan</td>
                <td>{result.weight} kg</td>
              </tr>
              <tr>
                <td className="font-bold">Faktor Aktivitas</td>
                <td>{result.perKg} g/kg</td>
              </tr>
              <tr>
                <td className="font-bold">Kalori dari Protein</td>
                <td>{result.dailyProtein * 4} kcal</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
