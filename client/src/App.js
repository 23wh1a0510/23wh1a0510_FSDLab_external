import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, Alert, Divider } from '@mui/material';
import NotesTable from './components/NotesTable';
import CategoryFilter from './components/CategoryFilter';
import { fetchNotes } from './api';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch all notes to extract unique categories
  useEffect(() => {
    fetchNotes()
      .then((data) => {
        // Extract unique categories from notes
        const uniqueCategories = [...new Set(data.map(note => note.category).filter(Boolean))];
        setCategories(uniqueCategories);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  // Fetch notes based on selected category
  useEffect(() => {
    setLoading(true);
    fetchNotes(selectedCategory)
      .then((data) => {
        setNotes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        QuickNotes Pro
      </Typography>

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        categories={categories}
      />

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && <NotesTable notes={notes} />}
      <Divider sx={{ my: 4 }} />
      {/* TODO: Implement the UI for the corresponding question set */}
    </Container>
  );
}

export default App;
