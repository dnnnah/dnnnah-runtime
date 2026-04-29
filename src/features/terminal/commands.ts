import type { TerminalLine } from './types'

type CommandMap = Record<string, TerminalLine[]>

// ─── Uptime del módulo (se fija al importar por primera vez) ─────────────────
const SESSION_START = Date.now()

/** Formatea milisegundos en "Xh Ym Zs" o "Ym Zs" o "Zs". */
function formatUptime(ms: number): string {
  const totalSec = Math.floor(ms / 1000)
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  if (h > 0) return `${h}h ${m}m ${s}s`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

/**
 * Factory dinámica para el comando `top`.
 * Se llama en el momento de ejecutar, no al importar,
 * para que los valores sean siempre frescos.
 */
export function createTopLines(): TerminalLine[] {
  const uptime     = formatUptime(Date.now() - SESSION_START)
  const goroutines = Math.floor(Math.random() * (64 - 38 + 1)) + 38
  const loadAvg    = (Math.random() * (2.4 - 0.8) + 0.8).toFixed(2)

  return [
    { id: `top-${Date.now()}-1`, type: 'accent',  content: 'DNNNAH_RUNTIME — process monitor' },
    { id: `top-${Date.now()}-2`, type: 'output',  content: `Uptime:       ${uptime}` },
    { id: `top-${Date.now()}-3`, type: 'accent',  content: `Goroutines:   ${goroutines}` },
    { id: `top-${Date.now()}-4`, type: 'output',  content: 'Heap:         248 KB allocated' },
    { id: `top-${Date.now()}-5`, type: 'success', content: `Load avg:     ${loadAvg} // caffeine-driven` },
    { id: `top-${Date.now()}-6`, type: 'output',  content: 'Status:       ● available for hire' },
    { id: `top-${Date.now()}-7`, type: 'pink',    content: '// press Ctrl+C to... just kidding. type clear to exit.' },
  ]
}

/**
 * Mapa de comandos disponibles en el terminal.
 * Cada comando retorna un array de líneas a mostrar.
 */
export const COMMANDS: CommandMap = {

  help: [
    { id: 'h1',  type: 'accent',  content: 'Available commands:' },
    { id: 'h2',  type: 'success', content: '  whoami         — who is DNNNAH?' },
    { id: 'h3',  type: 'success', content: '  ls             — list portfolio sections' },
    { id: 'h4',  type: 'success', content: '  ls projects    — list all projects' },
    { id: 'h5',  type: 'success', content: '  cat stack      — print tech stack' },
    { id: 'h6',  type: 'success', content: '  cat about      — short bio' },
    { id: 'h7',  type: 'success', content: '  contact        — how to reach me' },
    { id: 'h8',  type: 'success', content: '  cv             — download CV' },
    { id: 'h9',  type: 'success', content: '  pwd            — current location' },
    { id: 'h10', type: 'success', content: '  top            — process monitor' },
    { id: 'h11', type: 'success', content: '  clear          — clear terminal' },
    { id: 'h12', type: 'success', content: '  easter         — hint list' },
    { id: 'h13', type: 'pink',    content: '// try ls -la for something interesting...' },
  ],

  whoami: [
    { id: 'w1', type: 'accent',  content: 'DNNNAH — Junior Go Developer' },
    { id: 'w2', type: 'output',  content: 'Location:   LATAM → Remote' },
    { id: 'w3', type: 'success', content: 'Status:     ● Available for hire' },
    { id: 'w4', type: 'accent',  content: 'Stack:      Go, Python, TypeScript' },
    { id: 'w5', type: 'output',  content: 'Focus:      Distributed Systems, AI Automation' },
    { id: 'w6', type: 'output',  content: 'Philosophy: "Solve complex problems with clean, scalable code."' },
  ],

  pwd: [
    { id: 'pwd1', type: 'accent', content: '/dev/portfolio-v3/sys/terminal' },
  ],

  ls: [
    { id: 'ls1', type: 'accent', content: 'drwxr-xr-x  /boot          — hero' },
    { id: 'ls2', type: 'accent', content: 'drwxr-xr-x  kernel/profile — about' },
    { id: 'ls3', type: 'accent', content: 'drwxr-xr-x  bin/projects   — projects' },
    { id: 'ls4', type: 'accent', content: 'drwxr-xr-x  sys/terminal   — you are here' },
    { id: 'ls5', type: 'accent', content: 'drwxr-xr-x  std/output     — contact' },
  ],

  'ls projects': [
    { id: 'lp1', type: 'success', content: '● LIVE     EXEC_PROJ_001: PWA_CATALOG' },
    { id: 'lp2', type: 'error',   content: '● OFFLINE  EXEC_PROJ_002: AI_AGENT_RUNTIME' },
    { id: 'lp3', type: 'success', content: '● LIVE     EXEC_PROJ_003: DISTRIBUTED_MQ' },
    { id: 'lp4', type: 'warning', content: '● BUILDING EXEC_PROJ_004: CLI_DEVTOOLS' },
    { id: 'lp5', type: 'output',  content: '// type: open project [pwa|ai|mq|cli]' },
  ],

  'open project pwa': [
    { id: 'op1', type: 'accent',  content: 'Navigating to PWA_CATALOG...' },
    { id: 'op2', type: 'success', content: '→ /projects/pwa-catalog' },
  ],

  'open project ai': [
    { id: 'oa1', type: 'accent',  content: 'Navigating to AI_AGENT_RUNTIME...' },
    { id: 'oa2', type: 'success', content: '→ /projects/ai-agent-runtime' },
  ],

  'open project mq': [
    { id: 'om1', type: 'accent',  content: 'Navigating to DISTRIBUTED_MQ...' },
    { id: 'om2', type: 'success', content: '→ /projects/distributed-mq' },
  ],

  'open project cli': [
    { id: 'oc1', type: 'accent',  content: 'Navigating to CLI_DEVTOOLS...' },
    { id: 'oc2', type: 'success', content: '→ /projects/cli-devtools' },
  ],

  'cat stack': [
    { id: 'cs1', type: 'accent',  content: '// tech stack' },
    { id: 'cs2', type: 'success', content: 'core:     Go 1.22, Python 3.12, TypeScript 5' },
    { id: 'cs3', type: 'output',  content: 'db:       PostgreSQL, Redis, Supabase' },
    { id: 'cs4', type: 'output',  content: 'infra:    Docker, RabbitMQ, Linux' },
    { id: 'cs5', type: 'output',  content: 'ai:       LangChain, Vercel AI SDK' },
    { id: 'cs6', type: 'output',  content: 'frontend: React, Next.js, Tailwind' },
  ],

  'cat about': [
    { id: 'ca1', type: 'output', content: '// /dev/core-competencies' },
    { id: 'ca2', type: 'output', content: 'Deep diving into system internals,' },
    { id: 'ca3', type: 'output', content: 'architecting resilient infrastructures,' },
    { id: 'ca4', type: 'output', content: 'and pioneering AI-driven workflows.' },
    { id: 'ca5', type: 'accent', content: '// Always optimizing.' },
  ],

  contact: [
    { id: 'ct1', type: 'accent',  content: '// contact payload' },
    { id: 'ct2', type: 'success', content: 'email:    hello@dnnnah.dev' },
    { id: 'ct3', type: 'accent',  content: 'linkedin: linkedin.com/in/dnnnah' },
    { id: 'ct4', type: 'accent',  content: 'github:   github.com/dnnnah' },
    { id: 'ct5', type: 'output',  content: '// or scroll to std/output for the form' },
  ],

  cv: [
    { id: 'cv1', type: 'accent',  content: 'Opening dnnnah_cv.pdf...' },
    { id: 'cv2', type: 'success', content: '→ /public/dnnnah_cv.pdf' },
  ],

  easter: [
    { id: 'e1', type: 'pink', content: '// easter egg hints' },
    { id: 'e2', type: 'pink', content: '1. try: ls -la' },
    { id: 'e3', type: 'pink', content: '2. try: git log --oneline' },
    { id: 'e4', type: 'pink', content: '3. try: sudo make me a sandwich' },
    { id: 'e5', type: 'pink', content: '4. try: ping google.com' },
    { id: 'e6', type: 'pink', content: '5. press: ↑↑↓↓←→←→BA anywhere on la página' },
    { id: 'e7', type: 'pink', content: '6. scroll really fast to trigger panic()' },
  ],

  hint: [
    { id: 'hi1', type: 'pink', content: '// try ls -la for secrets...' },
  ],

  konami: [
    { id: 'k1', type: 'pink', content: '↑↑↓↓←→←→BA // you know what to do' },
  ],

  panic: [
    { id: 'pa1', type: 'warning', content: 'scroll really fast to trigger runtime panic()' },
    { id: 'pa2', type: 'error',   content: '// goroutine overflow imminent' },
  ],
}