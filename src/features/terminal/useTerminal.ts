'use client'

import { useState, useCallback, useEffect } from 'react'
import { COMMANDS }    from './commands'
import { EASTER_EGGS } from './easterEggs'
import {
  VFS_ROOT,
  cwdPrompt,
  vfsLs,
  vfsCat,
  vfsCd,
  vfsTabComplete,
} from './vfs'
import type { TerminalLine, TerminalState, VFSState } from './types'

// ─── Mensajes de bienvenida ───────────────────────────────────────────────────

const WELCOME_LINES: TerminalLine[] = [
  { id: 'w1', type: 'accent',  content: 'DNNNAH_RUNTIME terminal v1.0.0' },
  { id: 'w2', type: 'output',  content: 'Type help to see available commands.' },
  { id: 'w3', type: 'pink',    content: '// hint: try ls -la for something interesting...' },
]

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
    lines:      WELCOME_LINES,
    input:      '',
    history:    [],
    historyIdx: -1,
    isOpen:     false,
  })

  // Estado del VFS: separado del TerminalState para mantener SOLID
  const [vfsState, setVfsState] = useState<VFSState>({
    cwd:  [],          // empieza en root (~)
    root: VFS_ROOT,
  })

  // ── Atajos de teclado para abrir/cerrar ────────────────────────────────
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

    // Evento personalizado para el botón del NavBar
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

  // Bloquea scroll del body cuando el terminal está abierto
  useEffect(() => {
    document.body.style.overflow = state.isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [state.isOpen])

  // ── Ejecución de comandos ──────────────────────────────────────────────
  const execute = useCallback((cmd: string, currentVfsState: VFSState) => {
    const trimmed = cmd.trim()
    if (trimmed === '') return

    // Guardamos el lower para los lookups, pero el original para mensajes
    const lower = trimmed.toLowerCase()

    // Línea de prompt (lo que el usuario escribió)
    const promptLine: TerminalLine = {
      id:      Date.now() + 'p',
      type:    'prompt',
      content: trimmed,
    }

    // ── 1. Comando especial: clear ───────────────────────────────────────
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

    let outputLines: TerminalLine[] = []
    let nextVfsState: VFSState = currentVfsState

    // ── 2. Interceptar comandos VFS ──────────────────────────────────────

    // cd <target> — cambiar directorio
    if (lower === 'cd' || lower.startsWith('cd ')) {
      const target = trimmed.slice(3).trim() // preserva case para directorios
      const result = vfsCd(currentVfsState, target || '~')

      if ('error' in result) {
        outputLines = [{ id: Date.now() + 'cde', type: 'error', content: result.error }]
      } else {
        nextVfsState = { ...currentVfsState, cwd: result.cwd }
        // cd no produce output (comportamiento UNIX estándar)
        outputLines = []
      }
    }

    // ls -la — listar con archivos ocultos
    else if (lower === 'ls -la' || lower === 'ls -al') {
      // -la en root mantiene los easter eggs existentes desde EASTER_EGGS
      if (currentVfsState.cwd.length === 0) {
        // En root delegamos al easter egg original para mantener el contenido
        outputLines = EASTER_EGGS['ls -la'] ?? []
      } else {
        outputLines = vfsLs(currentVfsState, true)
      }
    }

    // ls — listar directorio actual (sin ocultos)
    else if (lower === 'ls') {
      // En root delegamos a COMMANDS['ls'] para mantener el output original
      if (currentVfsState.cwd.length === 0) {
        outputLines = COMMANDS['ls'] ?? []
      } else {
        outputLines = vfsLs(currentVfsState, false)
      }
    }

    // cat <filename> — mostrar contenido de archivo
    else if (lower.startsWith('cat ')) {
      const filename = trimmed.slice(4).trim()

      // Si estamos en root y el cat tiene un handler en COMMANDS o EASTER_EGGS,
      // lo dejamos pasar al lookup normal (cat stack, cat about, cat .secrets).
      const hasBuiltin =
        EASTER_EGGS[lower] !== undefined || COMMANDS[lower] !== undefined

      if (currentVfsState.cwd.length === 0 && hasBuiltin) {
        // Deja que caiga al lookup de EASTER_EGGS / COMMANDS abajo
        outputLines = EASTER_EGGS[lower] ?? COMMANDS[lower] ?? []
      } else {
        outputLines = vfsCat(currentVfsState, filename)
      }
    }

    // ── 3. Easter eggs (tienen prioridad sobre COMMANDS) ─────────────────
    else if (EASTER_EGGS[lower]) {
      outputLines = EASTER_EGGS[lower]
      if (lower === 'exit') {
        setTimeout(() => setState(s => ({ ...s, isOpen: false })), 800)
      }
    }

    // ── 4. Comandos normales ─────────────────────────────────────────────
    else if (COMMANDS[lower]) {
      outputLines = COMMANDS[lower]

      // Navegación a proyectos (comportamiento original)
      const routes: Record<string, string> = {
        'open project pwa': '/projects/pwa-catalog',
        'open project ai':  '/projects/ai-agent-runtime',
        'open project mq':  '/projects/distributed-mq',
        'open project cli': '/projects/cli-devtools',
      }
      const route = routes[lower]
      if (route) {
        setTimeout(() => { window.location.href = route }, 800)
      }
    }

    // ── 5. Comando no encontrado ─────────────────────────────────────────
    else {
      outputLines = [{
        id:      Date.now() + 'e',
        type:    'error',
        content: `command not found: ${trimmed}. Type help for available commands.`,
      }]
    }

    // Actualizar VFS si cambió (ej: después de cd)
    if (nextVfsState !== currentVfsState) {
      setVfsState(nextVfsState)
    }

    // Actualizar estado del terminal
    setState(s => ({
      ...s,
      lines:      [...s.lines, promptLine, ...outputLines],
      input:      '',
      history:    [lower, ...s.history],
      historyIdx: -1,
    }))
  }, []) // sin dependencias: usamos el argumento currentVfsState para evitar stale closures

  // ── Navegación del historial ───────────────────────────────────────────
  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    setState(s => {
      const max = s.history.length - 1
      const idx = direction === 'up'
        ? Math.min(s.historyIdx + 1, max)
        : Math.max(s.historyIdx - 1, -1)
      return {
        ...s,
        historyIdx: idx,
        input:      idx === -1 ? '' : s.history[idx],
      }
    })
  }, [])

  /**
   * Tab completion para TerminalInput.
   * Recibe el texto parcial, busca en el VFS actual y en AUTOCOMPLETE.
   * Retorna el texto completado (o el mismo si no hay match).
   */
  const tabComplete = useCallback((partial: string): string => {
    if (!partial) return partial

    // Si el usuario está escribiendo 'cd ' + algo → completar con directorios del VFS
    if (partial.startsWith('cd ')) {
      const fragment = partial.slice(3)
      const completed = vfsTabComplete(vfsState, fragment)
      return completed !== fragment ? `cd ${completed}` : partial
    }

    // Si el usuario está escribiendo 'cat ' + algo → completar con archivos del VFS
    if (partial.startsWith('cat ')) {
      const fragment = partial.slice(4)
      const completed = vfsTabComplete(vfsState, fragment, true)
      return completed !== fragment ? `cat ${completed}` : partial
    }

    // Fallback: completar contra los comandos builtin
    const BUILTIN = [
      'help', 'whoami', 'pwd', 'ls', 'ls projects', 'ls -la',
      'cat stack', 'cat about', 'contact', 'cv', 'clear',
      'easter', 'hint', 'konami', 'panic', 'exit',
      'open project pwa', 'open project ai',
      'open project mq', 'open project cli',
      'cd boot', 'cd kernel', 'cd bin', 'cd sys', 'cd std', 'cd ..',
    ]
    const match = BUILTIN.find(c => c.startsWith(partial) && c !== partial)
    return match ?? partial
  }, [vfsState])

  /**
   * Prompt string reactivo. Se actualiza cuando cambia el cwd.
   * Ejemplo: '~'  →  '~/bin'  →  '~/bin/projects'
   */
  const prompt = cwdPrompt(vfsState.cwd)

  return {
    state,
    setState,
    vfsState,
    prompt,
    execute: (cmd: string) => execute(cmd, vfsState),
    tabComplete,
    navigateHistory,
  }
}