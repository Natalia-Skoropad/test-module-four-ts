import { Toaster } from 'react-hot-toast';
import { toastOptions } from './toastOptions';

// ================================================================

export function ToasterConfig() {
  return <Toaster position="top-right" toastOptions={toastOptions} />;
}
