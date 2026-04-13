const items = [
  { num: "3.8M", label: "Trade jobs going unfilled by 2032" },
  { num: "$90K+", label: "Average union electrician salary" },
  { num: "Paid", label: "Training that starts with real wages on the job" },
  { num: "4", label: "Steps from curious to first paycheck" },
] as const;

export function ProofStrip() {
  return (
    <div className="proof-strip">
      {items.map((item) => (
        <div className="proof-item" key={item.label}>
          <div className="proof-num">{item.num}</div>
          <div className="proof-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
