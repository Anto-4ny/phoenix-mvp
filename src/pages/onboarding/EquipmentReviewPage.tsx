import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Chip,
  Button,
  InputAdornment,
  CircularProgress,
  Grid as Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { EQUIPMENT } from '../../data/equipment';
import { saveOnboarding } from '../../lib/saveOnboarding';
import { supabase } from '../../supabaseClient';

interface ComponentStepProps {
  userId: string | null; // allow null
  answers: Record<string, any>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export default function EquipmentReviewPage({ userId, answers, setAnswers }: ComponentStepProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<Record<string, boolean>>(answers.selected_equipment || {});
  const [loading, setLoading] = useState(!answers.selected_equipment);
  const [saving, setSaving] = useState(false);

  /* =========================
     LOAD SAVED DATA IF NEEDED
     ========================= */
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (answers.selected_equipment || !mounted) {
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase.from('profiles')
        .select('onboarding_data')
        .eq('id', userId)
        .single();

      if (mounted) {
        const savedEquipment = profile?.onboarding_data?.selected_equipment || {};
        setSelected(savedEquipment);
        setAnswers({ ...answers, selected_equipment: savedEquipment });
        setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [userId, answers, setAnswers]);

  /* =========================
     HELPERS
     ========================= */
  const toggleExpand = (key: string) =>
    setExpanded((p) => ({ ...p, [key]: !p[key] }));

  const toggleSelect = (item: string) => {
    const updated = { ...selected, [item]: !selected[item] };
    setSelected(updated);
    setAnswers({ ...answers, selected_equipment: updated });
  };

  /* =========================
     SAVE & NEXT
     ========================= */
const saveAndNext = async () => {
  if (!userId || saving) return;

  setSaving(true);

  try {
    await saveOnboarding(userId, 6, {
      selected_equipment: selected,
    });

    // ✅ Let OnboardingPage / Gate handle the next step
  } finally {
    setSaving(false);
  }
};

  /* =========================
     LOADING STATE
     ========================= */
  if (loading) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="#0F172A"
      >
        <CircularProgress sx={{ color: '#22C55E' }} />
      </Box>
    );
  }

  /* =========================
     UI
     ========================= */
  return (
    <Box minHeight="100vh" bgcolor="#0F172A" p={{ xs: 2, md: 4 }} color="#E5E7EB">
      <Typography variant="h4" fontWeight={800} mb={3}>
        Review & Customize Equipment
      </Typography>

      {Object.entries(EQUIPMENT).map(([key, category]) => (
        <Box key={key} mb={4}>
          <Typography variant="h6" color="#22C55E" fontWeight={700} mb={1.5}>
            {category.title}
          </Typography>

          <Grid container spacing={1.5}>
            {Object.keys(category.items)
              .filter((item) =>
                item.toLowerCase().includes(search.toLowerCase())
              )
              .slice(0, expanded[key] ? undefined : 3)
              .map((item) => {
                const isSelected = !!selected[item];
                return (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item}>
                    <Chip
                      label={item}
                      clickable
                      onClick={() => toggleSelect(item)}
                      sx={{
                        width: '100%',
                        bgcolor: isSelected ? '#22C55E' : '#020617',
                        color: isSelected ? '#020617' : '#E5E7EB',
                        border: '1px solid #1F2937',
                        fontWeight: 600,
                      }}
                    />
                  </Grid>
                );
              })}
          </Grid>

          {Object.keys(category.items).length > 3 && (
            <Button
              size="small"
              sx={{ mt: 1, color: '#38BDF8' }}
              onClick={() => toggleExpand(key)}
            >
              {expanded[key] ? 'Collapse' : 'Edit / Show More'}
            </Button>
          )}
        </Box>
      ))}

      {/* SEARCH BAR */}
      <Box position="sticky" bottom={0} bgcolor="#020617" p={2} mt={4}>
        <TextField
          fullWidth
          placeholder="Search equipment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#38BDF8' }} />
              </InputAdornment>
            ),
            sx: { color: '#E5E7EB' },
          }}
        />
      </Box>

      {/* NAVIGATION */}
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button onClick={() => navigate(-1)} disabled={saving}>
          Back
        </Button>

        <Button
          variant="contained"
          sx={{ bgcolor: '#22C55E', color: '#020617' }}
          onClick={saveAndNext}
          disabled={saving}
        >
          {saving ? 'Saving…' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
}
