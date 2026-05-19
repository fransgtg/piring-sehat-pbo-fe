import { useState } from 'react'
import RetroButton from '../ui/RetroButton'
import RetroInput from '../ui/RetroInput'
import RetroSelect from '../ui/RetroSelect'

export default function BMICalculator() {
  // ─── State (DTO-Ready) ───
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: 'male',
  })

  const [result, setResult] = useState(null)

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ]

  const updateField = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value })

  // ─── BMI Calculation (Local — no backend needed) ───
  const calculateBMI = (e) => {
    e.preventDefault()
    const weight = parseFloat(formData.weight)
    const heightCm = parseFloat(formData.height)
    if (!weight || !heightCm) return

    const heightM = heightCm / 100
    const bmi = weight / (heightM * heightM)
    let category = ''
    let color = ''

    if (bmi < 18.5) { category = 'Underweight'; color = '#4a90d9' }
    else if (bmi < 25) { category = 'Normal'; color = '#27ae60' }
    else if (bmi < 30) { category = 'Overweight'; color = '#f39c12' }
    else { category = 'Obese'; color = '#e74c3c' }

    const idealWeightMin = (18.5 * heightM * heightM).toFixed(1)
    const idealWeightMax = (24.9 * heightM * heightM).toFixed(1)

    // Daily calorie estimation (Mifflin-St Jeor)
    const age = parseInt(formData.age) || 25
    let bmr
    if (formData.gender === 'male') {
      bmr = 10 * weight + 6.25 * heightCm - 5 * age + 5
    } else {
      bmr = 10 * weight + 6.25 * heightCm - 5 * age - 161
    }

    setResult({
      bmi: bmi.toFixed(1),
      category,
      color,
      idealWeightRange: `${idealWeightMin} - ${idealWeightMax} kg`,
      dailyCalories: Math.round(bmr * 1.55),
      bmr: Math.round(bmr),
    })

    // TODO: Optionally save health metrics → POST /api/health/bmi
    console.log('[BMI] Calculation payload:', {
      ...formData,
      bmiResult: bmi.toFixed(1),
      category,
    })
  }

  const getBMIPercent = () => {
    if (!result) return 0
    const bmi = parseFloat(result.bmi)
    return Math.min(100, Math.max(0, (bmi / 40) * 100))
  }

  const handleReset = () => {
    setFormData({ weight: '', height: '', age: '', gender: 'male' })
    setResult(null)
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Input Form */}
      <div className="retro-groupbox">
        <span className="retro-groupbox-label">📏 Body Measurements</span>
        <form onSubmit={calculateBMI} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <RetroInput
              label="Weight (kg):"
              id="bmi-weight"
              type="number"
              value={formData.weight}
              onChange={updateField('weight')}
              placeholder="e.g. 70"
              required
              min="1"
              step="0.1"
            />
            <RetroInput
              label="Height (cm):"
              id="bmi-height"
              type="number"
              value={formData.height}
              onChange={updateField('height')}
              placeholder="e.g. 170"
              required
              min="1"
              step="0.1"
            />
            <RetroInput
              label="Age:"
              id="bmi-age"
              type="number"
              value={formData.age}
              onChange={updateField('age')}
              placeholder="e.g. 25"
              min="1"
              max="120"
            />
            <RetroSelect
              label="Gender:"
              id="bmi-gender"
              value={formData.gender}
              onChange={updateField('gender')}
              options={genderOptions}
            />
          </div>
          <div className="flex gap-2">
            <RetroButton type="submit" primary>
              Calculate
            </RetroButton>
            <RetroButton onClick={handleReset}>Reset</RetroButton>
          </div>
        </form>
      </div>

      {/* Results */}
      {result && (
        <div className="retro-groupbox">
          <span className="retro-groupbox-label">📊 Results</span>

          {/* BMI Gauge */}
          <div className="mb-3">
            <div className="flex justify-between text-[11px] mb-1">
              <span>BMI Scale</span>
              <span style={{ color: result.color, fontWeight: 'bold' }}>
                {result.bmi} — {result.category}
              </span>
            </div>
            <div className="retro-progress">
              <div
                className="retro-progress-fill"
                style={{
                  width: `${getBMIPercent()}%`,
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

          {/* Details Table */}
          <table className="retro-table">
            <tbody>
              <tr>
                <td className="font-bold">BMI Value</td>
                <td style={{ color: result.color, fontWeight: 'bold' }}>{result.bmi}</td>
              </tr>
              <tr>
                <td className="font-bold">Category</td>
                <td>{result.category}</td>
              </tr>
              <tr>
                <td className="font-bold">Ideal Weight Range</td>
                <td>{result.idealWeightRange}</td>
              </tr>
              <tr>
                <td className="font-bold">BMR (Base Metabolic Rate)</td>
                <td>{result.bmr} kcal/day</td>
              </tr>
              <tr>
                <td className="font-bold">Est. Daily Calories</td>
                <td>{result.dailyCalories} kcal/day</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
