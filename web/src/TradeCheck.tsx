import { useState, useRef, useEffect } from "react";
import { PRESET_ITEMS, TradeItem } from "./tradeData";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TradeEntry {
  id: string;
  name: string;
  emoji: string;
  value: number;
}

let _uid = 0;
function uid() {
  return `e${++_uid}`;
}

// ─── Item Search / Picker ─────────────────────────────────────────────────────

interface ItemPickerProps {
  onAdd: (entry: TradeEntry) => void;
  placeholder: string;
  accentClass: string;
}

function ItemPicker({ onAdd, placeholder, accentClass }: ItemPickerProps) {
  const [query, setQuery] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const filtered =
    query.length >= 1
      ? PRESET_ITEMS.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 8)
      : [];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropRef.current &&
        !dropRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function selectPreset(item: TradeItem) {
    onAdd({ id: uid(), name: item.name, emoji: item.emoji, value: item.value });
    setQuery("");
    setShowDropdown(false);
  }

  function addCustom() {
    const name = query.trim();
    const val = parseFloat(customValue);
    if (!name || isNaN(val) || val <= 0) return;
    onAdd({ id: uid(), name, emoji: "📦", value: val });
    setQuery("");
    setCustomValue("");
    setShowDropdown(false);
  }

  const showCustomRow = query.trim().length > 0 && filtered.length === 0;

  return (
    <div className="relative w-full">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder={placeholder}
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:ring-2 focus:ring-offset-0"
            style={{ fontFamily: "Manrope, sans-serif" }}
          />
          {showDropdown && (filtered.length > 0 || showCustomRow) && (
            <div
              ref={dropRef}
              className="absolute z-50 left-0 right-0 top-full mt-1 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden"
            >
              {filtered.map((item) => (
                <button
                  key={item.id}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectPreset(item);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors border-b border-zinc-100 dark:border-zinc-800 last:border-0"
                >
                  <span className="text-xl">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                      {item.name}
                    </div>
                    <div className="text-xs text-zinc-400 dark:text-zinc-500">
                      {item.category}
                    </div>
                  </div>
                  <div className="text-sm font-bold text-zinc-700 dark:text-zinc-300 shrink-0">
                    ${item.value.toLocaleString()}
                  </div>
                </button>
              ))}
              {showCustomRow && (
                <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-800">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                    Custom item — enter a value:
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={customValue}
                      onChange={(e) => setCustomValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addCustom()}
                      placeholder="$ value"
                      className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 outline-none"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    />
                    <button
                      onMouseDown={(e) => {
                        e.preventDefault();
                        addCustom();
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-bold text-white transition-opacity hover:opacity-90 ${accentClass}`}
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Item List ────────────────────────────────────────────────────────────────

interface ItemListProps {
  entries: TradeEntry[];
  onRemove: (id: string) => void;
  emptyText: string;
  borderClass: string;
}

function ItemList({ entries, onRemove, emptyText, borderClass }: ItemListProps) {
  if (entries.length === 0) {
    return (
      <div
        className={`rounded-xl border-2 border-dashed ${borderClass} p-6 text-center text-zinc-400 dark:text-zinc-600 text-sm`}
      >
        {emptyText}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="flex items-center gap-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 px-4 py-3 border border-zinc-100 dark:border-zinc-700"
        >
          <span className="text-xl shrink-0">{entry.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
              {entry.name}
            </div>
          </div>
          <div className="text-sm font-bold text-zinc-700 dark:text-zinc-300 shrink-0">
            ${entry.value.toLocaleString()}
          </div>
          <button
            onClick={() => onRemove(entry.id)}
            className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors text-lg leading-none"
            aria-label="Remove item"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Comparison Bar ───────────────────────────────────────────────────────────

interface CompareBarProps {
  givingTotal: number;
  receivingTotal: number;
}

function CompareBar({ givingTotal, receivingTotal }: CompareBarProps) {
  const total = givingTotal + receivingTotal;
  if (total === 0) return null;

  const givingPct = Math.round((givingTotal / total) * 100);
  const receivingPct = 100 - givingPct;

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs font-semibold mb-1.5">
        <span className="text-red-500">You Give</span>
        <span className="text-emerald-500">You Get</span>
      </div>
      <div className="flex h-5 rounded-full overflow-hidden w-full">
        <div
          className="bg-red-400 dark:bg-red-500 transition-all duration-500"
          style={{ width: `${givingPct}%` }}
        />
        <div
          className="bg-emerald-400 dark:bg-emerald-500 transition-all duration-500"
          style={{ width: `${receivingPct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">
        <span>{givingPct}%</span>
        <span>{receivingPct}%</span>
      </div>
    </div>
  );
}

// ─── Verdict ──────────────────────────────────────────────────────────────────

type Verdict = "WIN" | "FAIR" | "LOSS" | "EMPTY";

function getVerdict(giving: number, receiving: number): Verdict {
  if (giving === 0 && receiving === 0) return "EMPTY";
  if (giving === 0) return "WIN";
  if (receiving === 0) return "LOSS";
  const ratio = receiving / giving;
  if (ratio >= 1.1) return "WIN";
  if (ratio <= 0.9) return "LOSS";
  return "FAIR";
}

const VERDICT_CONFIG: Record<
  Exclude<Verdict, "EMPTY">,
  { icon: string; label: string; desc: string; bg: string; text: string; ring: string }
> = {
  WIN: {
    icon: "🟢",
    label: "WIN",
    desc: "You're getting more value than you're giving!",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    text: "text-emerald-600 dark:text-emerald-400",
    ring: "ring-emerald-200 dark:ring-emerald-800",
  },
  FAIR: {
    icon: "🟡",
    label: "FAIR",
    desc: "Both sides are roughly equal in value.",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    text: "text-amber-600 dark:text-amber-400",
    ring: "ring-amber-200 dark:ring-amber-800",
  },
  LOSS: {
    icon: "🔴",
    label: "LOSS",
    desc: "You're giving more value than you're receiving.",
    bg: "bg-red-50 dark:bg-red-900/20",
    text: "text-red-600 dark:text-red-400",
    ring: "ring-red-200 dark:ring-red-800",
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TradeCheck() {
  const [giving, setGiving] = useState<TradeEntry[]>([]);
  const [receiving, setReceiving] = useState<TradeEntry[]>([]);

  const givingTotal = giving.reduce((s, e) => s + e.value, 0);
  const receivingTotal = receiving.reduce((s, e) => s + e.value, 0);

  const verdict = getVerdict(givingTotal, receivingTotal);

  const tradePct =
    givingTotal > 0
      ? Math.round((receivingTotal / givingTotal) * 100)
      : receivingTotal > 0
      ? Infinity
      : 0;

  const diff = Math.abs(receivingTotal - givingTotal);

  function addGiving(entry: TradeEntry) {
    setGiving((prev) => [...prev, entry]);
  }
  function addReceiving(entry: TradeEntry) {
    setReceiving((prev) => [...prev, entry]);
  }
  function removeGiving(id: string) {
    setGiving((prev) => prev.filter((e) => e.id !== id));
  }
  function removeReceiving(id: string) {
    setReceiving((prev) => prev.filter((e) => e.id !== id));
  }
  function reset() {
    setGiving([]);
    setReceiving([]);
  }

  const hasItems = giving.length > 0 || receiving.length > 0;
  const verdictCfg = verdict !== "EMPTY" ? VERDICT_CONFIG[verdict] : null;

  return (
    <div
      className="w-full h-full overflow-y-auto bg-zinc-50 dark:bg-zinc-950"
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      <div className="max-w-2xl mx-auto px-4 py-6 pb-10 flex flex-col gap-6">

        {/* ── Verdict Card ─────────────────────────────────────────────── */}
        {verdictCfg ? (
          <div
            className={`rounded-2xl ring-2 ${verdictCfg.ring} ${verdictCfg.bg} p-5 flex flex-col gap-3 transition-all duration-500`}
          >
            <div className="flex items-center gap-3">
              <span className="text-4xl">{verdictCfg.icon}</span>
              <div>
                <div
                  className={`text-3xl font-extrabold ${verdictCfg.text}`}
                  style={{ fontFamily: "Fraunces, serif" }}
                >
                  {verdictCfg.label}
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
                  {verdictCfg.desc}
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mt-1">
              <div className="rounded-xl bg-white/70 dark:bg-zinc-900/60 px-3 py-2.5 text-center">
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">You Give</div>
                <div className="text-base font-bold text-red-500">
                  ${givingTotal.toLocaleString()}
                </div>
              </div>
              <div className="rounded-xl bg-white/70 dark:bg-zinc-900/60 px-3 py-2.5 text-center">
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Difference</div>
                <div className="text-base font-bold text-zinc-700 dark:text-zinc-300">
                  ${diff.toLocaleString()}
                </div>
              </div>
              <div className="rounded-xl bg-white/70 dark:bg-zinc-900/60 px-3 py-2.5 text-center">
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">You Get</div>
                <div className="text-base font-bold text-emerald-500">
                  ${receivingTotal.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Trade % */}
            <div className="rounded-xl bg-white/70 dark:bg-zinc-900/60 px-4 py-3 text-center">
              <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                {tradePct === Infinity
                  ? "You're getting something for nothing 🎉"
                  : `You are getting `}
              </span>
              {tradePct !== Infinity && (
                <span
                  className={`text-base font-extrabold ${verdictCfg.text}`}
                >
                  {tradePct}%
                </span>
              )}
              {tradePct !== Infinity && (
                <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  {" "}of what you are giving
                </span>
              )}
            </div>

            {/* Comparison bar */}
            <CompareBar givingTotal={givingTotal} receivingTotal={receivingTotal} />
          </div>
        ) : (
          /* Empty state hero */
          <div className="rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 p-8 text-center flex flex-col items-center gap-3">
            <div className="text-5xl">⚖️</div>
            <div
              className="text-xl font-bold text-zinc-700 dark:text-zinc-300"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              Is your trade fair?
            </div>
            <div className="text-sm text-zinc-500 dark:text-zinc-500 max-w-xs">
              Add items to both sides below to instantly see if you're winning,
              losing, or breaking even on a trade.
            </div>
          </div>
        )}

        {/* ── Trade Sides ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* You Give */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2
                className="text-base font-extrabold text-red-500"
                style={{ fontFamily: "Fraunces, serif" }}
              >
                🔴 You Give
              </h2>
              {givingTotal > 0 && (
                <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                  Total: ${givingTotal.toLocaleString()}
                </span>
              )}
            </div>
            <ItemPicker
              onAdd={addGiving}
              placeholder="Search or type an item…"
              accentClass="bg-red-500"
            />
            <ItemList
              entries={giving}
              onRemove={removeGiving}
              emptyText="No items added yet"
              borderClass="border-red-200 dark:border-red-900"
            />
          </div>

          {/* You Get */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2
                className="text-base font-extrabold text-emerald-500"
                style={{ fontFamily: "Fraunces, serif" }}
              >
                🟢 You Get
              </h2>
              {receivingTotal > 0 && (
                <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                  Total: ${receivingTotal.toLocaleString()}
                </span>
              )}
            </div>
            <ItemPicker
              onAdd={addReceiving}
              placeholder="Search or type an item…"
              accentClass="bg-emerald-500"
            />
            <ItemList
              entries={receiving}
              onRemove={removeReceiving}
              emptyText="No items added yet"
              borderClass="border-emerald-200 dark:border-emerald-900"
            />
          </div>
        </div>

        {/* ── Reset ────────────────────────────────────────────────────── */}
        {hasItems && (
          <button
            onClick={reset}
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-3 text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-red-500 hover:border-red-200 dark:hover:border-red-800 transition-colors"
          >
            🔄 Reset Trade
          </button>
        )}

        {/* ── How it works ─────────────────────────────────────────────── */}
        <div className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-4">
          <div
            className="text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            How it works
          </div>
          <ul className="text-xs text-zinc-500 dark:text-zinc-500 space-y-1.5">
            <li>🔍 Search preset items or type any name + enter a custom value</li>
            <li>➕ Add multiple items to each side of the trade</li>
            <li>⚖️ The app compares total values and gives an instant verdict</li>
            <li>🟢 WIN = you get ≥110% · 🟡 FAIR = 90–110% · 🔴 LOSS = ≤90%</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
