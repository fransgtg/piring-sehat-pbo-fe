import { useState, useCallback } from "react";
import { useAuth } from "./useAuth";

// URL backend Spring Boot — diambil dari .env, fallback ke localhost saat development
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// Custom hook untuk mengelola riwayat kalkulator (fetch, simpan, hapus)
// calcType: 'bmi' | 'protein' | 'genetic'
export function useCalcHistory(calcType) {
  const { session } = useAuth();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ─── Header Authorization dengan token JWT Supabase ───
  const authHeaders = useCallback(
    () => ({
      Authorization: `Bearer ${session?.access_token}`,
      "Content-Type": "application/json",
    }),
    [session],
  );

  // ─── Ambil riwayat dari backend: GET /api/calculator/history ───
  const fetchHistory = useCallback(async () => {
    if (!session?.access_token) return;
    setLoading(true);
    setError(null);
    try {
      const url = calcType
        ? `${API_BASE_URL}/api/calculator/history?type=${calcType}&limit=30`
        : `${API_BASE_URL}/api/calculator/history?limit=50`;

      const res = await fetch(url, { headers: authHeaders() });
      if (!res.ok) throw new Error(`Gagal mengambil riwayat (${res.status})`);

      const json = await res.json();
      setHistory(json.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [session, calcType, authHeaders]);

  // ─── Simpan riwayat baru: POST /api/calculator/history ───
  // Dipanggil otomatis setiap kali user menekan tombol "Hitung"
  const saveHistory = useCallback(
    async (inputData, resultData) => {
      if (!session?.access_token) return;
      try {
        const res = await fetch(`${API_BASE_URL}/api/calculator/history`, {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify({ calcType, inputData, resultData }),
        });
        if (!res.ok) throw new Error(`Gagal menyimpan riwayat (${res.status})`);

        const json = await res.json();
        const newEntry = json.data;

        // Tambahkan di awal array (paling baru di atas)
        setHistory((prev) => [newEntry, ...prev].slice(0, 30));
      } catch (err) {
        console.warn("[useCalcHistory] saveHistory error:", err.message);
      }
    },
    [session, calcType, authHeaders],
  );

  // ─── Hapus satu entri: DELETE /api/calculator/history/{id} ───
  const deleteHistory = useCallback(
    async (entryId) => {
      if (!session?.access_token) return;
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/calculator/history/${entryId}`,
          {
            method: "DELETE",
            headers: authHeaders(),
          },
        );
        if (!res.ok) throw new Error(`Gagal menghapus riwayat (${res.status})`);

        // Hapus dari state lokal setelah berhasil dihapus di backend
        setHistory((prev) => prev.filter((h) => h.id !== entryId));
      } catch (err) {
        setError(err.message);
      }
    },
    [session, authHeaders],
  );

  return { history, loading, error, fetchHistory, saveHistory, deleteHistory };
}
