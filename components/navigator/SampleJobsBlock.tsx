import type { JobOpportunity } from "@/lib/career/types";

function typeClass(t: JobOpportunity["type"]) {
  if (t === "Union") return "union";
  if (t === "Contractor") return "contract";
  return "other";
}

export function SampleJobsBlock({ jobs }: { jobs: JobOpportunity[] }) {
  if (!jobs.length) return null;

  return (
    <div className="job-sample-block">
      <div className="job-sample-head">
        <span className="job-sample-title">Sample openings & programs</span>
        <span className="job-sample-disclaimer">Demo data — confirm live dates with each employer or union.</span>
      </div>
      <ul className="job-sample-list">
        {jobs.map((j) => (
          <li key={j.id} className="job-sample-row">
            <div className="job-sample-top">
              <span className={`job-type-pill job-type-${typeClass(j.type)}`}>{j.type}</span>
              <span className="job-sample-loc">{j.location}</span>
            </div>
            <div className="job-sample-role">{j.title}</div>
            <div className="job-sample-meta">
              <strong>{j.employer}</strong>
              <span>·</span>
              <span>{j.payLabel}</span>
              <span>·</span>
              <span>{j.opens}</span>
            </div>
            <p className="job-sample-hint">{j.matchHint}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
