import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const Base64Tool: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleEncode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
      setError('');
    } catch (err) {
      setError('Invalid input for encoding');
    }
  };

  const handleDecode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
      setError('');
    } catch (err) {
      setError('Invalid Base64 string for decoding');
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          label="Input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button variant="contained" onClick={handleEncode}>
            Encode
          </Button>
          <Button variant="contained" onClick={handleDecode}>
            Decode
          </Button>
        </Box>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          label="Output"
          value={output}
          InputProps={{ readOnly: true }}
        />
      </Box>
    </Box>
  );
};

export default Base64Tool; 