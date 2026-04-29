'use client'

import { useState, useCallback, useEffect } from 'react'
import { COMMANDS, createTopLines } from './commands'
import { EASTER_EGGS }              from './easterEggs'
import {
  VFS_ROOT,
  cwdPrompt,
  vfsLs,
  vfsCat,
  vfsCd,
  vfsTabComplete,
} from './vfs'
import type { TerminalLine, TerminalState, VFSState } from './types'

// ─── Secuencia SSH intro ──────────────────────────────────────────────────────

/**
 * Genera las líneas de bienvenida SSH con la fecha real del sistema.
 * Se llama una sola vez, en la primera apertura.
 */
function buildSshLines(): TerminalLine[] {
  const now      = new Date()
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months   = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  // Formato: "Mon Jan  2 15:04:05 2006" (Go-style, doble espacio si día < 10)
  const day  = now.getDate()
  const time = now.toTimeString().slice(0, 8)
  const dateStr = `${weekdays[now.getDay()]} ${months[now.getMonth()]} ${day < 10 ? ' ' + day : day} ${time} ${now.getFullYear()}`

  return [
    { id: 'ssh1', type: 'output',  content: 'Connecting to dnnnah.io via SSH...' },
    { id: 'ssh2', type: 'accent',  content: 'Connected. Authenticating...' },
    { id: 'ssh3', type: 'success', content: `Welcome, recruiter. Last login: ${dateStr}` },
    { id: 'ssh4', type: 'pink',    content: '// Type help to see available commands.' },
  ]
}

// ─── Hook principal ───────────────────────────────────────────────────────────

/**
 * Hook principal del terminal.
 * Maneja: estado, ejecución de comandos, historial, Cmd+K, VFS.
 *
 * Flujo de ejecución (execute):
 *   1. Intercepta comandos VFS (cd, ls, cat)
 *   2. Luego busca en EASTER_EGGS
 *   3. Finalmente busca en COMMANDS
 *   4. Si no hay match → "command not found"
 */
export function useTerminal() {
  const [state, setState] = useState<TerminalState>({
    lines:        [],
    input:        '',
    history:      [],
    historyIdx:   -1,
    isOpen:       false,
    hasConnected: false,   // flag de primera conexión
    isGlitching:  false,   // flag de efecto glitch
  })

  const [vfsState, setVfsState] = useState<VFSState>({
    cwd:  [],
    root: VFS_ROOT,
  })

  // ── SSH intro en la primera apertura ──────────────────────────────────────
  useEffect(() => {
    if (!state.isOpen) return          // solo cuando se abre
    if (state.hasConnected) return     // solo la primera vez

    const sshLines = buildSshLines()
    const DELAYS   = [0, 300, 600, 900] // ms entre cada línea

    // Marcamos hasConnected de inmediato para evitar re-ejecuciones
    setState(s => ({ ...s, hasConnected: true, lines: [] }))

    sshLines.forEach((line, i) => {
      setTimeout(() => {
        setState(s => ({ ...s, lines: [...s.lines, line] }))
      }, DELAYS[i])
    })
  }, [state.isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Atajos de teclado ─────────────────────────────────────────────────────
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setState(s => ({ ...s, isOpen: !s.isOpen }))
      }
      if (e.key === 'Escape') {
        setState(s => ({ ...s, isOpen: false }))
      }
    }

    function onOpenTerminal() {
      setState(s => ({ ...s, isOpen: !s.isOpen }))
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('open-terminal', onOpenTerminal)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-terminal', onOpenTerminal)
    }
  }, [])

  // ── Bloquear scroll del body ───────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = state.isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [state.isOpen])

  // ── Ejecución de comandos ──────────────────────────────────────────────────
  const execute = useCallback((cmd: string, currentVfsState: VFSState) => {
    const trimmed = cmd.trim()
    if (trimmed === '') return

    const lower = trimmed.toLowerCase()

    const promptLine: TerminalLine = {
      id:      Date.now() + 'p',
      type:    'prompt',
      content: trimmed,
    }

    // ── 1. clear ─────────────────────────────────────────────────────────────
    if (lower === 'clear') {
      setState(s => ({
        ...s,
        lines:      [],
        input:      '',
        history:    [lower, ...s.history],
        historyIdx: -1,
      }))
      return
    }

    // ── 2. exit — efecto glitch antes de cerrar ───────────────────────────────
    if (lower === 'exit') {
      const exitLines: TerminalLine[] = [
        { id: `ex-${Date.now()}-1`, type: 'output', content: 'logout' },
        { id: `ex-${Date.now()}-2`, type: 'error',  content: 'Connection to dnnnah.io closed.' },
        { id: `ex-${Date.now()}-3`, type: 'error',  content: '// signal: killed' },
      ]
      setState(s => ({
        ...s,
        lines:       [...s.lines, promptLine, ...exitLines],
        input:       '',
        history:     [lower, ...s.history],
        historyIdx:  -1,
        isGlitching: true,
      }))
      // Después de la animación (600ms) cierra el modal
      setTimeout(() => {
        setState(s => ({ ...s, isOpen: false, isGlitching: false }))
      }, 600)
      return
    }

    // ── 3. top — comando dinámico (factory) ───────────────────────────────────
    if (lower === 'top') {
      const topLines = createTopLines()
      setState(s => ({
        ...s,
        lines:      [...s.lines, promptLine, ...topLines],
        input:      '',
        history:    [lower, ...s.history],
        historyIdx: -1,
      }))
      return
    }

    let outputLines: TerminalLine[] = []
    let nextVfsState: VFSState = currentVfsState

    // ── 4. Comandos VFS ───────────────────────────────────────────────────────
    if (lower === 'cd' || lower.startsWith('cd ')) {
      const target = trimmed.slice(3).trim()
      const result = vfsCd(currentVfsState, target || '~')
      if ('error' in result) {
        outputLines = [{ id: Date.now() + 'cde', type: 'error', content: result.error }]
      } else {
        nextVfsState = { ...currentVfsState, cwd: result.cwd }
        outputLines  = []
      }
    }
    else if (lower === 'ls -la' || lower === 'ls -al') {
      outputLines = currentVfsState.cwd.length === 0
        ? (EASTER_EGGS['ls -la'] ?? [])
        : vfsLs(currentVfsState, true)
    }
    else if (lower === 'ls') {
      outputLines = currentVfsState.cwd.length === 0
        ? (COMMANDS['ls'] ?? [])
        : vfsLs(currentVfsState, false)
    }
    else if (lower.startsWith('cat ')) {
      const filename   = trimmed.slice(4).trim()
      const hasBuiltin = EASTER_EGGS[lower] !== undefined || COMMANDS[lower] !== undefined
      if (currentVfsState.cwd.length === 0 && hasBuiltin) {
        outputLines = EASTER_EGGS[lower] ?? COMMANDS[lower] ?? []
      } else {
        outputLines = vfsCat(currentVfsState, filename)
      }
    }

    // ── 5. Easter eggs ────────────────────────────────────────────────────────
    else if (EASTER_EGGS[lower]) {
      outputLines = EASTER_EGGS[lower]
    }

    // ── 6. Comandos normales ──────────────────────────────────────────────────
    else if (COMMANDS[lower]) {
      outputLines = COMMANDS[lower]
      const routes: Record<string, string> = {
        'open project pwa': '/projects/pwa-catalog',
        'open project ai':  '/projects/ai-agent-runtime',
        'open project mq':  '/projects/distributed-mq',
        'open project cli': '/projects/cli-devtools',
      }
      const route = routes[lower]
      if (route) setTimeout(() => { window.location.href = route }, 800)
    }

    // ── 7. Comando no encontrado ──────────────────────────────────────────────
    else {
      outputLines = [{
        id:      Date.now() + 'e',
        type:    'error',
        content: `command not found: ${trimmed}. Type help for available commands.`,
      }]
    }

    if (nextVfsState !== currentVfsState) setVfsState(nextVfsState)

    setState(s => ({
      ...s,
      lines:      [...s.lines, promptLine, ...outputLines],
      input:      '',
      history:    [lower, ...s.history],
      historyIdx: -1,
    }))
  }, [])

  // ── Navegación del historial ───────────────────────────────────────────────
  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    setState(s => {
      const max = s.history.length - 1
      const idx = direction === 'up'
        ? Math.min(s.historyIdx + 1, max)
        : Math.max(s.historyIdx - 1, -1)
      return { ...s, historyIdx: idx, input: idx === -1 ? '' : s.history[idx] }
    })
  }, [])

  const tabComplete = useCallback((partial: string): string => {
    if (!partial) return partial
    if (partial.startsWith('cd ')) {
      const fragment  = partial.slice(3)
      const completed = vfsTabComplete(vfsState, fragment)
      return completed !== fragment ? `cd ${completed}` : partial
    }
    if (partial.startsWith('cat ')) {
      const fragment  = partial.slice(4)
      const completed = vfsTabComplete(vfsState, fragment, true)
      return completed !== fragment ? `cat ${completed}` : partial
    }
    const BUILTIN = [
      'help', 'whoami', 'pwd', 'ls', 'ls projects', 'ls -la',
      'cat stack', 'cat about', 'contact', 'cv', 'clear', 'top',
      'easter', 'hint', 'konami', 'panic', 'exit',
      'open project pwa', 'open project ai',
      'open project mq', 'open project cli',
      'cd boot', 'cd kernel', 'cd bin', 'cd sys', 'cd std', 'cd ..',
    ]
    const match = BUILTIN.find(c => c.startsWith(partial) && c !== partial)
    return match ?? partial
  }, [vfsState])

  const prompt = cwdPrompt(vfsState.cwd)

  return {
    state,
    setState,
    vfsState,
    prompt,
    execute:         (cmd: string) => execute(cmd, vfsState),
    tabComplete,
    navigateHistory,
  }
}