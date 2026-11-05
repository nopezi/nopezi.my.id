import { tickerItems } from "@/lib/data";

export default function Ticker() {
  const Group = ({ hidden }: { hidden: boolean }) => (
    <span aria-hidden={hidden} style={{ display: "contents" }}>
      {tickerItems.map((t, i) => (
        <span key={i}>{t}</span>
      ))}
    </span>
  );
  return (
    <div className="ticker" aria-hidden="true">
      <div className="tk-track">
        <Group hidden={false} />
        <Group hidden={true} />
      </div>
    </div>
  );
}
