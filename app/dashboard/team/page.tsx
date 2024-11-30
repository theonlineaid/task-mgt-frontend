"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ReusableModal from "@/app/components/common/ReusableModal";

// Define a TypeScript type for the User
interface User {
  _id: string;
  name: string;
  title: string;
  email: string;
  role: string;
  isActive: boolean;
}

const TeamPage = () => {
  const [users, setUsers] = useState<User[]>([]); // Use User type for state
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<"edit" | "delete" | "none">(
    "none"
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Use User type for selectedUser

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    title: "",
  });

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/user/get-team",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const result = await response.json();
        if (response.ok) {
          setUsers(result);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Toggle modal visibility
  const toggleModal = () => setOpen(!open);

  // Handle Edit Action
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setModalType("edit");
    toggleModal();
  };

  // Handle Delete Action
  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setModalType("delete");
    toggleModal();
  };

  // Handle form submission inside the modal (either Edit or Delete)
  const handleSubmit = async () => {
    if (modalType === "edit" && selectedUser) {
      // Submit the edit (you can modify this according to your edit logic)
      alert(`User ${selectedUser.name} edited successfully!`);
      toggleModal();
    } else if (modalType === "delete" && selectedUser) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/user/delete/${selectedUser._id}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        const result = await response.json();
        if (response.ok) {
          setUsers(users.filter((user) => user._id !== selectedUser._id));
          alert(`User ${selectedUser.name} deleted successfully!`);
          toggleModal();
        } else {
          alert("Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Handle Create User
  const handleCreateUser = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(newUser),
        }
      );
      const result = await response.json();
      if (response.ok) {
        alert(`User ${newUser.name} created successfully!`);
        setNewUser({
          name: "",
          email: "",
          password: "",
          role: "",
          title: "",
        }); // Clear form

        setOpen(false);
      } else {
        alert(result.message || "Failed to create user.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Team Members
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Create User
        </Button>
      </Box>

      {/* User Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {/* Table Header with bold text */}
              <TableCell sx={{ fontWeight: "bold" }}>Full Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.title}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color: user.isActive ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Button
                    onClick={() => handleEdit(user)}
                    variant="contained"
                    color="primary"
                    sx={{ mr: 2 }}
                  >
                    Edit
                  </Button>
                  <Button
                    // onClick={() => handleDelete(user)}
                    variant="contained"
                    color="secondary"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Reusable Modal for Edit or Delete */}
      <ReusableModal
        open={open}
        onClose={toggleModal}
        title={modalType === "edit" ? "Edit User" : "Delete User"}
        onSubmit={handleSubmit}
      >
        {modalType === "edit" && selectedUser ? (
          <div>
            {/* You can put form fields for editing user details here */}
            <Typography variant="body1">
              Edit details for {selectedUser.name}
            </Typography>
            {/* Add form fields for name, role, etc. */}
          </div>
        ) : modalType === "delete" && selectedUser ? (
          <Typography variant="body1">
            Are you sure you want to delete {selectedUser.name}?
          </Typography>
        ) : null}
      </ReusableModal>

      <ReusableModal
        open={open}
        onClose={() => setOpen(false)}
        title="Create New User"
        onSubmit={handleCreateUser}
      >
        <div>
          <TextField
            label="Name"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            type="email"
          />
          <TextField
            label="Password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            type="password"
          />
          <TextField
            label="Role"
            name="role"
            value={newUser.role}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Title"
            name="title"
            value={newUser.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </div>
      </ReusableModal>
    </div>
  );
};

export default TeamPage;
