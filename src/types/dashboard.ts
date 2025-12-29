export interface WorkoutData {
  day: string;
  calories: number;
}

export interface NutritionData {
  day: string;
  protein: number;
}

export interface DashboardStats {
  weeklyWorkouts: string;
  avgProtein: string;
  goal: string;
  readinessScore: string;
}

export interface DashboardResponse {
  stats: DashboardStats;
  workouts: WorkoutData[];
  nutrition: NutritionData[];
  aiInsight: string;
}
