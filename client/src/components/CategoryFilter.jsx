import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

function CategoryFilter({ selectedCategory, onCategoryChange, categories }) {
  return (
    <Box sx={{ mb: 3, minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="category-select-label">Filter by Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={selectedCategory}
          label="Filter by Category"
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default CategoryFilter;
