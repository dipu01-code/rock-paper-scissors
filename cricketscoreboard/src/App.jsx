import { useState } from "react";

const defaultData = {
  bat1: 5,
  bat2: 3,
  total: 122,
  wkts: 3,
  lastWkt: 21,
  lastMan: 70,
  firstInns: 78,
  overs: 23,
  runsReq: 23,
  row4Left: 269,
  row4Mid: 23,
  row4Right: 150,
  boardName: "The Les Reed Scoreboard",
};

const ledStyle = {
  fontFamily: "'Share Tech Mono', 'Courier New', monospace",
  color: "#ffaa00",
  lineHeight: 1,
  display: "block",
};

function LedNumber({ value, size = 52 }) {
  return (
    <span
      style={{
        ...ledStyle,
        fontSize: size,
        textShadow: "0 0 12px rgba(255,170,0,0.55), 0 0 2px rgba(255,170,0,0.9)",
      }}
    >
      {value}
    </span>
  );
}

function Label({ children }) {
  return (
    <span
      style={{
        color: "#aac8f0",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "1.8px",
        textTransform: "uppercase",
        fontFamily: "var(--font-sans, sans-serif)",
        display: "block",
        marginTop: 4,
      }}
    >
      {children}
    </span>
  );
}

function Cell({ children, style = {} }) {
  return (
    <div
      style={{
        background: "#0b1e4a",
        borderRadius: 6,
        padding: "10px 12px",
        textAlign: "center",
        border: "1px solid #142860",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function EditButtons({ onMinus, onPlus }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 8 }}>
      <button
        onClick={onMinus}
        style={{
          width: 26,
          height: 22,
          border: "1px solid #2a4a90",
          borderRadius: 4,
          background: "transparent",
          color: "#aac8f0",
          cursor: "pointer",
          fontWeight: 700,
        }}
      >
        -
      </button>
      <button
        onClick={onPlus}
        style={{
          width: 26,
          height: 22,
          border: "1px solid #2a4a90",
          borderRadius: 4,
          background: "transparent",
          color: "#aac8f0",
          cursor: "pointer",
          fontWeight: 700,
        }}
      >
        +
      </button>
    </div>
  );
}

export default function CricketScoreboard({ initialData = defaultData }) {
  const [data, setData] = useState(initialData);
  const [editing, setEditing] = useState(false);

  const updateField = (key, delta) => {
    setData((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  };

  const grid = { display: "grid", gridTemplateColumns: "1fr 1.4fr 1fr", gap: 6 };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          background: "#081530",
          borderRadius: 14,
          padding: "22px 18px 18px",
          maxWidth: 560,
          margin: "0 auto",
          border: "3px solid #152a5e",
          boxSizing: "border-box",
        }}
      >
        {/* Title */}
        <div
          style={{
            textAlign: "center",
            color: "#ffffff",
            fontSize: 17,
            fontWeight: 800,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
            marginBottom: 16,
          }}
        >
          {data.boardName}
        </div>

        {/* Row 1 — BAT / TOTAL / BAT */}
        <div style={{ ...grid, marginBottom: 6 }}>
          <Cell>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <LedNumber value={data.bat1} size={42} />
              <span style={{ color: "#aac8f0", fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "sans-serif" }}>BAT</span>
            </div>
            {editing && <EditButtons onMinus={() => updateField("bat1", -1)} onPlus={() => updateField("bat1", 1)} />}
          </Cell>
          <Cell>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", fontFamily: "sans-serif", display: "block", marginBottom: 2 }}>
              TOTAL
            </span>
            {editing && <EditButtons onMinus={() => updateField("total", -1)} onPlus={() => updateField("total", 1)} />}
          </Cell>
          <Cell>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <span style={{ color: "#aac8f0", fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "sans-serif" }}>BAT</span>
              <LedNumber value={data.bat2} size={42} />
            </div>
            {editing && <EditButtons onMinus={() => updateField("bat2", -1)} onPlus={() => updateField("bat2", 1)} />}
          </Cell>
        </div>

        {/* Row 2 — Last WKT / Total Score+WKTS / Last Man */}
        <div style={{ ...grid, marginBottom: 6 }}>
          <Cell>
            <LedNumber value={data.lastWkt} />
            <Label>Last WKT</Label>
            {editing && <EditButtons onMinus={() => updateField("lastWkt", -1)} onPlus={() => updateField("lastWkt", 1)} />}
          </Cell>
          <Cell>
            <LedNumber value={data.total} size={62} />
            <Label>WKTS</Label>
            {editing && <EditButtons onMinus={() => updateField("wkts", -1)} onPlus={() => updateField("wkts", 1)} />}
          </Cell>
          <Cell>
            <LedNumber value={data.lastMan} />
            <Label>Last Man</Label>
            {editing && <EditButtons onMinus={() => updateField("lastMan", -1)} onPlus={() => updateField("lastMan", 1)} />}
          </Cell>
        </div>

        {/* Row 3 — 1st Inns / Overs / Runs Req */}
        <div style={{ ...grid, marginBottom: 6 }}>
          <Cell>
            <LedNumber value={data.firstInns} />
            <Label>1st Inns</Label>
            {editing && <EditButtons onMinus={() => updateField("firstInns", -1)} onPlus={() => updateField("firstInns", 1)} />}
          </Cell>
          <Cell>
            <LedNumber value={data.overs} size={42} />
            <Label>Overs</Label>
            {editing && <EditButtons onMinus={() => updateField("overs", -1)} onPlus={() => updateField("overs", 1)} />}
          </Cell>
          <Cell>
            <LedNumber value={data.runsReq} />
            <Label>Runs Req</Label>
            {editing && <EditButtons onMinus={() => updateField("runsReq", -1)} onPlus={() => updateField("runsReq", 1)} />}
          </Cell>
        </div>

        {/* Row 4 — Bottom numbers */}
        <div style={{ ...grid, marginBottom: 16 }}>
          <Cell>
            <LedNumber value={data.row4Left} />
            {editing && <EditButtons onMinus={() => updateField("row4Left", -1)} onPlus={() => updateField("row4Left", 1)} />}
          </Cell>
          <Cell>
            <LedNumber value={data.row4Mid} />
            {editing && <EditButtons onMinus={() => updateField("row4Mid", -1)} onPlus={() => updateField("row4Mid", 1)} />}
          </Cell>
          <Cell>
            <LedNumber value={data.row4Right} />
            {editing && <EditButtons onMinus={() => updateField("row4Right", -1)} onPlus={() => updateField("row4Right", 1)} />}
          </Cell>
        </div>

        {/* Edit Button */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => setEditing((prev) => !prev)}
            style={{
              background: "transparent",
              border: "1px solid #2a4a90",
              borderRadius: 6,
              color: "#aac8f0",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              padding: "7px 20px",
              cursor: "pointer",
              fontFamily: "sans-serif",
            }}
          >
            {editing ? "Done Updating" : "Update/Edit Scores"}
          </button>
        </div>
      </div>
    </>
  );
}