import Link from 'next/link';
import { BarChart3, Bot, ClipboardCheck, Goal, Trophy, Upload } from 'lucide-react';

const features = [
  { icon: Goal, title: 'Swing Goals', text: 'Pick your main miss and get a focused improvement path.' },
  { icon: ClipboardCheck, title: 'Practice Plans', text: 'Simple drills, reps, and session structure for real progress.' },
  { icon: BarChart3, title: 'Score Tracker', text: 'Track scores, putts, fairways, penalties, and round notes.' },
  { icon: Trophy, title: 'Club Chart', text: 'Save your distances and make better course decisions.' },
  { icon: Bot, title: 'AI Coach', text: 'Ask questions and get fast golf feedback and drills.' },
  { icon: Upload, title: 'Video Notes', text: 'Upload or log swing videos with notes and review points.' },
];

export default function HomePage() {
  return (
    <main>
      <div className="container">
        <nav className="nav">
          <div className="logo"><div className="logo-mark">MIG</div><span>MIG Golf Improvement</span></div>
          <div className="navlinks">
            <a href="#features">Features</a>
            <a href="#pricing">Membership</a>
            <Link className="btn secondary" href="/dashboard">Open App</Link>
          </div>
        </nav>

        <section className="hero">
          <div>
            <div className="eyebrow">Make It Great Golf System</div>
            <h1>Track your game. Train with purpose.</h1>
            <p>
              A golf improvement app for everyday golfers who want a simple plan: profile, goals, practice plans,
              score tracking, club distances, AI coach feedback, and swing video notes.
            </p>
            <div className="actions">
              <Link className="btn" href="/dashboard">Start Improving</Link>
              <a className="btn secondary" href="#pricing">View Membership</a>
            </div>
          </div>
          <div className="hero-card">
            <span className="badge">MVP v1 Ready</span>
            <h2>Your personal golf command center</h2>
            <p>Built first as a Vercel web app. Later it can become an iPhone and Android app.</p>
            <div className="stats">
              <div className="stat"><strong>7</strong><span>Core tools</span></div>
              <div className="stat"><strong>3</strong><span>Membership tiers</span></div>
              <div className="stat"><strong>1</strong><span>Clear plan</span></div>
            </div>
          </div>
        </section>

        <section id="features" className="section">
          <div className="eyebrow">What the app includes</div>
          <h2>Built for practice, scoring, and growth.</h2>
          <div className="grid">
            {features.map(({ icon: Icon, title, text }) => (
              <div className="feature" key={title}>
                <Icon size={28} color="var(--green)" />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="section">
          <div className="eyebrow">Membership model</div>
          <h2>Start free. Upgrade when golfers want more coaching.</h2>
          <div className="pricing">
            <div className="card price"><h3>Free</h3><div className="amount">$0</div><p>Profile, score tracker, and basic club chart.</p></div>
            <div className="card price popular"><h3>MIG Player</h3><div className="amount">$9.99</div><p>Full plans, AI coach feedback, progress tracking, and video notes.</p></div>
            <div className="card price"><h3>MIG Elite</h3><div className="amount">$29.99</div><p>Personalized plans, tournament prep, exclusive content, and community access.</p></div>
          </div>
        </section>

        <footer className="footer">© MIG Golf Improvement App — Make it great.</footer>
      </div>
    </main>
  );
}
