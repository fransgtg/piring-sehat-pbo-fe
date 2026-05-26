import { useState } from "react";
import { BMICalculatorModel } from "../../calculators/calculators";
import RetroButton from "../ui/RetroButton";
import RetroInput from "../ui/RetroInput";
import RetroSelect from "../ui/RetroSelect";

export default function BMICalculator() {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "male",
  });
  const [result, setResult] = useState(null);

  const genderOptions = [
    { value: "male", label: "Laki-laki" },
    { value: "female", label: "Perempuan" },
  ];

  const updateField = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const calculateBMI = (e) => {
    e.preventDefault();

    // Instansiasi model OOP dengan data dari form
    const model = new BMICalculatorModel(
      formData.weight,
      formData.height,
      formData.age,
      formData.gender,
    );

    setResult({
      bmi: model.bmi.toFixed(1),
      category: model.details.category,
      color: model.details.color,
      idealWeightRange: model.idealWeightRange,
      bmr: Math.round(model.bmr),
      dailyCalories: model.dailyCalories,
      bmiPercent: Math.min(100, (model.bmi / 40) * 100),
    });
  };

  const handleReset = () => {
    setFormData({ weight: "", height: "", age: "", gender: "male" });
    setResult(null);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="retro-groupbox">
        <span className="retro-groupbox-label">📏 Pengukuran Tubuh</span>
        <form onSubmit={calculateBMI} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <RetroInput
              label="Berat (kg):"
              id="bmi-weight"
              type="number"
              value={formData.weight}
              onChange={updateField("weight")}
              placeholder="cth. 70"
              required
              min="1"
              step="0.1"
            />
            <RetroInput
              label="Tinggi (cm):"
              id="bmi-height"
              type="number"
              value={formData.height}
              onChange={updateField("height")}
              placeholder="cth. 170"
              required
              min="50"
              step="0.1"
            />
            <RetroInput
              label="Usia:"
              id="bmi-age"
              type="number"
              value={formData.age}
              onChange={updateField("age")}
              placeholder="cth. 25"
              min="1"
              max="120"
            />
            <RetroSelect
              label="Jenis Kelamin:"
              id="bmi-gender"
              value={formData.gender}
              onChange={updateField("gender")}
              options={genderOptions}
            />
          </div>
          <div className="flex gap-2">
            <RetroButton type="submit" primary>
              Hitung BMI
            </RetroButton>
            <RetroButton onClick={handleReset}>Reset</RetroButton>
          </div>
        </form>
      </div>

      {result && (
        <div className="retro-groupbox">
          <span className="retro-groupbox-label">📊 Hasil</span>

          <div className="mb-3">
            <div className="flex justify-between text-[11px] mb-1">
              <span>Skala BMI</span>
              <span style={{ color: result.color, fontWeight: "bold" }}>
                {result.bmi} — {result.category}
              </span>
            </div>
            <div className="retro-progress">
              <div
                className="retro-progress-fill"
                style={{
                  width: `${result.bmiPercent}%`,
                  backgroundColor: result.color,
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] mt-1 text-gray-500">
              <span>0</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40+</span>
            </div>
          </div>

          <table className="retro-table">
            <tbody>
              <tr>
                <td className="font-bold">Nilai BMI</td>
                <td style={{ color: result.color, fontWeight: "bold" }}>
                  {result.bmi}
                </td>
              </tr>
              <tr>
                <td className="font-bold">Kategori</td>
                <td>{result.category}</td>
              </tr>
              <tr>
                <td className="font-bold">Berat Ideal</td>
                <td>{result.idealWeightRange}</td>
              </tr>
              <tr>
                <td className="font-bold">BMR</td>
                <td>{result.bmr} kcal/hari</td>
              </tr>
              <tr>
                <td className="font-bold">Est. Kalori Harian</td>
                <td>{result.dailyCalories} kcal/hari</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
