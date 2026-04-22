import { useRef, useState, useEffect } from 'react';

const BPM = 126;
const Q = 60 / BPM; // quarter note in seconds

const F: Record<string, number> = {
  _: 0,
  D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.0,
};

// [note, quarter-note beats]
const LEAD: [string, number][] = [
  // Phrase A — ascending quest motif
  ['C5', 0.5], ['_', 0.25], ['E5', 0.25], ['G5', 0.75], ['E5', 0.25],
  ['D5', 0.5], ['F5', 0.5], ['A5', 1],
  ['G5', 0.5], ['_', 0.25], ['E5', 0.25], ['C5', 0.5], ['D5', 0.5],
  ['C5', 2],
  // Phrase B — variation with slight tension
  ['E5', 0.5], ['_', 0.25], ['G5', 0.25], ['A5', 0.75], ['G5', 0.25],
  ['F5', 0.5], ['A5', 0.5], ['G5', 1],
  ['E5', 0.5], ['D5', 0.5], ['C5', 0.5], ['B4', 0.5],
  ['C5', 2],
  // Bridge — moving downward
  ['G5', 0.5], ['F5', 0.25], ['E5', 0.25], ['D5', 0.5], ['C5', 0.5],
  ['D5', 0.5], ['E5', 0.5], ['F5', 0.5], ['G5', 0.5],
  ['A5', 0.5], ['G5', 0.5], ['F5', 0.5], ['E5', 0.5],
  ['D5', 0.5], ['E5', 0.5], ['G4', 0.5], ['_', 0.5],
  // Return — triumphant close
  ['C5', 0.5], ['D5', 0.5], ['E5', 0.5], ['G5', 0.5],
  ['E5', 0.5], ['D5', 0.5], ['C5', 1],
  ['_', 0.5], ['G4', 0.25], ['A4', 0.25], ['C5', 0.5], ['E5', 0.5],
  ['C5', 2],
];

const BASS: [string, number][] = [
  ['C4', 1], ['G3', 1], ['A3', 1], ['F3', 1],
  ['C4', 1], ['G3', 1], ['C4', 2],
  ['C4', 1], ['G3', 1], ['F3', 1], ['G3', 1],
  ['E3', 1], ['G3', 1], ['C4', 2],
  // Bridge bass
  ['G3', 1], ['F3', 1], ['E3', 1], ['G3', 1],
  ['A3', 1], ['F3', 1], ['D3', 1], ['E3', 1],
  // Return
  ['C4', 1], ['G3', 1], ['A3', 1], ['F3', 1],
  ['G3', 1], ['E3', 1], ['C4', 2],
];

function playNote(
  ctx: AudioContext,
  freq: number,
  start: number,
  dur: number,
  type: OscillatorType,
  vol: number,
) {
  if (freq === 0) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(vol, start);
  gain.gain.exponentialRampToValueAtTime(0.001, start + dur * 0.85);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + dur);
}

function scheduleDrum(ctx: AudioContext, start: number, vol = 0.08) {
  const buf = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const src = ctx.createBufferSource();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 180;
  src.buffer = buf;
  src.connect(filter);
  filter.connect(gain);
  gain.gain.value = vol;
  gain.connect(ctx.destination);
  src.start(start);
}

function schedulePattern(ctx: AudioContext, at: number): number {
  let leadT = at;
  for (const [n, b] of LEAD) {
    const dur = b * Q;
    playNote(ctx, F[n] ?? 0, leadT, dur, 'square', 0.12);
    leadT += dur;
  }

  let bassT = at;
  let bi = 0;
  while (bassT < leadT) {
    const [n, b] = BASS[bi % BASS.length];
    const dur = b * Q;
    playNote(ctx, F[n] ?? 0, bassT, dur, 'triangle', 0.09);
    bassT += dur;
    bi++;
  }

  // 4-on-the-floor kick pattern
  const barLen = Q * 2;
  const totalBars = Math.ceil((leadT - at) / barLen);
  for (let i = 0; i < totalBars * 2; i++) {
    scheduleDrum(ctx, at + i * barLen * 0.5);
  }

  return leadT - at;
}

export function useChiptune() {
  const ctxRef = useRef<AudioContext | null>(null);
  const stopRef = useRef<() => void>(() => {});
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (playing) {
      stopRef.current();
      return;
    }

    const ctx = new AudioContext();
    ctxRef.current = ctx;
    let alive = true;
    let nextStart = ctx.currentTime + 0.05;

    const loop = () => {
      if (!alive) return;
      const duration = schedulePattern(ctx, nextStart);
      nextStart += duration;
      const msUntilEnd = (nextStart - ctx.currentTime) * 1000 - 400;
      setTimeout(loop, Math.max(0, msUntilEnd));
    };

    loop();
    setPlaying(true);

    stopRef.current = () => {
      alive = false;
      ctx.close();
      setPlaying(false);
    };
  };

  useEffect(() => () => stopRef.current(), []);

  return { playing, toggle };
}
