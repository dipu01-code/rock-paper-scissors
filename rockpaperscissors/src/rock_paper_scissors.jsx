import { useState } from "react";

const emojis = { rock: "🪨", paper: "📄", scissors: "✂️" };
const choices = ["rock", "paper", "scissors"];
const wins = { rock: "scissors", paper: "rock", scissors: "paper" };


export default function RockPaperScissors() {
    const [scores, setScores] = useState({ you: 0, draw: 0, cpu: 0 });
    const [youPick, setYouPick] = useState(null);
    const [cpuPick, setCpuPick] = useState(null);
    const [result, setResult] = useState(null);
    const [selected, setSelected] = useState(null);
    const [animKey, setAnimKey] = useState(0);
    const [moveHistory, setMoveHistory] = useState([]);
    const [winStreak, setWinStreak] = useState(0);
    const totalGames = scores.you + scores.draw + scores.cpu;

    const play = (choice) => {
        const cpu = choices[Math.floor(Math.random() * 3)];
        let outcome;
        if (choice === cpu) outcome = "draw";
        else if (wins[choice] === cpu) outcome = "win";
        else outcome = "lose";

        setYouPick(choice);
        setCpuPick(cpu);
        setResult(outcome);
        setSelected(choice);
        setAnimKey((k) => k + 1);
        setScores((s) => ({
            ...s,
            you: s.you + (outcome === "win" ? 1 : 0),
            draw: s.draw + (outcome === "draw" ? 1 : 0),
            cpu: s.cpu + (outcome === "lose" ? 1 : 0),
        }));
        setWinStreak((streak) => (outcome === "win" ? streak + 1 : 0));
        setMoveHistory((history) => [
            {
                round: history.length + 1,
                you: choice,
                cpu,
                outcome,
            },
            ...history,
        ]);
    };

    const reset = () => {
        setScores({ you: 0, draw: 0, cpu: 0 });
        setYouPick(null);
        setCpuPick(null);
        setResult(null);
        setSelected(null);
        setMoveHistory([]);
        setWinStreak(0);
    };

    const resultLabel = result === "win" ? "You win!" : result === "lose" ? "CPU wins!" : result === "draw" ? "Draw!" : "";

    return (
        <>
            <div className="rps-root">
                <div className="rps-bg" />
                <div className="rps-card">
                    <div className="rps-title">Rock · Paper · Scissors</div>

                    <div className="rps-scoreboard">
                        {[["You", scores.you], ["Draw", scores.draw], ["CPU", scores.cpu]].map(([label, val]) => (
                            <div className="rps-score" key={label}>
                                <div className="rps-score-label">{label}</div>
                                <div className="rps-score-value">{val}</div>
                            </div>
                        ))}
                    </div>

                    <div className="rps-total-games">Total games played: {totalGames}</div>
                    <div className="rps-total-games">Current win streak: {winStreak}</div>

                    <div className="rps-arena">
                        <div className="rps-pick-box">
                            <div className="rps-pick-label">You</div>
                            <div
                                key={`you-${animKey}`}
                                className={`rps-pick-emoji${result === "win" ? " animate-win" : result === "lose" ? " animate-lose" : ""}`}
                            >
                                {youPick ? emojis[youPick] : "❓"}
                            </div>
                        </div>
                        <div className="rps-vs">vs</div>
                        <div className="rps-pick-box">
                            <div className="rps-pick-label">CPU</div>
                            <div
                                key={`cpu-${animKey}`}
                                className={`rps-pick-emoji${result === "lose" ? " animate-win" : result === "win" ? " animate-lose" : ""}`}
                            >
                                {cpuPick ? emojis[cpuPick] : "❓"}
                            </div>
                        </div>
                    </div>

                    <div className="rps-result">
                        {result && (
                            <div className={`rps-result-text ${result}`}>{resultLabel}</div>
                        )}
                    </div>

                    <div className="rps-choices">
                        {choices.map((c) => (
                            <button
                                key={c}
                                className={`rps-choice-btn${selected === c ? " selected" : ""}`}
                                onClick={() => play(c)}
                            >
                                <span>{emojis[c]}</span>
                                <span className="rps-choice-name">{c}</span>
                            </button>
                        ))}
                    </div>

                    <button className="rps-reset" onClick={reset}>Reset game</button>

                    <div className="rps-history">
                        <div className="rps-history-title">Move history</div>
                        {moveHistory.length === 0 ? (
                            <div className="rps-history-empty">No rounds played yet.</div>
                        ) : (
                            <ul className="rps-history-list">
                                {moveHistory.map((entry) => (
                                    <li key={entry.round} className="rps-history-item">
                                        Round {entry.round}: You {emojis[entry.you]} vs CPU {emojis[entry.cpu]} - {entry.outcome}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
