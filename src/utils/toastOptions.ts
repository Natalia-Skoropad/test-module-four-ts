import type { DefaultToastOptions } from 'react-hot-toast';

// ================================================================

export const toastOptions: DefaultToastOptions = {
  style: {
    background: '#0f0c14',
    border: '1px solid #2a2136',
    color: '#f2e9fa',
    padding: '12px 16px',
    borderRadius: '10px',
    fontSize: '15px',
  },

  success: {
    iconTheme: { primary: '#4ade80', secondary: '#0f0c14' },
    style: { border: '1px solid #065f46' },
  },

  error: {
    iconTheme: { primary: '#f87171', secondary: '#0f0c14' },
    style: { border: '1px solid #7f1d1d' },
  },

  loading: {
    iconTheme: { primary: '#a78bfa', secondary: '#0f0c14' },
    style: { border: '1px solid #4c1d95' },
  },
};
