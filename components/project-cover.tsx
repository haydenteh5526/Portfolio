import type { ReactNode } from "react";
import type { Project } from "@/lib/site";

// Covers are simplified illustrations of each app, not screenshots. Each
// fills its frame with a different composition. The real screenshots open
// from the case study page.
function Nav({ brand, action }: { brand: string; action: string }) {
  return (
    <div className="mock-nav">
      <strong>
        <b />
        {brand}
      </strong>
      <span>
        <i />
        <i />
        <i />
      </span>
      <em>{action}</em>
    </div>
  );
}

function Hero({
  pill,
  title,
  text,
  primary,
  secondary,
}: {
  pill?: string;
  title: ReactNode;
  text: string;
  primary: string;
  secondary: string;
}) {
  return (
    <div className="mock-hero">
      {pill ? <small className="mock-pill">{pill}</small> : null}
      <p className="mock-title">{title}</p>
      <p className="mock-text">{text}</p>
      <p className="mock-cta">
        <em>{primary}</em>
        <span>{secondary}</span>
      </p>
    </div>
  );
}

// DocVault: a sample bill beside the values DocVault extracted from it.
// Each value cites its OCR line, as the bill review screen does.
function ReviewMock() {
  const fields = [
    ["Amount due", "€123.47", "OCR line 15"],
    ["Due date", "23 November 2026", "OCR line 17"],
    ["Billing period", "1–31 October 2026", "OCR line 9"],
  ] as const;
  return (
    <>
      <div className="dv-paper">
        <p className="dv-paper-head">
          <strong>Example Energy</strong>
          <small>Electricity bill</small>
        </p>
        {[72, 54, 64].map((width, index) => (
          <i key={index} style={{ width: `${width}%` }} />
        ))}
        <p className="dv-paper-total">
          <span>Total amount due</span>
          <strong>EUR 123.47</strong>
        </p>
        {[80, 46, 68, 58, 74].map((width, index) => (
          <i key={index} style={{ width: `${width}%` }} />
        ))}
      </div>
      <div className="dv-card">
        <p className="dv-card-head">
          <b />
          Bill review
        </p>
        {fields.map(([label, value, source], index) => (
          <div
            className="dv-field"
            key={label}
            data-on={index === 0 || undefined}
          >
            <small>{label}</small>
            <strong>{value}</strong>
            <span>{source}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function Phone({ selected }: { selected: number }) {
  return (
    <div className="mock-phone" data-look={selected}>
      <div className="mock-photo" />
      <p className="mock-heading">
        <strong>{["Original", "GTX III", "RX100", "GR III"][selected]}</strong>
        <span>Compare</span>
      </p>
      <div className="mock-looks">
        {["Original", "GTX III", "RX100", "GR III"].map((look, index) => (
          <span key={look} data-on={index === selected || undefined}>
            <b />
            {look}
          </span>
        ))}
      </div>
    </div>
  );
}

// VibeCam: a brand panel with two tilted phones.
function PhoneMock() {
  return (
    <>
      <i className="mock-orb" />
      <div className="mock-brand">
        <b />
        <strong>VibeCam</strong>
        <span>Offline pocket-camera simulator</span>
      </div>
      <div className="mock-phones">
        <Phone selected={1} />
        <Phone selected={3} />
      </div>
    </>
  );
}

// A transit light curve: brightness readings that dip while a planet
// crosses its star. The scatter is deterministic so renders match.
function LightCurve() {
  const points = Array.from({ length: 64 }, (_, index) => {
    const x = 4 + index * 3.1;
    const depth = Math.max(0, 1 - Math.abs(x - 112) / 22);
    const dip = Math.min(1, depth * 1.8) * 18;
    const noise = Math.sin(index * 12.9898) * 43758.5453;
    const y = 12 + dip + (noise - Math.floor(noise) - 0.5) * 6;
    return [x, y] as const;
  });
  return (
    <svg
      className="mock-curve"
      viewBox="0 0 200 40"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M0 12H86C94 12 96 30 104 30H120C128 30 130 12 138 12H200"
        stroke="currentColor"
      />
      <path
        className="mock-curve-points"
        d={points
          .map(([x, y]) => `M${x.toFixed(1)} ${y.toFixed(1)}h0`)
          .join("")}
        stroke="currentColor"
      />
    </svg>
  );
}

// Exoplanet AI Hunter: the landing page itself, edge to edge.
function ClassifierMock() {
  return (
    <div className="mock-fill" data-dark>
      <Nav brand="Exoplanet AI Hunter" action="Classify" />
      <Hero
        pill="2025 NASA Space Apps Challenge"
        title={
          <>
            A World Away: Hunting for <u>Exoplanets with AI</u>
          </>
        }
        text="Classify transit observations from Kepler, K2 and TESS."
        primary="Start Classification"
        secondary="Learn More"
      />
      <LightCurve />
    </div>
  );
}

// CourseXcel: the claim trend chart from the admin dashboard, with the
// subjects-assigned chart in front. Values follow the sample data.
function DashboardMock() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  return (
    <>
      <div className="cx-panel">
        <p className="cx-head">
          <strong>Part-time lecturer claim trend</strong>
          <span>COMP</span>
          <span>2026</span>
        </p>
        <svg
          className="cx-chart"
          viewBox="0 0 280 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d="M0 25H280M0 50H280M0 75H280" className="cx-grid" />
          <path
            d="M0 58C14 44 24 30 40 30S64 44 80 42 104 18 120 18 146 34 160 30 186 4 200 6 216 98 240 98H280V100H0Z"
            className="cx-area"
          />
          <path
            d="M0 58C14 44 24 30 40 30S64 44 80 42 104 18 120 18 146 34 160 30 186 4 200 6 216 98 240 98H280"
            className="cx-line"
          />
        </svg>
        <p className="cx-axis">
          {months.map((month) => (
            <span key={month}>{month}</span>
          ))}
        </p>
      </div>
      <div className="cx-card">
        <strong>Subjects assigned</strong>
        <div className="cx-bars">
          <span>
            <i style={{ height: "50%" }} />
            Alex Morgan
          </span>
          <span>
            <i style={{ height: "100%" }} />
            Jamie Chen
          </span>
        </div>
      </div>
    </>
  );
}

// F1 Strategy Visualisation: a race-broadcast graphic, edge to edge.
function StrategyMock() {
  // Illustrative stints: [compound, share of race].
  const drivers = [
    ["HAM", ["m", 34], ["h", 66]],
    ["VER", ["m", 30], ["h", 44], ["s", 26]],
    ["ANT", ["h", 52], ["m", 48]],
    ["RUS", ["m", 38], ["h", 62]],
    ["LEC", ["s", 22], ["h", 46], ["m", 32]],
  ] as const;
  return (
    <div className="mock-fill mock-race" data-dark>
      <p className="mock-race-meta">
        <small>Red Bull Ring</small>
        <em>Lap 71 / 71</em>
      </p>
      <p className="mock-race-title">2026 Austrian Grand Prix</p>
      <div className="mock-stints">
        {drivers.map(([code, ...stints]) => (
          <div className="mock-stint" key={code}>
            <small>{code}</small>
            <div>
              {stints.map(([compound, share], index) => (
                <i
                  key={index}
                  data-compound={compound}
                  style={{ flexGrow: share }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mock-legend">
        <i data-compound="s" />
        Soft
        <i data-compound="m" />
        Medium
        <i data-compound="h" />
        Hard
      </p>
    </div>
  );
}

const mocks: Record<string, () => ReactNode> = {
  review: ReviewMock,
  phone: PhoneMock,
  classifier: ClassifierMock,
  dashboard: DashboardMock,
  strategy: StrategyMock,
};

export function ProjectCover({
  screenshot,
}: {
  screenshot: Project["screenshot"];
}) {
  const Mock = mocks[screenshot.layout];
  return (
    <div
      className="project-cover"
      data-layout={screenshot.layout}
      aria-hidden="true"
    >
      <div className="project-cover-composition">{Mock ? <Mock /> : null}</div>
    </div>
  );
}
