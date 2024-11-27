"use client";

import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ placeholder, onSearch }: any) => {
  return (
    <TextField
      variant="outlined"
      placeholder={placeholder || "Search..."}
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
