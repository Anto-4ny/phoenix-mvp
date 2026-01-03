import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { getOnboardingProgress } from '../lib/getOnboardingProgress';
import { ONBOARDING_ROUTES } from '../guards/onboardingSteps';

interface Props {
  children: React.ReactNode;
}

const OnboardingGate: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const runCheck = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Not logged in → don't gate
      if (!user) {
        setChecking(false);
        return;
      }

      const progress = await getOnboardingProgress(user.id);

      // Onboarding finished → allow app
      if (!progress || progress.onboarding_completed) {
        setChecking(false);
        return;
      }

      const stepIndex = progress.onboarding_step;
      const targetRoute = ONBOARDING_ROUTES[stepIndex];

      if (!targetRoute) {
        setChecking(false);
        return;
      }

      const isOnboardingRoute = location.pathname.startsWith('/onboarding');

      // ✅ Allow editing & review
      if (isOnboardingRoute) {
        setChecking(false);
        return;
      }

      // ✅ Resume only if user is outside onboarding
      navigate(targetRoute, { replace: true });
      setChecking(false);
    };

    runCheck();
  }, [navigate, location.pathname]);

  if (checking) return null;

  return <>{children}</>;
};

export default OnboardingGate;
