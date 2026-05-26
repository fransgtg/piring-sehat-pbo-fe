import { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import RetroWindow from "./components/ui/RetroWindow";
import AuthWindow from "./components/auth/AuthWindow";
import BMICalculator from "./components/bmi/BMICalculator";
import CalorieTracker from "./components/calories/CalorieTracker";
import FoodSearchExplorer from "./components/food/FoodSearchExplorer";
import CommunityForum from "./components/forum/CommunityForum";
import GeneticHeightCalculator from "./components/geneticheight/GeneticHeightCalculator";
import ProteinCalculator from "./components/protein/ProteinCalculator";
import "./App.css";

export default function App() {
  const { user } = useAuth(); // Mengambil status login pengguna
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const apps = {
    auth: {
      id: "auth",
      title: "PiringSehat - Login",
      icon: "🔑",
      component: AuthWindow,
      width: 400,
      height: 420,
    },
    bmi: {
      id: "bmi",
      title: "BMI & Health Calculator",
      icon: "⚖️",
      component: BMICalculator,
      width: 500,
      height: 500,
    },
    geneticheight: {
      id: "geneticheight",
      title: "Genetic Height Calculator",
      icon: "🧬",
      component: GeneticHeightCalculator,
      width: 500,
      height: 560,
    },
    protein: {
      id: "protein",
      title: "Protein Calculator",
      icon: "💪",
      component: ProteinCalculator,
      width: 520,
      height: 540,
    },
    calories: {
      id: "calories",
      title: "Calorie Tracker",
      icon: "📈",
      component: CalorieTracker,
      width: 550,
      height: 500,
    },
    food: {
      id: "food",
      title: "Food Explorer",
      icon: "🔍",
      component: FoodSearchExplorer,
      width: 450,
      height: 400,
    },
    forum: {
      id: "forum",
      title: "Community Forum",
      icon: "🌐",
      component: CommunityForum,
      width: 600,
      height: 450,
    },
  };

  // Daftar fitur yang memerlukan login sebelum bisa diakses
  const protectedApps = [
    "bmi",
    "geneticheight",
    "protein",
    "calories",
    "food",
    "forum",
  ];

  const openWindow = (appId) => {
    setStartMenuOpen(false);

    // Proteksi Auth: Jika user belum login dan mencoba membuka fitur terproteksi,
    // tampilkan peringatan bergaya Win95 dan buka jendela Login sebagai gantinya.
    if (protectedApps.includes(appId) && !user) {
      alert(
        "⚠️ Access Denied\n\nAnda harus login terlebih dahulu untuk mengakses fitur ini.",
      );
      // Buka jendela auth secara otomatis
      appId = "auth";
    }
    setActiveWindowId(appId);
    setWindows((prevWindows) => {
      let newWindows = prevWindows;
      if (!prevWindows.find((w) => w.id === appId)) {
        newWindows = [
          ...prevWindows,
          { ...apps[appId], zIndex: prevWindows.length + 1 },
        ];
      }
      return newWindows.map((w) => ({
        ...w,
        zIndex: w.id === appId ? 999 : w.zIndex > 0 ? w.zIndex - 1 : 0,
      }));
    });
  };

  const closeWindow = (appId) => {
    setWindows((prevWindows) => prevWindows.filter((w) => w.id !== appId));
    if (activeWindowId === appId) setActiveWindowId(null);
  };

  const focusWindow = (appId) => {
    setActiveWindowId(appId);
    setWindows((prevWindows) =>
      prevWindows.map((w) => ({
        ...w,
        zIndex: w.id === appId ? 999 : w.zIndex > 0 ? w.zIndex - 1 : 0,
      })),
    );
  };

  // Handle click outside start menu to close it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        startMenuOpen &&
        !e.target.closest(".retro-start-menu") &&
        !e.target.closest(".retro-start-btn")
      ) {
        setStartMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [startMenuOpen]);

  return (
    <div className="desktop">
      {/* Desktop Icons */}
      <div className="desktop-icons">
        <button
          className="retro-desktop-icon"
          onDoubleClick={() => openWindow("auth")}
        >
          <span className="text-3xl">🔑</span>
          <span>Login / Register</span>
        </button>
        <button
          className="retro-desktop-icon"
          onDoubleClick={() => openWindow("bmi")}
        >
          <span className="text-3xl">⚖️</span>
          <span>BMI Calculator</span>
        </button>
        <button
          className="retro-desktop-icon"
          onDoubleClick={() => openWindow("geneticheight")}
        >
          <span className="text-3xl">🧬</span>
          <span>Genetic Height</span>
        </button>
        <button
          className="retro-desktop-icon"
          onDoubleClick={() => openWindow("protein")}
        >
          <span className="text-3xl">💪</span>
          <span>Protein Calculator</span>
        </button>
        <button
          className="retro-desktop-icon"
          onDoubleClick={() => openWindow("calories")}
        >
          <span className="text-3xl">📈</span>
          <span>Calorie Tracker</span>
        </button>
        <button
          className="retro-desktop-icon"
          onDoubleClick={() => openWindow("food")}
        >
          <span className="text-3xl">🔍</span>
          <span>Food Explorer</span>
        </button>
        <button
          className="retro-desktop-icon"
          onDoubleClick={() => openWindow("forum")}
        >
          <span className="text-3xl">🌐</span>
          <span>Community Forum</span>
        </button>
      </div>

      {/* Windows Manager */}
      {windows.map((win) => {
        const Component = win.component;
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
        );
      })}

      {/* Start Menu */}
      {startMenuOpen && (
        <div className="retro-start-menu flex">
          <div className="retro-start-menu-sidebar">
            <span>Piring Sehat</span>
          </div>
          <div className="retro-start-menu-items flex-1">
            <button
              className="retro-start-menu-item font-bold"
              onClick={() => openWindow("auth")}
            >
              <span className="text-xl">🔑</span> Login/Register
            </button>
            <div className="retro-start-menu-divider"></div>
            <div className="px-2 py-1 text-[10px] text-gray-500 font-bold">
              — KALKULATOR —
            </div>
            <button
              className="retro-start-menu-item font-bold"
              onClick={() => openWindow("bmi")}
            >
              <span className="text-xl">⚖️</span> BMI Calculator
            </button>
            <button
              className="retro-start-menu-item font-bold"
              onClick={() => openWindow("geneticheight")}
            >
              <span className="text-xl">🧬</span> Genetic Height Calculator
            </button>
            <button
              className="retro-start-menu-item font-bold"
              onClick={() => openWindow("protein")}
            >
              <span className="text-xl">💪</span> Protein Calculator
            </button>
            <div className="retro-start-menu-divider"></div>
            <button
              className="retro-start-menu-item font-bold"
              onClick={() => openWindow("calories")}
            >
              <span className="text-xl">📈</span> Calorie Tracker
            </button>
            <button
              className="retro-start-menu-item font-bold"
              onClick={() => openWindow("food")}
            >
              <span className="text-xl">🔍</span> Food Explorer
            </button>
            <button
              className="retro-start-menu-item font-bold"
              onClick={() => openWindow("forum")}
            >
              <span className="text-xl">🌐</span> Community Forum
            </button>
            <div className="retro-start-menu-divider"></div>
            <button
              className="retro-start-menu-item"
              onClick={() => window.location.reload()}
            >
              <span className="text-xl">⏻</span> Shut Down...
            </button>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="retro-taskbar">
        <button
          className={`retro-start-btn ${startMenuOpen ? "active" : ""}`}
          onClick={() => setStartMenuOpen(!startMenuOpen)}
        >
          <span className="text-blue-800 text-lg leading-none">❖</span>
          Start
        </button>

        <div className="flex gap-1 flex-1 overflow-x-auto">
          {windows.map((win) => (
            <button
              key={win.id}
              className={`retro-taskbar-item ${activeWindowId === win.id ? "active" : ""}`}
              onClick={() => focusWindow(win.id)}
            >
              <span className="text-xs">{win.icon}</span>
              <span className="truncate">{win.title}</span>
            </button>
          ))}
        </div>

        {/* System Tray */}
        <div className="retro-systray">
          {user && (
            <span className="text-[10px] mr-2">
              👤 {user.email?.split("@")[0] || "User"}
            </span>
          )}
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </div>
  );
}
