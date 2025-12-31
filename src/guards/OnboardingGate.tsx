import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { getOnboardingProgress } from '../lib/getOnboardingProgress';

interface Props {
  children: React.ReactNode;
}
 
const OnboardingGate: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const runCheck = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Not logged in → allow auth routes
      if (!user) {
        setChecking(false);
        return;
      }

      const progress = await getOnboardingProgress(user.id);

      if (progress && !progress.onboarding_completed) {
        // ✅ RESUME LOGIC
        // If step index >= total steps → go to equipment review
        const totalSteps = 5; // replace with your steps.length
        if (progress.onboarding_step >= totalSteps) {
          navigate('/onboarding/equipment-review', { replace: true });
        } else {
          navigate(`/onboarding/step/${progress.onboarding_step}`, {
            replace: true,
          });
        }
      }

      setChecking(false);
    };

    runCheck();
  }, [navigate]);

  if (checking) return null; // splash / loader

  return <>{children}</>;
};

export default OnboardingGate;
