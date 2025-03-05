import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import './index.css';
import { SidebarLayout } from './components/catalyst/sidebar-layout';
import { Pokemon } from './pages/pokemon/[id]';
import { Search } from './pages/search';
import { SettingsPanel } from './pages/search/SettingsPanel';
import { routes } from './routes';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 2 } },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <SidebarLayout
                navbar={
                  <div className="text-2xl">Temporal Pokemon Database</div>
                }
                sidebar={<SettingsPanel />}
              />
            }
          >
            <Route index element={<Search />} />
            <Route path={routes.pokemon} element={<Pokemon />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
