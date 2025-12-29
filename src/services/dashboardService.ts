import { DashboardResponse } from '../types/dashboard';

export const fetchDashboardData = async (): Promise<DashboardResponse> => {
  // Replace with real API call
  // const res = await fetch('/api/dashboard');
  // return res.json();

  return {
    stats: {
      weeklyWorkouts: '4 / 5',
      avgProtein: '135g/day',
      goal: 'Lean Muscle Gain',
      readinessScore: '92%',
    },
    workouts: [
      { day: 'Mon', calories: 420 },
      { day: 'Tue', calories: 530 },
      { day: 'Wed', calories: 380 },
      { day: 'Thu', calories: 480 },
      { day: 'Fri', calories: 650 },
      { day: 'Sat', calories: 300 },
      { day: 'Sun', calories: 350 },
    ],
    nutrition: [
      { day: 'Mon', protein: 120 },
      { day: 'Tue', protein: 135 },
      { day: 'Wed', protein: 125 },
      { day: 'Thu', protein: 150 },
      { day: 'Fri', protein: 145 },
      { day: 'Sat', protein: 100 },
      { day: 'Sun', protein: 120 },
    ],
    aiInsight:
      'Increasing protein intake by 10% and prioritizing compound lifts will accelerate hypertrophy while minimizing fatigue.',
  };
};
