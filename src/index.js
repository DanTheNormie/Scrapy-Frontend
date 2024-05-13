import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './Pages/auth/AuthPage';
import DashboardPage from './Pages/DashboardPage';
import CreateScrapeTaskPage from './Pages/createScrapeTaskPage';
import { CssBaseline } from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material';
import { createContext } from 'react';
import CreateTaskPage from './Pages/CreateTaskPage';
import { getTasks } from './Pages/DashboardPage';

import AuthProvider from './AuthContext.mjs';

const router = createBrowserRouter([
  {
    path: '/createTask',
    element: <CreateTaskPage />
  },
  {
    path: '/dashboard',
    element: <DashboardPage/>,
  },
  {
    path: '/',
    element: <Auth />
  }
])

const theme = createTheme({
  palette:{
    mode:'dark'
  }
})

const queryClient = new QueryClient({});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <AuthProvider>
          <RouterProvider router={router}/>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
  
);
