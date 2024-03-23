import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { registerServiceWorker } from './utils/registerServiceWorker';

const main = async () => {
  await registerServiceWorker();

  if (window.location.pathname.startsWith('/admin')) {
    const { AdminApp } = await import('@wsh-2024/admin/src/index');
    createRoot(document.getElementById('root')!).render(<AdminApp />);
  } else {
    const { ClientApp } = await import('@wsh-2024/app/src/index');
    hydrateRoot(
      document.getElementById('root')!,
      <SWRConfig value={{ revalidateIfStale: true, revalidateOnFocus: false, revalidateOnReconnect: false }}>
        <BrowserRouter>
          <ClientApp />
        </BrowserRouter>
      </SWRConfig>,
    );
  }
};

main().catch(console.error);
