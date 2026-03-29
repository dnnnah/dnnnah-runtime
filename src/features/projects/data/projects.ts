import type { Project } from '../types'

export const projects: Project[] = [
  {
    id:        'pwa-catalog',
    execId:    'EXEC_PROJ_001',
    title:     'PWA_CATALOG',
    status:    'live',
    buildTime: '42ms',
    stack:     ['Go', 'Supabase', 'React', 'PostgreSQL'],
    tags:      ['go', 'supabase', 'react', 'postgresql'],
    screenshot: '/projects/pwa-catalog.png',
    demoUrl:   'https://demo.example.com',
    githubUrl: 'https://github.com/dnnnah/pwa-catalog',
    metrics: {
      buildTime:  '42ms',
      uptime:     '99.9%',
      requests:   '2M/day',
      binarySize: '8.2MB',
    },
    architecture: 'Go para el backend por su concurrencia nativa con goroutines — cada WebSocket connection corre en su propia goroutine sin overhead de threads. Supabase por RLS policies que manejan multi-tenant sin lógica extra en el backend. React + Vite para el frontend por el HMR instantáneo y el bundle size optimizado.',
    readme: `# PWA_CATALOG

> Progressive Web App para gestión de catálogos de productos en tiempo real.

## Overview

Sistema de catálogo multi-tenant construido con Go y Supabase. Soporta actualizaciones en tiempo real via WebSockets, sincronización offline con Service Workers, y autenticación con RLS policies a nivel de base de datos.

## Architecture

\`\`\`
┌─────────────────────────────────────────┐
│           React PWA (Vite)              │
│  Service Worker · IndexedDB · WebSocket │
└──────────────────┬──────────────────────┘
                   │ WSS + REST
┌──────────────────▼──────────────────────┐
│           Go API Server                 │
│  Fiber · Goroutines · Channel Pipeline  │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│              Supabase                   │
│  PostgreSQL · RLS · Realtime · Storage  │
└─────────────────────────────────────────┘
\`\`\`

## Features

- **Multi-tenant**: RLS policies en PostgreSQL — cada tenant ve solo sus datos
- **Offline First**: Service Worker + IndexedDB para sync en background
- **Realtime**: WebSocket broadcast via Go channels cuando hay cambios
- **Performance**: LCP < 1.2s, TTI < 2s, Lighthouse score 98

## Stack

| Layer | Tech | Why |
|-------|------|-----|
| Frontend | React + Vite | HMR, tree-shaking, PWA plugin |
| Backend | Go + Fiber | 0-alloc router, goroutine per connection |
| Database | PostgreSQL + Supabase | RLS, Realtime, auto-generated API |
| Cache | Redis | Session store, rate limiting |

## API Endpoints

\`\`\`go
GET    /api/v1/products          // List products (paginated)
POST   /api/v1/products          // Create product
PUT    /api/v1/products/:id      // Update product
DELETE /api/v1/products/:id      // Soft delete
WS     /ws/catalog/:tenant       // Realtime updates
\`\`\`

## Getting Started

\`\`\`bash
git clone https://github.com/dnnnah/pwa-catalog
cd pwa-catalog
cp .env.example .env
docker-compose up -d
go run ./cmd/server
\`\`\`

## Environment Variables

\`\`\`bash
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
REDIS_URL=redis://localhost:6379
PORT=8080
\`\`\`

## Performance Metrics

- **Build time**: 42ms (Go binary)
- **Binary size**: 8.2MB
- **Uptime**: 99.9% (last 90 days)
- **Requests**: 2M/day peak
- **P99 latency**: 12ms
`,
  },
  {
    id:        'ai-agent-runtime',
    execId:    'EXEC_PROJ_002',
    title:     'AI_AGENT_RUNTIME',
    status:    'offline',
    buildTime: '120ms',
    stack:     ['Python', 'LangChain', 'PostgreSQL', 'Redis'],
    tags:      ['python', 'langchain', 'postgresql', 'redis'],
    screenshot: '/projects/ai-agent.png',
    githubUrl: 'https://github.com/dnnnah/ai-agent-runtime',
    metrics: {
      buildTime:  '120ms',
      uptime:     '94.2%',
      requests:   '50K/day',
      binarySize: '—',
    },
    architecture: 'Python por el ecosistema de ML/AI — LangChain para abstracción de providers sin vendor lock-in. PostgreSQL con pgvector para embeddings y búsqueda semántica. Redis como message broker entre agentes para evitar acoplamiento directo.',
    readme: `# AI_AGENT_RUNTIME

> Capa de orquestación para agentes de IA con memoria persistente y tool calling.

## Overview

Runtime para agentes de IA que coordina múltiples LLM providers, gestiona memoria a largo plazo con embeddings, y expone una API unificada para integrar agentes en cualquier aplicación.

## Architecture

\`\`\`
┌─────────────────────────────────────────────┐
│              Agent Orchestrator             │
│         LangChain · Tool Registry          │
└────────┬──────────────┬──────────────┬──────┘
         │              │              │
    ┌────▼───┐    ┌──────▼──┐   ┌──────▼──┐
    │  LLM   │    │ Memory  │   │  Tools  │
    │OpenAI  │    │pgvector │   │ Registry│
    │Anthropic│   │Redis    │   │ Plugins │
    └────────┘    └─────────┘   └─────────┘
\`\`\`

## Agent Types

\`\`\`python
class ResearchAgent(BaseAgent):
    """Busca, sintetiza y cita fuentes."""
    tools = [WebSearch, PDFReader, CitationFormatter]

class CodeAgent(BaseAgent):
    """Genera, revisa y ejecuta código en sandbox."""
    tools = [CodeInterpreter, GitOps, DocGenerator]

class DataAgent(BaseAgent):
    """Analiza datasets y genera visualizaciones."""
    tools = [PandasExecutor, ChartGenerator, SQLRunner]
\`\`\`

## Memory System

\`\`\`python
# Memoria de corto plazo — Redis
short_term = RedisMemory(ttl=3600)

# Memoria de largo plazo — pgvector
long_term = PGVectorMemory(
    embedding_model="text-embedding-3-small",
    similarity_threshold=0.85
)

# Memoria episódica — PostgreSQL
episodic = EpisodicMemory(
    table="agent_episodes",
    max_episodes=1000
)
\`\`\`

## Tool Registry

\`\`\`python
@tool(name="web_search", description="Search the web")
def web_search(query: str, max_results: int = 5) -> list[SearchResult]:
    ...

@tool(name="code_exec", description="Execute Python code safely")
def code_exec(code: str, timeout: int = 30) -> ExecutionResult:
    ...
\`\`\`

## Getting Started

\`\`\`bash
git clone https://github.com/dnnnah/ai-agent-runtime
cd ai-agent-runtime
pip install -r requirements.txt
cp .env.example .env
python -m uvicorn main:app --reload
\`\`\`

## Status

> ⚠️ **OFFLINE** — En refactorización. Migrando de LangChain v0.1 a v0.3. ETA: Q2 2025.
`,
  },
  {
    id:        'distributed-mq',
    execId:    'EXEC_PROJ_003',
    title:     'DISTRIBUTED_MQ',
    status:    'live',
    buildTime: '15ms',
    stack:     ['Go', 'RabbitMQ', 'Redis', 'Docker'],
    tags:      ['go', 'rabbitmq', 'redis', 'docker'],
    screenshot: '/projects/distributed-mq.png',
    demoUrl:   'https://mq-demo.example.com',
    githubUrl: 'https://github.com/dnnnah/distributed-mq',
    metrics: {
      buildTime:  '15ms',
      uptime:     '99.99%',
      requests:   '500K/day',
      binarySize: '6.1MB',
    },
    architecture: 'Go por su modelo de concurrencia — goroutines como workers con channels para back-pressure. RabbitMQ con dead-letter queues para garantías de entrega at-least-once. Redis para deduplicación de mensajes con TTL automático.',
    readme: `# DISTRIBUTED_MQ

> Sistema de mensajería distribuida con garantías de entrega y dead-letter queues.

## Overview

Message queue system construido sobre RabbitMQ con workers en Go. Soporta routing por topics, dead-letter queues para mensajes fallidos, retry con exponential backoff, y métricas en tiempo real.

## Architecture

\`\`\`
Publishers          RabbitMQ              Consumers
    │                  │                      │
    ├─ order.created ──► Exchange             │
    ├─ user.updated ──► (topic)    ──────────►├─ OrderWorker
    └─ email.send ────►            ──────────►├─ UserWorker
                       │                      └─ EmailWorker
                  Dead Letter Q
                       │
                  Retry Handler
                  (exp backoff)
\`\`\`

## Message Flow

\`\`\`go
// Publisher
publisher.Publish(ctx, Message{
    Topic:   "order.created",
    Payload: order,
    Options: PublishOptions{
        Persistent:  true,
        Priority:    5,
        Expiration:  "3600000", // 1hr TTL
    },
})

// Consumer con retry automático
consumer.Subscribe("order.created", func(msg Message) error {
    if err := processOrder(msg); err != nil {
        return msg.Retry(maxAttempts: 3, backoff: exponential)
    }
    return msg.Ack()
})
\`\`\`

## Dead Letter Queue

\`\`\`go
// Mensajes que fallan 3 veces van a DLQ
dlq := DeadLetterQueue{
    Exchange: "dlx.orders",
    Queue:    "dlq.orders.failed",
    Handler:  notifyOpsTeam,
}
\`\`\`

## Metrics

- **Throughput**: 500K mensajes/día
- **P99 latency**: 3ms (publish → consume)
- **DLQ rate**: < 0.01%
- **Uptime**: 99.99% (last 180 days)

## Deployment

\`\`\`bash
docker-compose up -d rabbitmq redis
go build -o ./bin/mq-server ./cmd/server
./bin/mq-server --workers=10 --queue=orders
\`\`\`
`,
  },
  {
    id:        'cli-devtools',
    execId:    'EXEC_PROJ_004',
    title:     'CLI_DEVTOOLS',
    status:    'building',
    buildTime: '8ms',
    stack:     ['Go', 'Cobra', 'Linux'],
    tags:      ['go', 'cobra', 'linux'],
    screenshot: '/projects/cli-devtools.png',
    githubUrl: 'https://github.com/dnnnah/cli-devtools',
    metrics: {
      buildTime:  '8ms',
      uptime:     '—',
      binarySize: '4.1MB',
    },
    architecture: 'Go + Cobra por ser el standard de facto para CLIs — autocompletion, help generation y subcommands gratis. Compilación a binario único sin dependencias. Cross-compilation para Linux/macOS/Windows con un solo Makefile.',
    readme: `# CLI_DEVTOOLS

> Toolchain de desarrollo para automatizar tareas repetitivas del día a día.

## Overview

Suite de herramientas CLI construida con Go + Cobra. Un solo binario que reemplaza docenas de scripts bash. Diseñado para desarrolladores que viven en la terminal.

## Commands

\`\`\`bash
devtools env        # Gestión de .env files con encryption
devtools git        # Git workflows automatizados
devtools docker     # Docker helpers y cleanup
devtools db         # Database migrations y snapshots
devtools deploy     # Deploy pipelines simplificados
\`\`\`

## Examples

\`\`\`bash
# Encrypt .env para compartir de forma segura
devtools env encrypt .env --output .env.encrypted --key $MASTER_KEY

# Git: feature branch + conventional commit en un comando
devtools git feature "add user authentication"
# → crea feat/add-user-authentication
# → abre editor para commit message con template

# Docker: cleanup de imágenes y volúmenes huérfanos
devtools docker clean --older-than 7d --dry-run

# DB: snapshot de producción para desarrollo local
devtools db snapshot --from prod --to local --anonymize
\`\`\`

## Installation

\`\`\`bash
# macOS
brew install dnnnah/tap/devtools

# Linux
curl -sSL https://get.devtools.sh | sh

# Go
go install github.com/dnnnah/cli-devtools@latest
\`\`\`

## Build from source

\`\`\`bash
git clone https://github.com/dnnnah/cli-devtools
cd cli-devtools
make build
# → ./bin/devtools (8ms build time, 4.1MB binary)
\`\`\`

## Status

> 🔨 **BUILDING** — v0.3.0 en desarrollo. Agregando \`devtools ai\` para generación de código desde terminal con contexto del proyecto.

### Roadmap v0.3.0
- [ ] \`devtools ai generate\` — genera código con contexto del repo
- [ ] \`devtools ai review\` — code review automático antes del PR
- [ ] Plugin system para comandos custom
`,
  },
]