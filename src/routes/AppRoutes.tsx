// src/routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../pages/ProfilePage';
import LandingPage from '../pages/LandingPage';
import OnboardingPage from '../pages/OnboardingPage';
import SubscriptionPage from '../pages/SubscriptionPage';
import EquipmentReviewPage from '../pages/onboarding/EquipmentReviewPage';
import TrainingSchedulePage from '../pages/onboarding/TrainingSchedulePage';
import RecoverySleepPage from '../pages/onboarding/RecoverySleepPage';
import InjuriesPage from '../pages/onboarding/InjuriesPage';
import MobilityPage from '../pages/onboarding/MobilityPage';
import FinalReviewPage from '../pages/onboarding/FinalReviewPage';
import { SetStateAction } from 'react';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/subscription" element={<SubscriptionPage />} />

      <Route path="/onboarding/*" element={<OnboardingPage />} />
      <Route path="/onboarding/equipment-review" element={<EquipmentReviewPage userId={null} answers={{}} setAnswers={function (value: SetStateAction<Record<string, any>>): void {
        throw new Error('Function not implemented.');
      } } />} />
      <Route path="/onboarding/training-schedule" element={<TrainingSchedulePage userId={null} answers={{}} setAnswers={function (value: SetStateAction<Record<string, any>>): void {
        throw new Error('Function not implemented.');
      } } />} />
      <Route path="/onboarding/recovery-sleep" element={<RecoverySleepPage userId={null} answers={{}} setAnswers={function (value: SetStateAction<Record<string, any>>): void {
        throw new Error('Function not implemented.');
      } } />} />
      <Route path="/onboarding/injuries" element={<InjuriesPage userId={null} answers={{}} setAnswers={function (value: SetStateAction<Record<string, any>>): void {
        throw new Error('Function not implemented.');
      } } />} />
      <Route path="/onboarding/mobility" element={<MobilityPage userId={null} answers={{}} setAnswers={function (value: SetStateAction<Record<string, any>>): void {
        throw new Error('Function not implemented.');
      } } />} />
      <Route path="/onboarding/review" element={<FinalReviewPage />} />
    </Routes>
  );
}
