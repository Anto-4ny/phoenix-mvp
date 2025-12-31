// src/App.tsx
import AppRoutes from './routes/AppRoutes';
import OnboardingGate from './guards/OnboardingGate';

function App() {
  return (
    <OnboardingGate>
      <AppRoutes />
    </OnboardingGate>
  );
}

export default App;
