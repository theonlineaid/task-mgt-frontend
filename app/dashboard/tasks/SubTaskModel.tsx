import ReusableModal from "@/app/components/common/ReusableModal";
import { TextField } from "@mui/material";

export default function SubTaskModel({
  subtaskDialog,
  handleCloseSubtaskDialog,
  handleCreateSubtask,
  newSubtask,
  handleSubtaskChange,
}: any) {
  return (
    <ReusableModal
      open={subtaskDialog.open}
      onClose={handleCloseSubtaskDialog}
      title="Add Subtask"
      onSubmit={handleCreateSubtask}
    >
      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={newSubtask.title}
        onChange={(e) => handleSubtaskChange("title", e.target.value)}
      />
      <TextField
        label="Tag"
        fullWidth
        margin="normal"
        value={newSubtask.tag}
        onChange={(e) => handleSubtaskChange("tag", e.target.value)}
      />
      <TextField
        label="Due Date"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={newSubtask.date}
        onChange={(e) => handleSubtaskChange("date", e.target.value)}
      />
    </ReusableModal>
  );
}
