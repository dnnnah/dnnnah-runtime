import type { TerminalLine, VFSDir, VFSFile, VFSNode, VFSState } from './types'

// ─── Fábrica de nodos ────────────────────────────────────────────────────────

/** Crea un nodo archivo con su contenido como líneas de terminal */
function file(lines: TerminalLine[]): VFSFile {
  return { kind: 'file', content: lines }
}

/** Crea un nodo directorio con sus hijos */
function dir(children: Record<string, VFSNode>): VFSDir {
  return { kind: 'dir', children }
}

// ─── Árbol del disco virtual ──────────────────────────────────────────────────

/**
 * Root del VFS. Estructura:
 *   ~
 *   ├── .env          (hidden, visible con ls -la)
 *   ├── .gitignore    (hidden)
 *   ├── boot/
 *   │   └── README.md
 *   ├── kernel/
 *   │   └── profile.json
 *   ├── bin/
 *   │   └── projects/
 *   │       ├── pwa_catalog.md
 *   │       └── ai_runtime.md
 *   ├── sys/
 *   │   └── terminal.go
 *   └── std/
 *       └── output.md
 */
export const VFS_ROOT: VFSDir = dir({

  // ── Archivos ocultos en root ─────────────────────────────────────────────
  '.env': file([
    { id: 'env1', type: 'error',   content: '# DNNNAH_RUNTIME — environment variables' },
    { id: 'env2', type: 'warning', content: 'NODE_ENV=production' },
    { id: 'env3', type: 'warning', content: 'NEXT_PUBLIC_SITE=https://dnnnah.dev' },
    { id: 'env4', type: 'error',   content: 'SUPABASE_KEY=[REDACTED]' },
    { id: 'env5', type: 'error',   content: 'OPENAI_API_KEY=[REDACTED]' },
    { id: 'env6', type: 'error',   content: 'CLOUDINARY_SECRET=[REDACTED]' },
    { id: 'env7', type: 'pink',    content: '// shhh. you were not supposed to find this.' },
  ]),

  '.gitignore': file([
    { id: 'gi1', type: 'output', content: 'node_modules/' },
    { id: 'gi2', type: 'output', content: '.env' },
    { id: 'gi3', type: 'output', content: '.next/' },
    { id: 'gi4', type: 'output', content: '*.log' },
    { id: 'gi5', type: 'pink',   content: '// regrets not included' },
  ]),

  // ── /boot ────────────────────────────────────────────────────────────────
  boot: dir({
    'README.md': file([
      { id: 'br1', type: 'accent',  content: '# /boot — Hero Section' },
      { id: 'br2', type: 'output',  content: 'Entry point del runtime.' },
      { id: 'br3', type: 'output',  content: 'GSAP + Lenis inicializados aquí.' },
      { id: 'br4', type: 'success', content: 'Status: ● RUNNING' },
    ]),
  }),

  // ── /kernel ──────────────────────────────────────────────────────────────
  kernel: dir({
    'profile.json': file([
      { id: 'kp1', type: 'accent',  content: '{' },
      { id: 'kp2', type: 'success', content: '  "name":       "DNNNAH",' },
      { id: 'kp3', type: 'output',  content: '  "role":       "Junior Go Developer",' },
      { id: 'kp4', type: 'output',  content: '  "location":   "LATAM → Remote",' },
      { id: 'kp5', type: 'output',  content: '  "stack":      ["Go", "Python", "TypeScript"],' },
      { id: 'kp6', type: 'success', content: '  "available":  true' },
      { id: 'kp7', type: 'accent',  content: '}' },
    ]),
  }),

  // ── /bin ─────────────────────────────────────────────────────────────────
  bin: dir({
    projects: dir({
      'pwa_catalog.md': file([
        { id: 'pw1', type: 'accent',  content: '# PWA_CATALOG' },
        { id: 'pw2', type: 'success', content: 'Status:  ● LIVE' },
        { id: 'pw3', type: 'output',  content: 'Stack:   Next.js, Supabase, Workbox' },
        { id: 'pw4', type: 'output',  content: 'Metrics: 98 Lighthouse / <1s FCP' },
      ]),
      'ai_runtime.md': file([
        { id: 'ai1', type: 'accent',  content: '# AI_AGENT_RUNTIME' },
        { id: 'ai2', type: 'error',   content: 'Status:  ● OFFLINE' },
        { id: 'ai3', type: 'output',  content: 'Stack:   Go, LangChain, RabbitMQ' },
        { id: 'ai4', type: 'warning', content: '// refactoring goroutine pool...' },
      ]),
      'distributed_mq.md': file([
        { id: 'mq1', type: 'accent',  content: '# DISTRIBUTED_MQ' },
        { id: 'mq2', type: 'success', content: 'Status:  ● LIVE' },
        { id: 'mq3', type: 'output',  content: 'Stack:   Go, RabbitMQ, Redis, Docker' },
        { id: 'mq4', type: 'output',  content: 'Thruput: 50k msg/s sustained' },
      ]),
      'cli_devtools.md': file([
        { id: 'cl1', type: 'accent',  content: '# CLI_DEVTOOLS' },
        { id: 'cl2', type: 'warning', content: 'Status:  ● BUILDING' },
        { id: 'cl3', type: 'output',  content: 'Stack:   Go, Cobra, Bubble Tea' },
        { id: 'cl4', type: 'pink',    content: '// ETA unknown — coffee required' },
      ]),
    }),
  }),

  // ── /sys ─────────────────────────────────────────────────────────────────
  sys: dir({
    'terminal.go': file([
      { id: 'tg1', type: 'accent',  content: 'package terminal' },
      { id: 'tg2', type: 'output',  content: '' },
      { id: 'tg3', type: 'success', content: 'func Execute(cmd string) []Line {' },
      { id: 'tg4', type: 'output',  content: '  // intercepta VFS antes que COMMANDS' },
      { id: 'tg5', type: 'output',  content: '  return vfs.Resolve(cmd)' },
      { id: 'tg6', type: 'success', content: '}' },
      { id: 'tg7', type: 'pink',    content: '// you are here.' },
    ]),
  }),

  // ── /std ─────────────────────────────────────────────────────────────────
  std: dir({
    'output.md': file([
      { id: 'so1', type: 'accent',  content: '# std/output — Contact' },
      { id: 'so2', type: 'output',  content: 'POST /api/contact HTTP/1.1' },
      { id: 'so3', type: 'success', content: 'email: hello@dnnnah.dev' },
      { id: 'so4', type: 'output',  content: '// scroll to the form or type: contact' },
    ]),
  }),
})

// ─── Operaciones puras del VFS ────────────────────────────────────────────────

/**
 * Dado el estado actual del VFS, devuelve el nodo directorio del cwd.
 * Si algún segmento del path no existe, retorna root.
 */
export function cwdNode(state: VFSState): VFSDir {
  let node: VFSDir = state.root
  for (const segment of state.cwd) {
    const child = node.children[segment]
    if (!child || child.kind !== 'dir') return state.root
    node = child
  }
  return node
}

/**
 * Construye el string del prompt a partir del cwd.
 * [] → '~'   ['bin'] → '~/bin'   ['bin','projects'] → '~/bin/projects'
 */
export function cwdPrompt(cwd: string[]): string {
  return cwd.length === 0 ? '~' : `~/${cwd.join('/')}`
}

/**
 * Ejecuta `ls` en el directorio actual.
 * Muestra directorios con '/' suffix y archivos normales.
 * Con -la también muestra archivos ocultos (prefijo '.').
 */
export function vfsLs(state: VFSState, showHidden: boolean): TerminalLine[] {
  const node = cwdNode(state)
  const entries = Object.entries(node.children)

  // Sin -la filtramos archivos ocultos
  const visible = showHidden
    ? entries
    : entries.filter(([name]) => !name.startsWith('.'))

  if (visible.length === 0) {
    return [{ id: 'ls_empty', type: 'output', content: '(empty directory)' }]
  }

  return visible.map(([name, child], i) => ({
    id:      `ls_${i}`,
    type:    child.kind === 'dir' ? 'accent' : 'output',
    content: child.kind === 'dir'
      ? `drwxr-xr-x  ${name}/`
      : `-rw-r--r--  ${name}`,
  } as TerminalLine))
}

/**
 * Ejecuta `cat <filename>` en el directorio actual.
 * Retorna el contenido del archivo o un error tipado.
 */
export function vfsCat(state: VFSState, filename: string): TerminalLine[] {
  const node = cwdNode(state)
  const target = node.children[filename]

  if (!target) {
    return [{
      id:      'cat_err',
      type:    'error',
      content: `cat: ${filename}: No such file or directory`,
    }]
  }
  if (target.kind === 'dir') {
    return [{
      id:      'cat_dir_err',
      type:    'error',
      content: `cat: ${filename}: Is a directory`,
    }]
  }

  return target.content
}

/**
 * Resuelve `cd <target>` y retorna el nuevo cwd o null si hay error.
 * Maneja: '..' (subir), '.' (quedarse), y nombres de subdirectorio.
 */
export function vfsCd(
  state: VFSState,
  target: string
): { cwd: string[] } | { error: string } {
  // cd sin argumento o cd ~ → root
  if (!target || target === '~') return { cwd: [] }

  // cd .. → subir un nivel
  if (target === '..') {
    return { cwd: state.cwd.slice(0, -1) }
  }

  // cd . → no moverse
  if (target === '.') return { cwd: state.cwd }

  // Navegar a subdirectorio
  const node = cwdNode(state)
  const child = node.children[target]

  if (!child) {
    return { error: `cd: ${target}: No such file or directory` }
  }
  if (child.kind !== 'dir') {
    return { error: `cd: ${target}: Not a directory` }
  }

  return { cwd: [...state.cwd, target] }
}

/**
 * Tab completion: dada una entrada parcial y el cwd actual,
 * retorna el primer nombre de hijo que coincide con el prefijo.
 * Retorna la entrada original si no hay coincidencia.
 */
export function vfsTabComplete(
  state: VFSState,
  partial: string,
  showHidden: boolean = false
): string {
  const node = cwdNode(state)
  const entries = Object.keys(node.children).filter(name =>
    showHidden ? true : !name.startsWith('.')
  )

  const match = entries.find(
    name => name.startsWith(partial) && name !== partial
  )

  return match ?? partial
}