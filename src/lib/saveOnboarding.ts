import { supabase } from '../supabaseClient';

export async function saveOnboarding(userId: string, data: any) {
  await supabase
    .from('profiles')
    .upsert({
      id: userId,
      onboarding_data: data,
      onboarding_completed: false,
    });
}
