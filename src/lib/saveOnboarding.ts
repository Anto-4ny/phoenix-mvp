import { supabase } from '../supabaseClient';

export async function saveOnboarding(
  userId: string,
  step: number,
  newData: Record<string, any>
) {
  const { data: existing } = await supabase
    .from('profiles')
    .select('onboarding_data')
    .eq('id', userId)
    .maybeSingle();

  const mergedData = {
    ...(existing?.onboarding_data || {}),
    ...newData,
  };

  await supabase.from('profiles').upsert({
    id: userId,
    onboarding_step: step,
    onboarding_data: mergedData,
    onboarding_completed: false,
  });
}

