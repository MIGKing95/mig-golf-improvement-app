'use client';

import { useState } from 'react';

export default function CheckoutButton({ tier, children }: { tier: 'player' | 'elite'; children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

  async function startCheckout() {
    setLoading(true);
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier }),
    });
    const data = await response.json();
    if (data?.url) window.location.href = data.url;
    else alert(data?.error || 'Stripe checkout could not start. Check your Vercel environment variables.');
    setLoading(false);
  }

  return (
    <button className="btn" onClick={startCheckout} disabled={loading}>
      {loading ? 'Opening checkout...' : children}
    </button>
  );
}
