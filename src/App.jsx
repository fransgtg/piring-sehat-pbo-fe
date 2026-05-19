import { useState, useEffect } from 'react'
import RetroWindow from './components/ui/RetroWindow'
import AuthWindow from './components/auth/AuthWindow'
import BMICalculator from './components/bmi/BMICalculator'
import CalorieTracker from './components/calories/CalorieTracker'
import FoodSearchExplorer from './components/food/FoodSearchExplorer'
import CommunityForum from './components/forum/CommunityForum'
import './App.css'

export default function App() {
  const [windows, setWindows] = useState([])
  const [activeWindowId, setActiveWindowId] = useState(null)
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [time, setTime] = useState(new Date())

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const apps = {
    auth: { id: 'auth', title: 'PiringSehat - Login', icon: '🔑', component: AuthWindow, width: 400, height: 420 },
    bmi: { id: 'bmi', title: 'BMI & Health Calculator', icon: '⚖️', component: BMICalculator, width: 500, height: 480 },
    calories: { id: 'calories', title: 'Calorie Tracker', icon: '📈', component: CalorieTracker, width: 550, height: 500 },
    food: { id: 'food', title: 'Food Explorer', icon: '🔍', component: FoodSearchExplorer, width: 450, height: 400 },
    forum: { id: 'forum', title: 'Community Forum', icon: '🌐', component: CommunityForum, width: 600, height: 450 },
  }

  const openWindow = (appId) => {
    setStartMenuOpen(false)
    if (!windows.find(w => w.id === appId)) {
      setWindows([...windows, { ...apps[appId], zIndex: windows.length + 1 }])
    }
    focusWindow(appId)
  }

  const closeWindow = (appId) => {
    setWindows(windows.filter(w => w.id !== appId))
    if (activeWindowId === appId) setActiveWindowId(null)
  }

  const focusWindow = (appId) => {
    setActiveWindowId(appId)
    setWindows(windows.map(w => ({
      ...w,
      zIndex: w.id === appId ? 999 : w.zIndex > 0 ? w.zIndex - 1 : 0
    })))
  }

  // Handle click outside start menu to close it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (startMenuOpen && !e.target.closest('.retro-start-menu') && !e.target.closest('.retro-start-btn')) {
        setStartMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [startMenuOpen])

  return (
    <div className="desktop">
      {/* Desktop Icons */}
      <div className="desktop-icons">
        <button className="retro-desktop-icon" onDoubleClick={() => openWindow('auth')}>
          <span className="text-3xl">🔑</span>
          <span>Login / Register</span>
        </button>
        <button className="retro-desktop-icon" onDoubleClick={() => openWindow('bmi')}>
          <span className="text-3xl">⚖️</span>
          <span>BMI Calculator</span>
        </button>
        <button className="retro-desktop-icon" onDoubleClick={() => openWindow('calories')}>
          <span className="text-3xl">📈</span>
          <span>Calorie Tracker</span>
        </button>
        <button className="retro-desktop-icon" onDoubleClick={() => openWindow('food')}>
          <span className="text-3xl">🔍</span>
          <span>Food Explorer</span>
        </button>
        <button className="retro-desktop-icon" onDoubleClick={() => openWindow('forum')}>
          <span className="text-3xl">🌐</span>
          <span>Community Forum</span>
        </button>
      </div>

      {/* Windows Manager */}
      {windows.map((win) => {
        const Component = win.component
        return (
          <RetroWindow
            key={win.id}
            id={win.id}
            title={win.title}
            icon={win.icon}
            width={win.width}
            height={win.height}
            isActive={activeWindowId === win.id}
            zIndex={win.zIndex}
            onClose={closeWindow}
            onFocus={focusWindow}
          >
            <Component />
          </RetroWindow>
        )
      })}

      {/* Start Menu */}
      {startMenuOpen && (
        <div className="retro-start-menu flex">
          <div className="retro-start-menu-sidebar">
            <span>Windows 95</span>
          </div>
          <div className="retro-start-menu-items flex-1">
            <button className="retro-start-menu-item font-bold" onClick={() => openWindow('auth')}>
              <span className="text-xl">🔑</span> Login/Register
            </button>
            <button className="retro-start-menu-item font-bold" onClick={() => openWindow('bmi')}>
              <span className="text-xl">⚖️</span> BMI Calculator
            </button>
            <button className="retro-start-menu-item font-bold" onClick={() => openWindow('calories')}>
              <span className="text-xl">📈</span> Calorie Tracker
            </button>
            <button className="retro-start-menu-item font-bold" onClick={() => openWindow('food')}>
              <span className="text-xl">🔍</span> Food Explorer
            </button>
            <button className="retro-start-menu-item font-bold" onClick={() => openWindow('forum')}>
              <span className="text-xl">🌐</span> Community Forum
            </button>
            <div className="retro-start-menu-divider"></div>
            <button className="retro-start-menu-item" onClick={() => window.location.reload()}>
              <span className="text-xl">⏻</span> Shut Down...
            </button>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="retro-taskbar">
        <button
          className={`retro-start-btn ${startMenuOpen ? 'active' : ''}`}
          onClick={() => setStartMenuOpen(!startMenuOpen)}
        >
          <span className="text-blue-800 text-lg leading-none">❖</span>
          Start
        </button>
        
        {/* Taskbar Items (Open Windows) */}
        <div className="flex gap-1 flex-1 overflow-x-auto">
          {windows.map((win) => (
            <button
              key={win.id}
              className={`retro-taskbar-item ${activeWindowId === win.id ? 'active' : ''}`}
              onClick={() => focusWindow(win.id)}
            >
              <span className="text-xs">{win.icon}</span>
              <span className="truncate">{win.title}</span>
            </button>
          ))}
        </div>

        {/* System Tray */}
        <div className="retro-systray">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  )
}
