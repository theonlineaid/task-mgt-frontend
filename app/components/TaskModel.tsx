import React, { useState, useEffect } from "react";
import {
    Modal,
    Box,
    TextField,
    Button,
    Typography,
    Autocomplete,
    Chip,
    MenuItem,
} from "@mui/material";

interface TeamMember {
    _id: string;
    name: string;
    title: string;
    role: string;
    email: string;
    isActive: boolean;
}

const CreateTaskModal = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        priority: "",
        stage: "",
        team: [] as string[], // Store selected team member IDs
    });
    const [teamOptions, setTeamOptions] = useState<TeamMember[]>([]); // Team members from API

    const toggleModal = () => setOpen(!open);

    useEffect(() => {
        // Fetch team members from API
        const fetchTeam = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/user/get-team", {
                    method: "GET",
                    cache: "no-store",
                    credentials: "include",
                });
                const result = await response.json();
                if (response.ok) {
                    setTeamOptions(result || []);
                } else {
                    console.error("Failed to fetch team members");
                }
            } catch (error) {
                console.error("Error fetching team members:", error);
            }
        };

        fetchTeam();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTeamChange = (event: any, selected: TeamMember[]) => {
        setFormData({ ...formData, team: selected.map((member) => member._id) });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/task/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message || "Task created successfully!");
                toggleModal();
            } else {
                alert(result.message || "Failed to create task.");
            }
        } catch (error) {
            console.error("Error creating task:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <>
            {/* Button to Open Modal */}
            <Button variant="contained" onClick={toggleModal}>
                Create Task
            </Button>

            {/* Modal */}
            <Modal open={open} onClose={toggleModal}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        p: 4,
                        borderRadius: 2,
                        boxShadow: 24,
                        minWidth: "500px",
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 0 }}>
                        Create New Task
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        {/* Task Title */}
                        <TextField
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            margin="normal"
                        />

                        {/* Team Selection */}
                        <Typography variant="subtitle1">
                            Assign Team
                        </Typography>
                        <Autocomplete
                            multiple
                            options={teamOptions}
                            getOptionLabel={(option) => `${option.name} (${option.role})`}
                            onChange={handleTeamChange}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => {
                                    const { key, ...tagProps } = getTagProps({ index }); // Destructure key
                                    return (
                                        <Chip
                                            key={key} // Apply key explicitly
                                            label={`${option.name} (${option.role})`}
                                            {...tagProps} // Spread other props
                                        />
                                    );
                                })
                            }
                            renderInput={(params) => (
                                <TextField {...params} label="Select Team Members" margin="normal" />
                            )}
                        />

                        {/* Task Priority */}
                        <Box sx={{ display: "flex", gap: "10px" }}>
                            <TextField
                                select
                                label="Priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                margin="normal"
                            >
                                <MenuItem value="low">Low</MenuItem>
                                <MenuItem value="medium">Medium</MenuItem>
                                <MenuItem value="high">High</MenuItem>
                            </TextField>

                            <TextField
                                label="Date"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Box>

                        <Box sx={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                            {/* Task Stage */}
                            <TextField
                                select
                                label="Stage"
                                name="stage"
                                value={formData.stage}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                margin="normal"
                            >
                                <MenuItem value="todo">To Do</MenuItem>
                                <MenuItem value="in progress">In Progress</MenuItem>
                                <MenuItem value="completed">Completed</MenuItem>
                            </TextField>
                        </Box>


                        {/* Submit and Cancel Buttons */}
                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                            <Button onClick={toggleModal} color="secondary">
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Create
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default CreateTaskModal;