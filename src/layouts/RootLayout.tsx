import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { BuildoraCopilot } from '../components/copilot/BuildoraCopilot';

export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50 text-zinc-900 dark:bg-black dark:text-zinc-100 antialiased font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-900 transition-colors">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
      <BuildoraCopilot />
    </div>
  );
};
