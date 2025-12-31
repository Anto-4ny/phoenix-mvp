import { supabase } from '../supabaseClient';

export async function saveOnboarding(
  userId: string,
  step: number,
  data: any
) {
  await supabase.from('profiles').upsert({
    id: userId,
    onboarding_step: step,
    onboarding_data: data,
    onboarding_completed: false,
  });
}
