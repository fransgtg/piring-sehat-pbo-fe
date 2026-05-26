// ─── KELAS INDUK (BASE CLASS) ───
class HealthCalculator {
  constructor(weight, height) {
    const parsedWeight = parseFloat(weight);
    const parsedHeight = parseFloat(height);

    // Validasi data: Pastikan angka valid dan bukan negatif. Jika salah, set ke 0.
    this.weight = isNaN(parsedWeight) || parsedWeight <= 0 ? 0 : parsedWeight;
    this.heightCm = isNaN(parsedHeight) || parsedHeight <= 0 ? 0 : parsedHeight;
  }
}

// ─── KELAS ANAK 1: BMI & KALORI ───
export class BMICalculatorModel extends HealthCalculator {
  constructor(weight, height, age, gender, activityMultiplier = 1.55) {
    super(weight, height);

    const parsedAge = parseInt(age);
    this.age = isNaN(parsedAge) || parsedAge <= 0 ? 25 : parsedAge;
    this.gender = gender || "male";

    // Memberikan nilai default 1.55, tapi membiarkan ruang untuk dinamis ke depannya
    const parsedActivity = parseFloat(activityMultiplier);
    this.activityMultiplier =
      isNaN(parsedActivity) || parsedActivity <= 0 ? 1.55 : parsedActivity;
  }

  get bmi() {
    if (!this.weight || !this.heightCm) return 0;
    const heightM = this.heightCm / 100;
    return this.weight / (heightM * heightM);
  }

  get details() {
    const bmiVal = this.bmi;
    if (bmiVal === 0)
      return { category: "Data Tidak Lengkap", color: "#808080" };
    if (bmiVal < 18.5) return { category: "Underweight", color: "#4a90d9" };
    if (bmiVal < 25) return { category: "Normal", color: "#27ae60" };
    if (bmiVal < 30) return { category: "Overweight", color: "#f39c12" };
    return { category: "Obese", color: "#e74c3c" };
  }

  get bmr() {
    if (!this.weight || !this.heightCm) return 0; // Cegah kalkulasi jika data kosong
    if (this.gender === "male") {
      return 10 * this.weight + 6.25 * this.heightCm - 5 * this.age + 5;
    }
    return 10 * this.weight + 6.25 * this.heightCm - 5 * this.age - 161;
  }

  get dailyCalories() {
    return Math.round(this.bmr * this.activityMultiplier);
  }

  get idealWeightRange() {
    if (!this.heightCm) return "0 kg";
    const heightM = this.heightCm / 100;
    const min = (18.5 * heightM * heightM).toFixed(1);
    const max = (24.9 * heightM * heightM).toFixed(1);
    return `${min} - ${max} kg`;
  }
}

// ─── KELAS 2: GENETIC HEIGHT ───
export class GeneticHeightCalculatorModel {
  constructor(fatherHeight, motherHeight, gender) {
    const parsedFather = parseFloat(fatherHeight);
    const parsedMother = parseFloat(motherHeight);

    this.fatherHeight =
      isNaN(parsedFather) || parsedFather <= 0 ? 0 : parsedFather;
    this.motherHeight =
      isNaN(parsedMother) || parsedMother <= 0 ? 0 : parsedMother;
    this.gender = gender || "male";
  }

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
}

// ─── KELAS ANAK 3: KEBUTUHAN PROTEIN ───
export class ProteinCalculatorModel extends HealthCalculator {
  constructor(weight, activityLevel) {
    super(weight, 0); // Tinggi tidak dipakai, jadi dikirim 0 ke base class

    const parsedActivity = parseFloat(activityLevel);
    this.activityLevel =
      isNaN(parsedActivity) || parsedActivity <= 0 ? 1.2 : parsedActivity;
  }

  get dailyProtein() {
    if (!this.weight) return 0;
    return Math.round(this.weight * this.activityLevel);
  }
}
