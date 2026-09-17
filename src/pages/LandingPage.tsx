import { Link } from "react-router-dom";
import {
  Satellite,
  CloudRain,
  MapPinned,
  Route,
  Clock,
  Users,
  Shield,
  TrendingDown,
  Leaf,
  ChevronRight,
  ArrowRight,
  Waves,
} from "lucide-react";

const features = [
  {
    icon: Satellite,
    title: "Satellite-powered monitoring",
    desc: "Sentinel-1 SAR works through cloud cover",
  },
  {
    icon: CloudRain,
    title: "Forecast-assisted alerts",
    desc: "Combine observed floods with weather outlooks",
  },
  {
    icon: MapPinned,
    title: "Exposure-based risk analysis",
    desc: "Population, roads, and critical assets",
  },
  {
    icon: Route,
    title: "Shelter & route intelligence",
    desc: "Faster, safer evacuation decisions",
  },
];

const problems = [
  "Delayed flood assessment after events",
  "Manual map preparation that costs hours",
  "Unclear boundaries of affected zones",
  "Poor visibility of vulnerable infrastructure",
  "Difficulty prioritising rescue operations",
];

const solutions = [
  {
    title: "Detect flood extent",
    text: "Using Sentinel-1 SAR imagery even under cloud cover",
  },
  {
    title: "Fuse with forecasts",
    text: "Combine observed maps with rainfall and river forecasts",
  },
  {
    title: "Map exposure",
    text: "Identify vulnerable roads, homes, and critical infrastructure",
  },
  {
    title: "Guide response",
    text: "Display shelters, capacity, and recommended evacuation routes",
  },
  {
    title: "Human validation",
    text: "Support human-in-the-loop review before operational decisions",
  },
];

const workflow = [
  "Satellite & Weather Data",
  "Data Pre-processing",
  "Flood Detection",
  "Exposure & Risk Analysis",
  "Shelter & Route Planning",
  "Human Validation",
  "Decision Support Dashboard",
];

const impacts = [
  {
    icon: Clock,
    title: "Faster response",
    text: "Hours reduced to minutes for situational awareness",
  },
  {
    icon: Users,
    title: "Safer evacuation",
    text: "Routes and shelters prioritised by risk and capacity",
  },
  {
    icon: Shield,
    title: "Better resource allocation",
    text: "Focus boats, teams, and supplies where needed most",
  },
  {
    icon: TrendingDown,
    title: "Reduced losses",
    text: "Earlier action limits damage to life and assets",
  },
  {
    icon: Leaf,
    title: "Climate resilience",
    text: "Repeatable, evidence-based flood preparedness",
  },
];

export function LandingPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-flood-600/40 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-flood-500/50 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-flood-600/20 border border-flood-500/30 text-flood-300 text-xs font-medium mb-6">
                <Waves className="w-3.5 h-3.5" />
                Flood Inundation Mapping & Decision Support
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                Smarter Flood Intelligence.
                <br />
                <span className="text-flood-400">
                  Faster Emergency Decisions.
                </span>
              </h1>
              <p className="mt-5 text-navy-300 text-base sm:text-lg max-w-xl leading-relaxed">
                An intelligent flood monitoring and decision-support platform
                that combines satellite-based flood mapping, forecast-assisted
                risk analysis, exposure data, shelters, and evacuation routes.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/dashboard"
                  className="btn-primary bg-flood-500 hover:bg-flood-400 text-navy-950 font-semibold"
                >
                  Launch Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/map"
                  className="btn-secondary bg-transparent border-navy-600 text-white hover:bg-navy-800"
                >
                  Explore Flood Map
                </Link>
              </div>
              <p className="mt-4 text-xs text-navy-500">
                Prototype with demo data · Not connected to live feeds
              </p>
            </div>

            {/* Abstract geospatial visual */}
            <div className="relative hidden lg:block">
              <div className="aspect-[4/3] rounded-2xl border border-navy-700 bg-navy-900/80 p-6 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-navy-400 uppercase tracking-wider">
                    Live Extent · Demo
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-danger-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-danger-500 animate-pulse" />
                    Active
                  </span>
                </div>
                <div className="relative h-48 rounded-lg bg-navy-800 overflow-hidden">
                  {/* Simulated map polygons */}
                  <div className="absolute top-6 left-8 w-28 h-20 rounded-lg bg-flood-500/40 border border-flood-400/50" />
                  <div className="absolute top-16 left-24 w-32 h-24 rounded-lg bg-danger-500/30 border border-danger-400/40" />
                  <div className="absolute bottom-8 right-12 w-24 h-16 rounded-lg bg-warning-500/30 border border-warning-400/40" />
                  <div className="absolute top-10 right-16 w-3 h-3 rounded-full bg-success-400 shadow-lg shadow-success-400/50" />
                  <div className="absolute bottom-16 left-16 w-3 h-3 rounded-full bg-success-400" />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-navy-800/80 p-2.5">
                    <p className="text-[10px] text-navy-500">Affected</p>
                    <p className="text-sm font-semibold text-white">
                      128.6 km²
                    </p>
                  </div>
                  <div className="rounded-lg bg-navy-800/80 p-2.5">
                    <p className="text-[10px] text-navy-500">At risk</p>
                    <p className="text-sm font-semibold text-white">86,420</p>
                  </div>
                  <div className="rounded-lg bg-navy-800/80 p-2.5">
                    <p className="text-[10px] text-navy-500">Alerts</p>
                    <p className="text-sm font-semibold text-danger-400">12</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-navy-100 bg-navy-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-3">
                <div className="p-2 rounded-lg bg-flood-50 text-flood-600 shrink-0 h-fit">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-navy-900 text-sm">{title}</h3>
                  <p className="text-xs text-navy-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">
              The challenge
            </h2>
            <p className="mt-3 text-navy-600">
              Flood response still relies on delayed assessments and fragmented
              information. Critical hours are lost before decision-makers have a
              clear picture.
            </p>
          </div>
          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {problems.map((p) => (
              <li
                key={p}
                className="flex gap-3 p-4 rounded-xl border border-navy-100 bg-white"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-danger-500 mt-2 shrink-0" />
                <span className="text-sm text-navy-700">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 sm:py-20 bg-navy-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">
              How Flood Guard helps
            </h2>
            <p className="mt-3 text-navy-600">
              From satellite detection to validated decision support — a single
              operational picture.
            </p>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.map((s, i) => (
              <div key={s.title} className="glass-card rounded-xl p-5">
                <span className="text-xs font-semibold text-flood-600">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-semibold text-navy-900">{s.title}</h3>
                <p className="mt-1 text-sm text-navy-600">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 text-center">
            Operational workflow
          </h2>
          <p className="mt-2 text-navy-600 text-center max-w-xl mx-auto">
            End-to-end pipeline from data ingestion to decision support.
          </p>
          <div className="mt-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-2">
            {workflow.map((step, i) => (
              <div
                key={step}
                className="flex lg:flex-col items-center gap-3 lg:gap-2 flex-1"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-flood-600 text-white text-sm font-semibold shrink-0">
                  {i + 1}
                </div>
                <p className="text-sm font-medium text-navy-800 text-left lg:text-center leading-snug">
                  {step}
                </p>
                {i < workflow.length - 1 && (
                  <ChevronRight
                    className="hidden lg:block w-5 h-5 text-navy-300 absolute"
                    style={{ display: "none" }}
                  />
                )}
                {i < workflow.length - 1 && (
                  <div className="lg:hidden w-px h-6 bg-navy-200 ml-5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 sm:py-20 bg-navy-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">Impact</h2>
          <p className="mt-2 text-navy-400 text-center max-w-xl mx-auto">
            Designed for disaster-management authorities and emergency-response
            organisations.
          </p>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {impacts.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-xl border border-navy-800 bg-navy-900/50 p-5"
              >
                <Icon className="w-6 h-6 text-flood-400" />
                <h3 className="mt-3 font-semibold text-white">{title}</h3>
                <p className="mt-1 text-sm text-navy-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">
            Make every flood decision faster and more informed.
          </h2>
          <p className="mt-3 text-navy-600">
            Open the Flood Guard dashboard to explore maps, risk analysis,
            shelters, and alerts — all with clearly labelled demo data.
          </p>
          <Link
            to="/dashboard"
            className="mt-8 inline-flex btn-primary text-base px-6 py-3"
          >
            Open Flood Guard Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-navy-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Waves className="w-5 h-5 text-flood-600" />
            <span className="font-semibold text-navy-900">Flood Guard</span>
            <span className="text-navy-400 text-sm">
              · Turning Flood Data into Faster Decisions
            </span>
          </div>
          <p className="text-xs text-navy-400">
            Prototype · Decision-support concept · Not for operational use
            without validation
          </p>
        </div>
      </footer>
    </div>
  );
}
