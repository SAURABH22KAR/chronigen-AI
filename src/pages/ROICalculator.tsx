import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Users, Clock, DollarSign, TrendingUp, Zap, ArrowRight, Calculator } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const INDUSTRIES = [
  { label: 'E-commerce / Retail', multiplier: 1.2 },
  { label: 'Financial Services', multiplier: 1.4 },
  { label: 'Healthcare', multiplier: 1.3 },
  { label: 'SaaS / Technology', multiplier: 1.5 },
  { label: 'Manufacturing', multiplier: 1.1 },
  { label: 'Professional Services', multiplier: 1.3 },
  { label: 'Real Estate', multiplier: 1.2 },
  { label: 'Other', multiplier: 1.0 },
];

const AI_EFFICIENCY = 0.60;

function Slider({
  label, icon: Icon, value, min, max, step, format, onChange,
}: {
  label: string; icon: React.ElementType; value: number; min: number; max: number; step: number;
  format: (v: number) => string; onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
          <Icon size={15} className="text-purple-400" />
          {label}
        </div>
        <span className="text-white font-bold text-sm bg-white/5 border border-white/10 px-3 py-1 rounded-lg">
          {format(value)}
        </span>
      </div>
      <div className="relative h-2 bg-white/5 rounded-full">
        <div
          className="absolute h-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-2"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-purple-500 pointer-events-none"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-600 mt-1.5">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`glow-card rounded-2xl p-6 transition-all duration-500 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">{label}</p>
      <p className={`text-3xl font-extrabold ${color} mb-1`}>{value}</p>
      <p className="text-slate-500 text-xs">{sub}</p>
    </div>
  );
}

export default function ROICalculator() {
  const [employees, setEmployees] = useState(25);
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  const [hourlyRate, setHourlyRate] = useState(35);
  const [industryIdx, setIndustryIdx] = useState(0);
  const { ref: heroRef, inView: heroInView } = useInView();

  const results = useMemo(() => {
    const multiplier = INDUSTRIES[industryIdx].multiplier;
    const hoursSavedPerYear = employees * hoursPerWeek * 52 * AI_EFFICIENCY * multiplier;
    const moneySavedPerYear = hoursSavedPerYear * hourlyRate;
    const chronigenCost = 1499 * 12;
    const netSavings = moneySavedPerYear - chronigenCost;
    const roi = ((netSavings / chronigenCost) * 100);
    const paybackMonths = chronigenCost / (moneySavedPerYear / 12);

    const roiNum = Math.round(Math.max(roi, 0));
    return {
      hoursSaved: Math.round(hoursSavedPerYear).toLocaleString(),
      moneySaved: Math.round(moneySavedPerYear).toLocaleString(),
      netSavings: Math.round(Math.max(netSavings, 0)).toLocaleString(),
      roi: roiNum.toLocaleString(),
      roiNum,
      payback: paybackMonths < 1 ? '< 1 month' : `${Math.ceil(paybackMonths)} months`,
      positive: netSavings > 0,
    };
  }, [employees, hoursPerWeek, hourlyRate, industryIdx]);

  return (
    <div className="min-h-screen pt-16" style={{ background: '#030712' }}>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="orb w-96 h-96 bg-purple-600/15 -top-24 right-0 translate-x-1/3" />
        <div className="orb w-72 h-72 bg-blue-600/10 bottom-0 -left-24" />

        <div
          ref={heroRef}
          className={`max-w-3xl mx-auto px-4 text-center transition-all duration-700 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-1.5 mb-6">
            <Calculator size={13} className="text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">Free ROI Calculator</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
            How Much Could AI{' '}
            <span className="gradient-text">Save Your Business?</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Adjust the sliders below to get a personalized estimate of your potential savings with Chronigen AI.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="pb-28 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="glow-card rounded-2xl p-8 space-y-8">
            <h2 className="text-xl font-extrabold text-white mb-2">Your Business Details</h2>

            <Slider
              label="Employees on repetitive tasks"
              icon={Users}
              value={employees} min={1} max={500} step={1}
              format={(v) => `${v} employees`}
              onChange={setEmployees}
            />
            <Slider
              label="Hours per week on manual tasks"
              icon={Clock}
              value={hoursPerWeek} min={1} max={40} step={1}
              format={(v) => `${v} hrs/week`}
              onChange={setHoursPerWeek}
            />
            <Slider
              label="Average hourly employee cost"
              icon={DollarSign}
              value={hourlyRate} min={10} max={200} step={5}
              format={(v) => `$${v}/hr`}
              onChange={setHourlyRate}
            />

            <div>
              <div className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-3">
                <TrendingUp size={15} className="text-purple-400" />
                Industry
              </div>
              <select
                value={industryIdx}
                onChange={(e) => setIndustryIdx(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
              >
                {INDUSTRIES.map((ind, i) => (
                  <option key={ind.label} value={i} className="bg-[#0a0f1e]">{ind.label}</option>
                ))}
              </select>
            </div>

            <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4 text-xs text-slate-400">
              Based on Chronigen's average <strong className="text-purple-300">60% efficiency gain</strong> with industry-specific multipliers.
              Results are estimates for planning purposes.
            </div>
          </div>

          {/* Results */}
          <div className="space-y-5">
            <div className="glow-card rounded-2xl p-8">
              <h2 className="text-xl font-extrabold text-white mb-6">Your Estimated Annual Savings</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/3 rounded-xl p-4">
                  <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Hours Saved / Year</p>
                  <p className="text-2xl font-extrabold text-blue-400">{results.hoursSaved}</p>
                  <p className="text-slate-600 text-xs mt-0.5">hours recovered</p>
                </div>
                <div className="bg-white/3 rounded-xl p-4">
                  <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Cost Savings / Year</p>
                  <p className="text-2xl font-extrabold text-green-400">${results.moneySaved}</p>
                  <p className="text-slate-600 text-xs mt-0.5">in labor costs</p>
                </div>
                <div className="bg-white/3 rounded-xl p-4">
                  <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Net ROI</p>
                  <p className="text-2xl font-extrabold text-purple-400">{results.roi}%</p>
                  <p className="text-slate-600 text-xs mt-0.5">return on investment</p>
                </div>
                <div className="bg-white/3 rounded-xl p-4">
                  <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Payback Period</p>
                  <p className="text-2xl font-extrabold text-yellow-400">{results.payback}</p>
                  <p className="text-slate-600 text-xs mt-0.5">to break even</p>
                </div>
              </div>

              {/* ROI bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-slate-500 mb-2">
                  <span>Chronigen Annual Cost</span>
                  <span>Your Savings</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-purple-600 to-green-500 transition-all duration-700"
                    style={{ width: `${Math.min((results.roiNum / (results.roiNum + 100)) * 100, 95)}%` }}
                  />
                </div>
              </div>

              <Link
                to="/contact"
                className="btn-gradient w-full flex items-center justify-center gap-2 text-white font-semibold py-4 rounded-xl"
              >
                <Zap size={15} />
                Get My Free AI Roadmap
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* What's included */}
            <div className="glow-card rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4 text-sm">What Chronigen automates for you:</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Data entry & processing',
                  'Customer support replies',
                  'Lead qualification',
                  'Report generation',
                  'Email follow-ups',
                  'Invoice processing',
                  'Appointment scheduling',
                  'Inventory updates',
                ].map((task) => (
                  <div key={task} className="flex items-center gap-2 text-xs text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex-shrink-0" />
                    {task}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Avg. Client ROI" value="350%" sub="in year one" color="text-purple-400" />
          <StatCard label="Cost Reduction" value="60%" sub="in operations" color="text-blue-400" />
          <StatCard label="Faster Tasks" value="10×" sub="vs manual work" color="text-cyan-400" />
          <StatCard label="Go Live In" value="48hrs" sub="from kickoff" color="text-green-400" />
        </div>
      </section>
    </div>
  );
}
