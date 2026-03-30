'use client'

import { useState, useCallback, useEffect } from 'react'
import { COMMANDS }    from './commands'
import { EASTER_EGGS } from './easterEggs'
import type { TerminalLine, TerminalState } from './types'

/**
 * Hook principal del terminal.
 * Maneja: estado, ejecución de comandos, historial, Cmd+K.
 */

const WELCOME_LINES: TerminalLine[] = [
  { id: 'w1', type: 'accent',  content: 'DNNNAH_RUNTIME terminal v1.0.0' },
  { id: 'w2', type: 'output',  content: 'Type help to see available commands.' },
  { id: 'w3', type: 'pink',    content: '// hint: try ls -la for something interesting...' },
]

export function useTerminal() {
  const [state, setState] = useState<TerminalState>({
    lines:      WELCOME_LINES,
    input:      '',
    history:    [],
    historyIdx: -1,
    isOpen:     false,
  })

  useEffect(() => {
    // Cmd+K / Ctrl+K
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

  const execute = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()

    if (trimmed === '') return

    const newLines: TerminalLine[] = [
      { id: Date.now() + 'p', type: 'prompt', content: trimmed },
    ]

    if (trimmed === 'clear') {
      setState(s => ({
        ...s,
        lines:      [],
        input:      '',
        history:    [trimmed, ...s.history],
        historyIdx: -1,
      }))
      return
    } else if (EASTER_EGGS[trimmed]) {
      newLines.push(...EASTER_EGGS[trimmed])
      if (trimmed === 'exit') {
        setTimeout(() => setState(s => ({ ...s, isOpen: false })), 800)
      }
    } else if (COMMANDS[trimmed]) {
      newLines.push(...COMMANDS[trimmed])

      // Navegación a proyecto
      const routes: Record<string, string> = {
        'open project pwa': '/projects/pwa-catalog',
        'open project ai':  '/projects/ai-agent-runtime',
        'open project mq':  '/projects/distributed-mq',
        'open project cli': '/projects/cli-devtools',
      }
      const route = routes[trimmed]
      if (route) {
        setTimeout(() => { window.location.href = route }, 800)
      }
    } else {
      newLines.push({
        id:      Date.now() + 'e',
        type:    'error',
        content: `command not found: ${trimmed}. Type help for available commands.`,
      })
    }

    setState(s => ({
      ...s,
      lines:      [...s.lines, ...newLines],
      input:      '',
      history:    [trimmed, ...s.history],
      historyIdx: -1,
    }))
  }, [])

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

  return { state, setState, execute, navigateHistory }
}