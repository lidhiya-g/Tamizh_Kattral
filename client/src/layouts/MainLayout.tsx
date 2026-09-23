import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { BottomNav } from '../components/BottomNav';
import { Footer } from '../components/Footer';
import { OfflineBanner } from '../components/OfflineBanner';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-charcoal-950">
      <OfflineBanner />
      <Navbar />
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 mb-16 lg:mb-0">
          <Outlet />
        </main>
      </div>
      <BottomNav />
      <Footer />
    </div>
  );
};
