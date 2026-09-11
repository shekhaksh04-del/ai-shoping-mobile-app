/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CommerceProvider, useCommerce } from './context/CommerceContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { DiscoverView } from './components/DiscoverView';
import { VisualMatchView } from './components/VisualMatchView';
import { ProductAiView } from './components/ProductAiView';
import { ProductAtelierView } from './components/ProductAtelierView';
import { BagView } from './components/BagView';
import { CheckoutView } from './components/CheckoutView';
import { SavedView } from './components/SavedView';
import { Toast } from './components/Toast';

const AppContent: React.FC = () => {
  const { screen } = useCommerce();

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1a1c1a] font-body flex flex-col selection:bg-[#ffdad2] selection:text-[#3d0600]">
      <Header />
      <Toast />

      <main className="flex-1 w-full">
        {screen === 'discover' && <DiscoverView />}
        {screen === 'match' && <VisualMatchView />}
        {screen === 'product-ai' && <ProductAiView />}
        {screen === 'product-atelier' && <ProductAtelierView />}
        {screen === 'bag' && <BagView />}
        {screen === 'checkout' && <CheckoutView />}
        {screen === 'saved' && <SavedView />}
      </main>

      {/* Show navigation bar on all pages except final checkout */}
      {screen !== 'checkout' && <Navigation />}
    </div>
  );
};

export default function App() {
  return (
    <CommerceProvider>
      <AppContent />
    </CommerceProvider>
  );
}

