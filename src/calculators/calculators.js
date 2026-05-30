// ─────────────────────────────────────────────────────────────────────────────
// BASE CLASS — ENCAPSULATION + ABSTRACTION
// Tidak boleh diinstansiasi langsung.
// ─────────────────────────────────────────────────────────────────────────────
class HealthCalculator {
  constructor(weight, height) {
    // Cegah instansiasi langsung (simulasi abstract class) — ABSTRACTION
    if (new.target === HealthCalculator) {
      throw new Error(
        "HealthCalculator adalah abstract class dan tidak bisa diinstansiasi langsung.",
      );
    }

    //validasi terpusat di satu tempat
    this.weight = this._parsePositive(weight);
    this.heightCm = this._parsePositive(height);
  }

  // wajib diimplementasikan oleh setiap subclass. Jika lupa di-override, akan error saat dipanggil.
  getSummary() {
    throw new Error(
      `${this.constructor.name} wajib mengimplementasikan getSummary().`,
    );
  }

  _parsePositive(value, fallback = 0) {
    const num = parseFloat(value);
    return isNaN(num) || num <= 0 ? fallback : num;
  }
}

// ───────────────────────────
// KELAS ANAK 1: BMI & KALORI
// ───────────────────────────
export class BMICalculatorModel extends HealthCalculator {
  constructor(weight, height, age, gender, activityMultiplier = 1.55) {
    super(weight, height); // validasi terpusat di base class

    // ENCAPSULATION: data & validasi khusus BMI dikelola di sini
    const parsedAge = parseInt(age);
    this.age = isNaN(parsedAge) || parsedAge <= 0 ? 25 : parsedAge;
    this.gender = gender || "male";
    this.activityMultiplier = this._parsePositive(activityMultiplier, 1.55);
  }

  // Hitung nilai BMI: berat (kg) / tinggi (m)²
  get bmi() {
    if (!this.weight || !this.heightCm) return 0;
    const heightM = this.heightCm / 100; // konversi cm → meter
    return this.weight / (heightM * heightM);
  }
  // Tentukan kategori dan warna berdasarkan threshold WHO
  get details() {
    const bmiVal = this.bmi;
    if (bmiVal === 0)
      return { category: "Data Tidak Lengkap", color: "#808080" };
    if (bmiVal < 18.5) return { category: "Underweight", color: "#4a90d9" };
    if (bmiVal < 25) return { category: "Normal", color: "#27ae60" };
    if (bmiVal < 30) return { category: "Overweight", color: "#f39c12" };
    return { category: "Obese", color: "#e74c3c" };
  }

  // Hitung BMR dengan rumus Harris-Benedict
  get bmr() {
    if (!this.weight || !this.heightCm) return 0;
    if (this.gender === "male") {
      return 10 * this.weight + 6.25 * this.heightCm - 5 * this.age + 5;
    }
    return 10 * this.weight + 6.25 * this.heightCm - 5 * this.age - 161;
  }

  // Kalori harian = BMR × faktor aktivitas
  get dailyCalories() {
    return Math.round(this.bmr * this.activityMultiplier);
  }

  // Rentang berat ideal berdasarkan BMI normal (18.5 – 24.9)
  get idealWeightRange() {
    if (!this.heightCm) return "0 kg";
    const heightM = this.heightCm / 100;
    const min = (18.5 * heightM * heightM).toFixed(1);
    const max = (24.9 * heightM * heightM).toFixed(1);
    return `${min} - ${max} kg`;
  }

  getSummary() {
    return {
      label: "BMI",
      mainValue: this.bmi > 0 ? this.bmi.toFixed(1) : "-",
      unit: "",
      description: this.details.category,
      color: this.details.color,
      extras: [
        { key: "Berat Ideal", value: this.idealWeightRange },
        {
          key: "BMR",
          value: this.bmr > 0 ? `${Math.round(this.bmr)} kcal/hari` : "-",
        },
        {
          key: "Est. Kalori Harian",
          value:
            this.dailyCalories > 0 ? `${this.dailyCalories} kcal/hari` : "-",
        },
      ],
    };
  }
}

// ──────────────────────────────
// KELAS ANAK 2: GENETIC HEIGHT
// ──────────────────────────────
export class GeneticHeightCalculatorModel extends HealthCalculator {
  constructor(fatherHeight, motherHeight, gender) {
    super(fatherHeight, motherHeight); // validasi terpusat di base class

    // agar kode tetap readable
    this.fatherHeight = this.weight;
    this.motherHeight = this.heightCm;
    this.gender = gender || "male";
  }

  // Rumus Mid-Parental Height (MPH):
  // +13 untuk laki-laki, -13 untuk perempuan (rata-rata perbedaan tinggi pria/wanita)
  get predictedHeight() {
    if (!this.fatherHeight || !this.motherHeight) return 0;
    const adjustment = this.gender === "male" ? 13 : -13;
    return (this.fatherHeight + this.motherHeight + adjustment) / 2;
  }

  get range() {
    const base = this.predictedHeight;
    if (!base) return "0 cm";
    return `${(base - 8.5).toFixed(1)} cm - ${(base + 8.5).toFixed(1)} cm`;
  }

  getSummary() {
    return {
      label: "Tinggi Prediksi",
      mainValue:
        this.predictedHeight > 0 ? this.predictedHeight.toFixed(1) : "-",
      unit: "cm",
      description:
        this.predictedHeight > 0
          ? `Rentang: ${this.range}`
          : "Data tidak lengkap",
      color: "#000080",
      extras: [
        {
          key: "Tinggi Ayah",
          value: this.fatherHeight > 0 ? `${this.fatherHeight} cm` : "-",
        },
        {
          key: "Tinggi Ibu",
          value: this.motherHeight > 0 ? `${this.motherHeight} cm` : "-",
        },
      ],
    };
  }
}

// ────────────────────────────────
// KELAS ANAK 3: KEBUTUHAN PROTEIN
// ────────────────────────────────
export class ProteinCalculatorModel extends HealthCalculator {
  constructor(weight, activityLevel) {
    super(weight, 0); // tinggi tidak dipakai, dikirim 0 ke base class

    // ENCAPSULATION: data aktivitas & labelnya dikelola rapi di sini
    this.activityLevel = this._parsePositive(activityLevel, 1.2);
    this.activityLabel =
      ProteinCalculatorModel._resolveActivityLabel(activityLevel);
  }

  // Protein harian (g) = berat badan (kg) × faktor aktivitas
  get dailyProtein() {
    if (!this.weight) return 0;
    return Math.round(this.weight * this.activityLevel);
  }

  // ENCAPSULATION: mapping faktor aktivitas → label deskriptif, disimpan di dalam class (static)
  static _resolveActivityLabel(level) {
    const labels = {
      0.8: "Sedenter — jarang olahraga",
      "1.0": "Ringan — 1-3x/minggu",
      1.2: "Sedang — 3-5x/minggu",
      1.5: "Aktif — 6-7x/minggu",
      1.8: "Sangat Aktif — atlet/kerja berat",
    };
    return labels[String(parseFloat(level))] ?? "Tidak diketahui";
  }

  getSummary() {
    return {
      label: "Protein Harian",
      mainValue: this.dailyProtein > 0 ? this.dailyProtein : "-",
      unit: "g/hari",
      description: this.activityLabel,
      color: "#e67e22",
      extras: [
        {
          key: "Berat Badan",
          value: this.weight > 0 ? `${this.weight} kg` : "-",
        },
        { key: "Faktor Aktivitas", value: `× ${this.activityLevel} g/kg` },
        {
          key: "Kalori dari Protein",
          value: this.dailyProtein > 0 ? `${this.dailyProtein * 4} kcal` : "-",
        },
      ],
    };
  }
}
