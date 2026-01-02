// src/routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../pages/ProfilePage';
import LandingPage from '../pages/LandingPage';
import OnboardingPage from '../pages/OnboardingPage';
import EquipmentReviewPage from '../pages/onboarding/EquipmentReviewPage';
import TrainingSchedulePage from '../pages/onboarding/TrainingSchedulePage';
import RecoverySleepPage from '../pages/onboarding/RecoverySleepPage';
import InjuriesPage from '../pages/onboarding/InjuriesPage';
import MobilityPage from '../pages/onboarding/MobilityPage';
import FinalReviewPage from '../pages/onboarding/FinalReviewPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/onboarding/*" element={<OnboardingPage />} />
      <Route path="/onboarding/equipment-review" element={<EquipmentReviewPage />} />
      <Route path="/onboarding/training-schedule" element={<TrainingSchedulePage />} />
      <Route path="/onboarding/recovery-sleep" element={<RecoverySleepPage />} />
      <Route path="/onboarding/injuries" element={<InjuriesPage />} />
      <Route path="/onboarding/mobility" element={<MobilityPage />} />
      <Route path="/onboarding/review" element={<FinalReviewPage />} />
    </Routes>
  );
}
