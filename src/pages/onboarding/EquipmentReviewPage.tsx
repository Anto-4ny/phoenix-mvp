import {
  Box,
  Typography,
  TextField,
  IconButton,
  Chip,
  Button,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { EQUIPMENT } from '../../data/equipment';

export default function EquipmentReviewPage() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setExpanded((p) => ({ ...p, [key]: !p[key] }));

  return (
    <Box
      minHeight="100vh"
      bgcolor="#0F172A"
      p={{ xs: 2, md: 4 }}
      color="#E5E7EB"
    >
      <Typography variant="h4" fontWeight={800} mb={3}>
        Review Your Selected Equipment
      </Typography>

      {Object.entries(EQUIPMENT).map(([key, category]) => (
        <Box key={key} mb={4}>
          <Typography
            variant="h6"
            color="#22C55E"
            fontWeight={700}
            mb={1.5}
          >
            {category.title}
          </Typography>

          <Grid container spacing={1.5}>
            {Object.keys(category.items)
              .filter((item) =>
                item.toLowerCase().includes(search.toLowerCase())
              )
              .slice(0, expanded[key] ? undefined : 3)
              .map((item) => (
                <Grid
                  key={item}
                  size={{ xs: 12, sm: 6, md: 4 }}
                >
                  <Chip
                    label={item}
                    sx={{
                      width: '100%',
                      bgcolor: '#020617',
                      color: '#E5E7EB',
                      border: '1px solid #1F2937',
                    }}
                  />
                </Grid>
              ))}
          </Grid>

          {Object.keys(category.items).length > 3 && (
            <Button
              size="small"
              sx={{ mt: 1, color: '#38BDF8' }}
              onClick={() => toggle(key)}
            >
              {expanded[key] ? 'Collapse' : 'Edit / Show More'}
            </Button>
          )}
        </Box>
      ))}

      {/* SEARCH BAR */}
      <Box
        position="sticky"
        bottom={0}
        bgcolor="#020617"
        p={2}
        mt={4}
      >
        <TextField
          fullWidth
          placeholder="Search equipment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <IconButton>
                <SearchIcon sx={{ color: '#38BDF8' }} />
              </IconButton>
            ),
            sx: { color: '#E5E7EB' },
          }}
        />
      </Box>
    </Box>
  );
}
