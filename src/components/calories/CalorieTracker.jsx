import { useState } from 'react'
import RetroButton from '../ui/RetroButton'
import RetroInput from '../ui/RetroInput'
import RetroSelect from '../ui/RetroSelect'

export default function CalorieTracker() {
  const dailyGoal = 2000

  // ─── New Entry State (DTO-Ready) ───
  const [newEntry, setNewEntry] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    mealType: 'breakfast',
  })

  // ─── Local entries (client-side state) ───
  const [entries, setEntries] = useState([])
  const [statusMessage, setStatusMessage] = useState('Ready')

  const mealOptions = [
    { value: 'breakfast', label: '🌅 Breakfast' },
    { value: 'lunch', label: '☀️ Lunch' },
    { value: 'dinner', label: '🌙 Dinner' },
    { value: 'snack', label: '🍿 Snack' },
  ]

  const updateField = (field) => (e) =>
    setNewEntry({ ...newEntry, [field]: e.target.value })

  // ─── Add Entry Handler ───
  const handleAddEntry = (e) => {
    e.preventDefault()
    const entry = {
      id: Date.now(),
      name: newEntry.name,
      calories: parseFloat(newEntry.calories) || 0,
      protein: parseFloat(newEntry.protein) || 0,
      carbs: parseFloat(newEntry.carbs) || 0,
      fat: parseFloat(newEntry.fat) || 0,
      mealType: newEntry.mealType,
      timestamp: new Date().toLocaleTimeString(),
    }

    setEntries([...entries, entry])
    setNewEntry({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      mealType: newEntry.mealType,
    })

    // TODO: Replace with actual API call → POST /api/calories/entry
    console.log('[CALORIE] New entry payload:', entry)
    setStatusMessage(`Added: ${entry.name} (${entry.calories} kcal)`)
  }

  const handleDeleteEntry = (id) => {
    setEntries(entries.filter((e) => e.id !== id))
    // TODO: Replace with actual API call → DELETE /api/calories/entry/{id}
    console.log('[CALORIE] Delete entry ID:', id)
    setStatusMessage('Entry deleted')
  }

  // ─── Totals ───
  const totals = entries.reduce(
    (acc, e) => ({
      calories: acc.calories + e.calories,
      protein: acc.protein + e.protein,
      carbs: acc.carbs + e.carbs,
      fat: acc.fat + e.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  )

  const caloriePercent = Math.min(100, (totals.calories / dailyGoal) * 100)

  return (
    <div className="flex flex-col gap-3">
      {/* Daily Progress */}
      <div className="retro-groupbox">
        <span className="retro-groupbox-label">📊 Daily Progress</span>
        <div className="flex justify-between text-[11px] mb-1">
          <span>Calories: {totals.calories.toFixed(0)} / {dailyGoal} kcal</span>
          <span>{caloriePercent.toFixed(0)}%</span>
        </div>
        <div className="retro-progress">
          <div
            className="retro-progress-fill"
            style={{
              width: `${caloriePercent}%`,
              backgroundColor: caloriePercent > 100 ? '#e74c3c' : '#000080',
            }}
          />
        </div>
        <div className="flex justify-around mt-2 text-[11px]">
          <span>🥩 Protein: {totals.protein.toFixed(1)}g</span>
          <span>🍞 Carbs: {totals.carbs.toFixed(1)}g</span>
          <span>🧈 Fat: {totals.fat.toFixed(1)}g</span>
        </div>
      </div>

      {/* Add Entry Form */}
      <div className="retro-groupbox">
        <span className="retro-groupbox-label">➕ Add Food Entry</span>
        <form onSubmit={handleAddEntry} className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <RetroInput
              label="Food Name:"
              id="cal-name"
              value={newEntry.name}
              onChange={updateField('name')}
              placeholder="e.g. Nasi Goreng"
              required
            />
            <RetroInput
              label="Calories (kcal):"
              id="cal-calories"
              type="number"
              value={newEntry.calories}
              onChange={updateField('calories')}
              placeholder="e.g. 350"
              required
              min="0"
            />
            <RetroInput
              label="Protein (g):"
              id="cal-protein"
              type="number"
              value={newEntry.protein}
              onChange={updateField('protein')}
              placeholder="0"
              min="0"
              step="0.1"
            />
            <RetroInput
              label="Carbs (g):"
              id="cal-carbs"
              type="number"
              value={newEntry.carbs}
              onChange={updateField('carbs')}
              placeholder="0"
              min="0"
              step="0.1"
            />
            <RetroInput
              label="Fat (g):"
              id="cal-fat"
              type="number"
              value={newEntry.fat}
              onChange={updateField('fat')}
              placeholder="0"
              min="0"
              step="0.1"
            />
            <RetroSelect
              label="Meal Type:"
              id="cal-meal"
              value={newEntry.mealType}
              onChange={updateField('mealType')}
              options={mealOptions}
            />
          </div>
          <div className="flex gap-2">
            <RetroButton type="submit" primary>
              Add Entry
            </RetroButton>
          </div>
        </form>
      </div>

      {/* Entries List */}
      <div className="retro-groupbox">
        <span className="retro-groupbox-label">📋 Today&apos;s Log ({entries.length} items)</span>
        <div className="retro-scroll-area" style={{ maxHeight: 160 }}>
          {entries.length === 0 ? (
            <p className="text-gray-500 text-center p-4 text-[11px]">
              No food entries yet. Start adding your meals!
            </p>
          ) : (
            <table className="retro-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Food</th>
                  <th>Meal</th>
                  <th>Cal</th>
                  <th>P</th>
                  <th>C</th>
                  <th>F</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="text-[10px]">{entry.timestamp}</td>
                    <td>{entry.name}</td>
                    <td className="text-[10px]">{entry.mealType}</td>
                    <td>{entry.calories}</td>
                    <td>{entry.protein}g</td>
                    <td>{entry.carbs}g</td>
                    <td>{entry.fat}g</td>
                    <td>
                      <button
                        type="button"
                        className="text-[10px] text-red-600 hover:underline cursor-pointer"
                        onClick={() => handleDeleteEntry(entry.id)}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="retro-statusbar mt-auto">
        <div className="retro-statusbar-section">{statusMessage}</div>
        <div className="retro-statusbar-section" style={{ flex: 'none', width: 120 }}>
          Items: {entries.length}
        </div>
      </div>
    </div>
  )
}
