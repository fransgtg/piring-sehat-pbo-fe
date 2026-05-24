import { useState } from 'react'
import RetroButton from '../ui/RetroButton'
import RetroInput from '../ui/RetroInput'

export default function FoodSearchExplorer() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState([])
  const [statusMessage, setStatusMessage] = useState('Ready')

  // ─── Search Handler ───
  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setStatusMessage(`Searching for "${searchQuery}"... (waiting for backend)`)
    
    // Simulate empty results for now since backend food API is not yet implemented
    setResults([]) 
  }

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Search Bar */}
      <div className="retro-groupbox">
        <span className="retro-groupbox-label">🔍 Search Database</span>
        <form onSubmit={handleSearch} className="flex gap-2 items-end">
          <div className="flex-1">
            <RetroInput
              id="food-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. Apple, Nasi Goreng, Tempe..."
            />
          </div>
          <RetroButton type="submit" primary>
            Search
          </RetroButton>
        </form>
      </div>

      {/* Results Grid */}
      <div className="retro-groupbox flex-1 flex flex-col">
        <span className="retro-groupbox-label">📑 Results</span>
        <div className="retro-scroll-area flex-1 min-h-[150px]">
          {results.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
                <span className="text-[32px] mb-2">🍽️</span>
                <p>Search for food to view nutrition facts.</p>
                <p className="text-[10px] mt-1">(Results will populate here from backend)</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 gap-2 p-2">
              {results.map((food) => (
                <div key={food.id} className="retro-raised p-2 flex justify-between items-center bg-white">
                  <div>
                    <h4 className="font-bold text-[13px]">{food.name}</h4>
                    <p className="text-[10px] text-gray-600">{food.servingSize}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#000080]">{food.calories} kcal</p>
                    <p className="text-[10px]">
                      P:{food.protein}g C:{food.carbs}g F:{food.fat}g
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="retro-statusbar mt-auto">
        <div className="retro-statusbar-section">{statusMessage}</div>
        <div className="retro-statusbar-section" style={{ flex: 'none', width: 120 }}>
          Found: {results.length}
        </div>
      </div>
    </div>
  )
}
