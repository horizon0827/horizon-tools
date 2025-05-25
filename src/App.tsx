import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Layout from './components/Layout';
import Base64Tool from './components/tools/Base64Tool';
import UrlTool from './components/tools/UrlTool';
import DateCalculatorTool from './components/tools/DateCalculatorTool';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/base64" replace />} />
            <Route path="/base64" element={<Base64Tool />} />
            <Route path="/url" element={<UrlTool />} />
            <Route path="/date" element={<DateCalculatorTool />} />
          </Routes>
        </Layout>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
