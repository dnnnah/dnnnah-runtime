import type { TerminalLine } from './types'

type EasterMap = Record<string, TerminalLine[]>

/**
 * Respuestas ocultas del terminal.
 * Se evalúan antes que los comandos normales.
 */
export const EASTER_EGGS: EasterMap = {

  'ls -la': [
    { id: 'la1',  type: 'accent',  content: 'total 48' },
    { id: 'la2',  type: 'output',  content: 'drwxr-xr-x  ./' },
    { id: 'la3',  type: 'output',  content: 'drwxr-xr-x  ../' },
    { id: 'la4',  type: 'success', content: '-rw-r--r--  .favorite_lang       "Go, obviously"' },
    { id: 'la5',  type: 'success', content: '-rw-r--r--  .coffee_per_day      "3 (minimum)"' },
    { id: 'la6',  type: 'success', content: '-rw-r--r--  .music_while_coding  "lo-fi hip hop"' },
    { id: 'la7',  type: 'success', content: '-rw-r--r--  .current_obsession   "distributed systems"' },
    { id: 'la8',  type: 'success', content: '-rw-r--r--  .editor              "neovim (btw)"' },
    { id: 'la9',  type: 'success', content: '-rw-r--r--  .os                  "arch linux (also btw)"' },
    { id: 'la10', type: 'error',   content: '-r--------  .secrets             [REDACTED]' },
    { id: 'la11', type: 'pink',    content: '// try: cat .secrets' },
  ],

  'cat .secrets': [
    { id: 'cs1', type: 'error',  content: 'cat: .secrets: Permission denied' },
    { id: 'cs2', type: 'output', content: '// some things stay in /dev/null' },
  ],

  'sudo make me a sandwich': [
    { id: 'sw1', type: 'success', content: 'Okay.' },
    { id: 'sw2', type: 'output',  content: '// xkcd.com/149' },
  ],

  'git log --oneline': [
    { id: 'gl1', type: 'accent', content: 'a3f9c12 fix: finally fixed that bug (for real this time)' },
    { id: 'gl2', type: 'accent', content: 'b7e2d08 feat: add coffee-driven development' },
    { id: 'gl3', type: 'accent', content: 'c1a4f91 refactor: rename everything to make more sense' },
    { id: 'gl4', type: 'accent', content: 'd9b3e44 chore: remove console.log (found 47 of them)' },
    { id: 'gl5', type: 'accent', content: 'e8c2a77 init: it works on my machine' },
  ],

  'ping google.com': [
    { id: 'pg1', type: 'output',  content: 'PING google.com (142.250.x.x): 56 data bytes' },
    { id: 'pg2', type: 'accent',  content: '64 bytes from google.com: time=0.001ms ttl=128' },
    { id: 'pg3', type: 'accent',  content: '64 bytes from google.com: time=0.001ms ttl=128' },
    { id: 'pg4', type: 'output',  content: '--- google.com ping statistics ---' },
    { id: 'pg5', type: 'success', content: '3 packets transmitted, 3 received, 0% packet loss' },
    { id: 'pg6', type: 'pink',    content: '// impressive. now ping me at hello@dnnnah.dev' },
  ],

  'rm -rf /': [
    { id: 'rm1', type: 'error', content: 'Permission denied: nice try though.' },
  ],

  'sudo rm -rf /': [
    { id: 'sr1', type: 'error', content: 'Permission denied: REALLY nice try.' },
  ],

  ':wq': [
    { id: 'vq1', type: 'success', content: 'vim user detected. respect.' },
  ],

  ':q!': [
    { id: 'vq2', type: 'success', content: 'wow you actually know how to exit vim.' },
  ],

  'vim': [
    { id: 'v1', type: 'warning', content: 'opening vim...' },
    { id: 'v2', type: 'output',  content: '// good luck getting out. type :q! to escape.' },
  ],

  'exit': [
    { id: 'ex1', type: 'output', content: 'logout' },
    { id: 'ex2', type: 'accent', content: '// closing terminal...' },
  ],
}