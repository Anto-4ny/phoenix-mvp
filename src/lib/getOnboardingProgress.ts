import { supabase } from '../supabaseClient';

export const getOnboardingProgress = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('onboarding_step, onboarding_completed')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.error('Onboarding progress error:', error);
    return null;
  }

  return data;
};

