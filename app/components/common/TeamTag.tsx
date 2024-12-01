import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const TeamTag = ({ label, onDelete }: { label: string, onDelete: () => void }) => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: '#e0e0e0', // Chip-like background
        borderRadius: '16px',
        padding: '0 8px',
        margin: '4px',
        fontSize: '14px',
        cursor: 'default',
      }}
    >
      <Typography variant="body2">{label}</Typography>
      <IconButton
        size="small"
        onClick={onDelete}
        sx={{ padding: 0, marginLeft: '4px', color: 'gray' }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};
export default TeamTag