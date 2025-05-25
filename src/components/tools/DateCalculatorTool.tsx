import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from '@mui/material';

const timeZones = [
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST)' },
];

const DateCalculatorTool: React.FC = () => {
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState<string>('00:00');
  const [timezone, setTimezone] = useState<string>(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [amount, setAmount] = useState<string>('');
  const [unit, setUnit] = useState<string>('days');
  const [result, setResult] = useState<string>('');

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Validate time format (HH:mm)
    if (/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
      setStartTime(value);
    }
  };

  const calculateDate = () => {
    if (!startDate || !amount) {
      setResult('Please enter all required fields');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) {
      setResult('Please enter a valid number');
      return;
    }

    // Create date object in specified timezone
    const [year, month, day] = startDate.split('-').map(Number);
    const [hours, minutes] = startTime.split(':').map(Number);
    
    // Create date string in ISO format with timezone
    const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
    const resultDate = new Date(dateStr);

    switch (unit) {
      case 'minutes':
        resultDate.setMinutes(resultDate.getMinutes() + numAmount);
        break;
      case 'hours':
        resultDate.setHours(resultDate.getHours() + numAmount);
        break;
      case 'days':
        resultDate.setDate(resultDate.getDate() + numAmount);
        break;
      case 'weeks':
        resultDate.setDate(resultDate.getDate() + (numAmount * 7));
        break;
      case 'months':
        resultDate.setMonth(resultDate.getMonth() + numAmount);
        break;
      case 'years':
        resultDate.setFullYear(resultDate.getFullYear() + numAmount);
        break;
    }

    // Format the result with date and time in the specified timezone using 24-hour format
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: timezone,
      timeZoneName: 'short'
    };
    
    setResult(resultDate.toLocaleString(undefined, options));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Date Calculator
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ flex: 1, minWidth: '200px' }}
          />
          <TextField
            label="Start Time (HH:mm)"
            type="text"
            value={startTime}
            onChange={handleTimeChange}
            placeholder="00:00"
            InputLabelProps={{ shrink: true }}
            sx={{ flex: 1, minWidth: '200px' }}
            helperText="Use 24-hour format (e.g., 13:30)"
          />
          <FormControl sx={{ flex: 1, minWidth: '200px' }}>
            <InputLabel>Timezone</InputLabel>
            <Select
              value={timezone}
              label="Timezone"
              onChange={(e) => setTimezone(e.target.value)}
            >
              {timeZones.map((tz) => (
                <MenuItem key={tz.value} value={tz.value}>
                  {tz.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ flex: 1 }}
          />
          
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Unit</InputLabel>
            <Select
              value={unit}
              label="Unit"
              onChange={(e) => setUnit(e.target.value)}
            >
              <MenuItem value="minutes">Minutes</MenuItem>
              <MenuItem value="hours">Hours</MenuItem>
              <MenuItem value="days">Days</MenuItem>
              <MenuItem value="weeks">Weeks</MenuItem>
              <MenuItem value="months">Months</MenuItem>
              <MenuItem value="years">Years</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          variant="contained"
          onClick={calculateDate}
          fullWidth
          sx={{ mb: 3 }}
        >
          Calculate
        </Button>

        {result && (
          <Typography variant="h6" sx={{ mt: 2 }}>
            Result: {result}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default DateCalculatorTool; 