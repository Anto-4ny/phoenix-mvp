import { supabase } from '../supabaseClient';

export async function getOnboardingProgress(userId: string) {
  const { data } = await supabase
    .from('profiles')
    .select('onboarding_step, onboarding_data, onboarding_completed')
    .eq('id', userId)
    .single();

  return data;
}
