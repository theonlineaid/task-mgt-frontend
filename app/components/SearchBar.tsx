"use client";

import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ placeholder, onSearch }: any) => {
  return (
    <TextField
    variant="outlined"
    placeholder={placeholder || "Search..."}
    sx={{
      width: "500px", // Set fixed width
      "& .MuiOutlinedInput-root": {
        height: "40px", // Set height of the input field
        background: "#f3f4f6",
        border: "none", // Ensure no border by default
        "& fieldset": {
          border: "none", // Remove the outline border
        },
        "&:hover fieldset": {
          border: "none", // Prevent border on hover
        },
        "&.Mui-focused fieldset": {
          border: "none", // Remove border on focus
        },
      },
    }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
      onChange={(e) => onSearch && onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
