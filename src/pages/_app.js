import '@/styles/globals.css';

import { CryrdleProvider } from '@/context/CryrdleContext';

export default function App ({ Component, pageProps }) {
  return (
    <CryrdleProvider>
      <Component {...pageProps} />
    </CryrdleProvider>
  );
}
