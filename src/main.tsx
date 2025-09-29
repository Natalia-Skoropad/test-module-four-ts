import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './components/App/App';
import { ToasterConfig } from './utils/ToasterConfig';

import 'modern-normalize';
import './global.css';

// ================================================================

const queryClient = new QueryClient();
const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
      <ToasterConfig />
    </QueryClientProvider>
  </StrictMode>
);
