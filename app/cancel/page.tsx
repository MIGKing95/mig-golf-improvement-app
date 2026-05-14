import Link from 'next/link';

export default function CancelPage() {
  return (
    <main className="container success-page">
      <div className="card center-card">
        <h1>Checkout canceled</h1>
        <p>No payment was taken. You can choose a plan when you are ready.</p>
        <Link className="btn" href="/membership">Back to Membership</Link>
      </div>
    </main>
  );
}
