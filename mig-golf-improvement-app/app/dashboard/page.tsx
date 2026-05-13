'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, BarChart3, Bot, ClipboardCheck, Film, Flag, Gauge, Goal, Trophy, UserRound } from 'lucide-react';
import Link from 'next/link';

type Section = 'overview'|'profile'|'goals'|'plans'|'scores'|'clubs'|'coach'|'videos'|'membership';

type Club = { club: string; distance: number };
type Round = { course: string; date: string; front: number; back: number; putts: number; penalties: number; notes: string };

const initialClubs: Club[] = [
  { club: 'Driver', distance: 285 }, { club: '2 Iron', distance: 260 }, { club: '3 Hybrid', distance: 250 },
  { club: '5 Iron', distance: 215 }, { club: '6 Iron', distance: 205 }, { club: '7 Iron', distance: 180 },
  { club: '8 Iron', distance: 155 }, { club: '9 Iron', distance: 150 }, { club: 'PW', distance: 145 },
  { club: '52°', distance: 115 }, { club: '60°', distance: 95 }
];

const plans = [
  { title: 'Break 100 Plan', level: 'Beginner', drills: ['10 minutes putting ladder', '20 half swings with 8 iron', 'Driver tempo: 3 sets of 8', 'Play safe targets only'] },
  { title: 'Break 90 Plan', level: 'Intermediate', drills: ['30 chips inside 6 feet', 'Fairway finder tee shots', 'Approach shots to center green', 'Penalty-free round challenge'] },
  { title: 'Short Game Mastery', level: 'All Levels', drills: ['Landing spot drill', 'Up-and-down challenge', '10 bunker exits', 'Distance control wedges'] },
  { title: 'Tournament Prep', level: 'Advanced', drills: ['Pre-shot routine reps', 'Pressure putting', 'Course strategy notes', 'Post-round review'] }
];

const goalOptions = ['Fix Slice', 'Better Contact', 'Driver Accuracy', 'Short Game', 'Putting Confidence', 'Course Management', 'Break 90', 'Tournament Prep'];

export default function Dashboard() {
  const [section, setSection] = useState<Section>('overview');
  const [profile, setProfile] = useState({ name: 'Kush', level: 'Improving golfer', goal: 'Break 90', weakness: 'Consistency with driver', frequency: '3x per week' });
  const [goals, setGoals] = useState<string[]>(['Driver Accuracy', 'Short Game', 'Break 90']);
  const [clubs, setClubs] = useState<Club[]>(initialClubs);
  const [rounds, setRounds] = useState<Round[]>([
    { course: 'Spring Lake', date: '2026-05-13', front: 45, back: 43, putts: 32, penalties: 2, notes: 'Driver improved. Need better wedge distance control.' }
  ]);
  const [coachQuestion, setCoachQuestion] = useState('I keep slicing my driver. What should I work on?');
  const [coachAnswer, setCoachAnswer] = useState('');
  const [videoNotes, setVideoNotes] = useState([{ title: 'Driver range session', club: 'Driver', note: 'Check grip and shoulder alignment. Ball starting right.' }]);

  const averageScore = useMemo(() => {
    if (!rounds.length) return 0;
    return Math.round(rounds.reduce((sum, r) => sum + r.front + r.back, 0) / rounds.length);
  }, [rounds]);

  function toggleGoal(goal: string) {
    setGoals(prev => prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]);
  }

  function askCoach() {
    const q = coachQuestion.toLowerCase();
    let answer = 'Focus on one ball flight issue at a time. Record your swing, pick a target, and use a simple drill for 15 minutes before playing.';
    if (q.includes('slice')) answer = 'Likely causes: open clubface, weak grip, or out-to-in path. Fix: strengthen grip slightly, feel the clubface close through impact, and practice the headcover gate drill. Next session: 3 sets of 10 slow swings, then 20 balls at 70% speed.';
    if (q.includes('putt')) answer = 'For putting, work on speed first. Use a ladder drill from 10, 20, 30, and 40 feet. Goal: leave every putt inside a 3-foot circle. Finish with 25 short putts from 4 feet.';
    if (q.includes('top') || q.includes('thin')) answer = 'Topped or thin shots usually come from standing up, rushing, or poor low point control. Drill: make half swings brushing the grass after the ball. Keep chest down through impact.';
    if (q.includes('wedge') || q.includes('chip')) answer = 'For wedges, pick a landing spot and keep your weight slightly forward. Practice 10 balls to three landing zones: short, medium, long. Track how many finish inside 8 feet.';
    setCoachAnswer(answer);
  }

  const menu = [
    ['overview','Overview', Gauge], ['profile','Golf Profile', UserRound], ['goals','Swing Goals', Goal], ['plans','Practice Plans', ClipboardCheck],
    ['scores','Score Tracker', BarChart3], ['clubs','Club Distances', Trophy], ['coach','AI Coach', Bot], ['videos','Video Notes', Film], ['membership','Membership', Flag]
  ] as const;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link href="/" className="logo"><div className="logo-mark">MIG</div><span>Golf App</span></Link>
        <div className="menu">
          {menu.map(([id, label, Icon]) => (
            <button key={id} className={section === id ? 'active' : ''} onClick={() => setSection(id as Section)}><Icon size={16} /> {label}</button>
          ))}
        </div>
      </aside>
      <main className="main">
        <div className="topbar">
          <div>
            <div className="eyebrow">Member Dashboard</div>
            <h2 style={{ margin: '6px 0' }}>Welcome back, {profile.name}</h2>
          </div>
          <Link href="/" className="btn secondary"><ArrowLeft size={16}/> Landing Page</Link>
        </div>

        {section === 'overview' && <section>
          <div className="dashboard-grid">
            <div className="card"><span className="badge">Average Score</span><h2>{averageScore || '--'}</h2><p>Based on tracked rounds.</p></div>
            <div className="card"><span className="badge">Main Goal</span><h2>{profile.goal}</h2><p>{profile.weakness}</p></div>
            <div className="card"><span className="badge">Practice</span><h2>{profile.frequency}</h2><p>Recommended: 2 range days + 1 short game day.</p></div>
            <div className="card"><span className="badge">Club Data</span><h2>{clubs.length}</h2><p>Clubs saved in chart.</p></div>
          </div>
          <div className="card" style={{ marginTop: 18 }}><h3>This Week's Focus</h3><p>Driver accuracy, wedge control from 100 yards and in, and keeping penalties under 2 per round.</p></div>
        </section>}

        {section === 'profile' && <section className="card"><h3>Golf Profile</h3><div className="form-grid">
          {Object.entries(profile).map(([key, value]) => <div className="field" key={key}><label>{key.toUpperCase()}</label><input value={value} onChange={e => setProfile({ ...profile, [key]: e.target.value })}/></div>)}
        </div><button className="btn">Save Profile</button></section>}

        {section === 'goals' && <section className="card"><h3>Swing Goals</h3><p>Choose the areas you want the app to build around.</p><div className="actions">{goalOptions.map(goal => <button key={goal} className={goals.includes(goal) ? 'btn' : 'btn secondary'} onClick={() => toggleGoal(goal)}>{goal}</button>)}</div></section>}

        {section === 'plans' && <section><div className="grid">{plans.map(plan => <div className="card" key={plan.title}><span className="badge">{plan.level}</span><h3>{plan.title}</h3><div className="list">{plan.drills.map(d => <div className="list-item" key={d}>✅ {d}</div>)}</div></div>)}</div></section>}

        {section === 'scores' && <section className="card"><h3>Score Tracker</h3><RoundForm onAdd={r => setRounds([r, ...rounds])}/><table className="table"><thead><tr><th>Date</th><th>Course</th><th>Total</th><th>Putts</th><th>Penalties</th><th>Notes</th></tr></thead><tbody>{rounds.map((r, i) => <tr key={i}><td>{r.date}</td><td>{r.course}</td><td>{r.front + r.back}</td><td>{r.putts}</td><td>{r.penalties}</td><td>{r.notes}</td></tr>)}</tbody></table></section>}

        {section === 'clubs' && <section className="card"><h3>Club Distance Chart</h3><div className="form-grid">{clubs.map((c, i) => <div className="field" key={c.club}><label>{c.club}</label><input type="number" value={c.distance} onChange={e => { const next = [...clubs]; next[i] = { ...c, distance: Number(e.target.value) }; setClubs(next); }}/></div>)}</div></section>}

        {section === 'coach' && <section className="card"><h3>AI Coach Feedback</h3><div className="field"><label>Ask your coach</label><textarea value={coachQuestion} onChange={e => setCoachQuestion(e.target.value)} /></div><button className="btn" onClick={askCoach}>Get Feedback</button>{coachAnswer && <div className="list-item" style={{ marginTop: 18 }}><strong>Coach Feedback:</strong><p>{coachAnswer}</p></div>}</section>}

        {section === 'videos' && <section className="card"><h3>Video Upload Notes</h3><VideoForm onAdd={v => setVideoNotes([v, ...videoNotes])}/><div className="list">{videoNotes.map((v, i) => <div className="list-item" key={i}><strong>{v.title}</strong><p>Club: {v.club}</p><p>{v.note}</p></div>)}</div></section>}

        {section === 'membership' && <section className="pricing"><div className="card price"><h3>Free</h3><div className="amount">$0</div><p>Basic tools.</p><button className="btn secondary">Current</button></div><div className="card price popular"><h3>MIG Player</h3><div className="amount">$9.99</div><p>Practice plans, AI coach, progress, video notes.</p><button className="btn">Upgrade</button></div><div className="card price"><h3>MIG Elite</h3><div className="amount">$29.99</div><p>Personalized plans, tournament prep, exclusive content.</p><button className="btn">Go Elite</button></div></section>}
      </main>
    </div>
  );
}

function RoundForm({ onAdd }: { onAdd: (r: Round) => void }) {
  const [r, setR] = useState<Round>({ course: '', date: new Date().toISOString().slice(0,10), front: 0, back: 0, putts: 0, penalties: 0, notes: '' });
  return <div className="form-grid" style={{ marginBottom: 20 }}>
    {(['course','date','front','back','putts','penalties','notes'] as const).map(k => <div className="field" key={k}><label>{k.toUpperCase()}</label><input type={['front','back','putts','penalties'].includes(k) ? 'number' : k === 'date' ? 'date' : 'text'} value={r[k] as any} onChange={e => setR({ ...r, [k]: ['front','back','putts','penalties'].includes(k) ? Number(e.target.value) : e.target.value })}/></div>)}
    <button className="btn" onClick={() => onAdd(r)}>Add Round</button>
  </div>;
}

function VideoForm({ onAdd }: { onAdd: (v: {title:string; club:string; note:string}) => void }) {
  const [v, setV] = useState({ title: '', club: 'Driver', note: '' });
  return <div className="form-grid" style={{ marginBottom: 20 }}>
    <div className="field"><label>VIDEO TITLE</label><input value={v.title} onChange={e => setV({...v, title:e.target.value})}/></div>
    <div className="field"><label>CLUB</label><input value={v.club} onChange={e => setV({...v, club:e.target.value})}/></div>
    <div className="field"><label>NOTES</label><input value={v.note} onChange={e => setV({...v, note:e.target.value})}/></div>
    <div className="field"><label>UPLOAD VIDEO</label><input type="file" accept="video/*" /></div>
    <button className="btn" onClick={() => onAdd(v)}>Save Video Note</button>
  </div>;
}
