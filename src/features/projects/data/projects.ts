import type { Project } from '../types'

export const projects: Project[] = [
  {
    id:        'pwa-catalog',
    execId:    'EXEC_PROJ_001',
    title:     'PWA_CATALOG',
    status:    'live',
    buildTime: '42ms',
    type:      'Web App · PWA',
    duration:  '3 months',
    role:      'Solo developer',
    tags:      ['go', 'react', 'supabase', 'postgresql', 'redis', 'docker'],
    stack:     ['Go', 'React', 'Supabase', 'PostgreSQL', 'Redis', 'Docker'],
    stackItems: [
      {
        name:     'Go + Fiber',
        category: 'core',
        reason:   'Concurrencia nativa con goroutines — cada WebSocket connection corre en su propia goroutine con ~4KB de stack inicial vs ~1MB de un thread del OS. Con 500 clientes conectados, la diferencia es ~2GB vs ~8MB. Fiber por su API de contexto ergonómica para el middleware chain.',
      },
      {
        name:     'Supabase + RLS',
        category: 'db',
        reason:   'Row Level Security a nivel de base de datos elimina toda una categoría de bugs de seguridad. El aislamiento entre tenants es imposible de saltarse accidentalmente desde el código. También provee Realtime y Storage sin implementarlos.',
      },
      {
        name:     'React PWA + Vite',
        category: 'frontend',
        reason:   'PWA era requisito no negociable por el contexto offline. Vite sobre CRA por el HMR instantáneo y bundle splitting automático — chunk inicial en 42KB gzipped. Service Worker con Workbox para precaching.',
      },
      {
        name:     'Redis',
        category: 'infra',
        reason:   'Session store con TTL automático sin mantener tabla de sesiones en Postgres. Rate limiting por tenant con sliding window — permite bursts cortos sin bloquear operaciones legítimas.',
      },
    ],
    screenshot:  '/projects/pwa-catalog.png',
    screenshots: [],
    demoUrl:     'https://demo.example.com',
    githubUrl:   'https://github.com/dnnnah/pwa-catalog',
    context:     'Necesitaba gestionar catálogos de productos para múltiples clientes desde una sola plataforma. Las herramientas existentes no soportaban multi-tenant nativamente ni funcionaban offline — bloqueante crítico para equipos de ventas en campo con conectividad inestable.',
    problem:     'Los catálogos en Excel generaban inconsistencias entre vendedores: versiones desactualizadas, pérdida de datos al sincronizar manualmente, y cero visibilidad en tiempo real para el administrador. El cliente necesitaba ver qué productos se consultaban y cuándo, sin depender de reportes manuales.',
    architectureDiagram: `┌─────────────────────────────────────────────┐
│            React PWA (Vite)                 │
│   Service Worker · IndexedDB · WebSocket    │
└──────────────────┬──────────────────────────┘
                   │ WSS + REST (JWT)
┌──────────────────▼──────────────────────────┐
│           Go API Server (Fiber)             │
│   Goroutines · Channel Pipeline · JWT       │
│   handlers/ → services/ → repositories/    │
└──────────────────┬──────────────────────────┘
                   │
        ┌──────────┴──────────┐
┌───────▼──────┐    ┌─────────▼────────┐
│   Supabase   │    │      Redis       │
│  PostgreSQL  │    │  Session Store   │
│  RLS · RT    │    │  Rate Limiting   │
└──────────────┘    └──────────────────┘`,
    architecture: 'Arquitectura en capas con separación estricta de responsabilidades. El API server nunca accede directamente a la base de datos — todo pasa por la capa de repositorios, permitiendo swappear el storage sin tocar la lógica de negocio.',
    dataFlow: [
      { step: '01', content: 'Vendedor edita producto en la PWA → acción guardada en `IndexedDB` localmente de inmediato (0ms de latencia percibida).' },
      { step: '02', content: 'Service Worker detecta conexión → envía `PATCH /api/v1/products/:id` al Go server con JWT del tenant.' },
      { step: '03', content: 'Handler valida JWT → extrae `tenant_id` del claim → pasa a service layer. El tenant_id nunca viene del body del request.' },
      { step: '04', content: 'Repository ejecuta UPDATE en PostgreSQL. RLS policy verifica `tenant_id = current_setting(\'app.tenant_id\')` — el DB rechaza si no coincide.' },
      { step: '05', content: 'Supabase Realtime detecta el cambio → broadcast a todos los clientes suscritos al canal del tenant vía WebSocket.' },
      { step: '06', content: 'Cada PWA conectada recibe el evento → actualiza `IndexedDB` local → re-renderiza sin reload. Clientes offline reciben el diff al reconectar.' },
    ],
    codePatterns: [
      { name: 'Repository Pattern',  desc: 'Abstrae el storage detrás de interfaces Go. El service layer no sabe si habla con Postgres, Redis o un mock. Permite cambiar Supabase sin tocar la lógica de negocio.' },
      { name: 'Channel Pipeline',    desc: 'El broadcast de WebSocket usa fan-out con channels: un goroutine recibe el evento y lo distribuye a N goroutines de clientes. Backpressure con buffered channels de 100 mensajes.' },
      { name: 'Optimistic Updates',  desc: 'La UI actualiza localmente antes de confirmar con el servidor. Si falla, rollback al estado anterior. Elimina latencia percibida en conexiones lentas.' },
      { name: 'Conflict Resolution', desc: 'Vector clocks por registro para detectar conflictos de sync offline. Last-write-wins para campos simples, merge manual para arrays.' },
    ],
    challenges: [
      {
        title:    'Sincronización offline con conflictos concurrentes',
        problem:  'Dos vendedores editando el mismo producto offline simultáneamente. Al reconectar, ambos hacen push de cambios incompatibles. Last-write-wins fallaba silenciosamente en campos de array.',
        solution: 'Implementé versioning por campo con timestamps del servidor. Cada campo tiene su propio vector clock. Los arrays usan merge en lugar de overwrite, con reglas de resolución configurables por tipo de campo.',
      },
      {
        title:    'Debuggear RLS policies en producción',
        problem:  'Las policies de Postgres son difíciles de inspeccionar cuando fallan. Un bug dejó ciertos tenants viendo productos de otros durante 2 horas — sin errores visibles en los logs del API.',
        solution: 'Creé un test suite que corre queries directamente contra Postgres simulando diferentes roles. Ahora cada deploy corre 47 tests de aislamiento de tenants antes de pasar a producción.',
      },
      {
        title:    'Memory leak en goroutines de WebSocket',
        problem:  'Después de 72h de uptime, el servidor consumía 400MB más de lo esperado. Las goroutines de conexiones cerradas no terminaban porque el canal de done no se cerraba en todos los paths de error.',
        solution: 'Implementé context propagation correcta con defer cancel(). Agregué un goroutine leak detector en staging que alerta si el count sube más de 10% en 5 minutos.',
      },
    ],
    scalability: [
      { title: 'Horizontal scaling del API',       desc: 'El servidor Go es stateless — el estado vive en Redis y Postgres. Agregar instancias es solo cambiar el replica count. WebSocket state compartido via Redis Pub/Sub entre instancias.' },
      { title: 'Database partitioning por tenant', desc: 'Los índices incluyen tenant_id como primera columna. Cuando un tenant crece demasiado, se puede mover a su propio schema sin cambiar el código.' },
      { title: 'CDN para assets de catálogo',      desc: 'Imágenes de productos pasan por Cloudinary con transformaciones lazy. El cliente pide el tamaño exacto que necesita. Reduce el bandwidth ~70% comparado con servir imágenes originales.' },
    ],
    results: [
      { title: 'Eliminó el proceso manual de sincronización', desc: 'Los vendedores antes dedicaban 30-40 minutos al final de cada jornada a sincronizar manualmente vía email. Con la PWA, el proceso es completamente automático.' },
      { title: 'Visibilidad en tiempo real',                  desc: 'El dashboard muestra qué productos se consultan, en qué zona y a qué hora. Antes esto requería un reporte manual semanal.' },
      { title: 'Funciona en zonas con 2G/Edge',               desc: 'Modo offline con IndexedDB permite trabajar sin conexión indefinidamente. Sync automático al recuperar WiFi.' },
    ],
    lessons: [
      { text: 'Subestimé la complejidad del conflict resolution en sync offline. Lo que parecía un caso edge resultó ser el flujo principal de varios equipos. Modelar todos los casos de conflicto antes de escribir código hubiera ahorrado dos semanas de refactoring.' },
      { text: 'Las RLS policies necesitan su propia suite de tests desde el día uno. No es suficiente testear desde el API — hay que testear directamente contra la base de datos con roles reales.' },
      { text: 'Context propagation en Go no es opcional. Cualquier goroutine que espera en un channel debe tener un path de salida via context cancellation. Lo codifiqué como regla en el code review checklist.' },
    ],
    metrics: { buildTime: '42ms', uptime: '99.9%', requests: '2M/day', binarySize: '8.2MB' },
  },
  {
    id:        'ai-agent-runtime',
    execId:    'EXEC_PROJ_002',
    title:     'AI_AGENT_RUNTIME',
    status:    'offline',
    buildTime: '120ms',
    type:      'API · Agent Framework',
    duration:  '2 months',
    role:      'Solo developer',
    tags:      ['python', 'langchain', 'postgresql', 'redis'],
    stack:     ['Python', 'LangChain', 'PostgreSQL', 'Redis'],
    stackItems: [
      {
        name:     'Python + FastAPI',
        category: 'core',
        reason:   'Ecosistema ML/AI maduro. FastAPI por su async nativo y generación automática de OpenAPI schema sin configuración extra.',
      },
      {
        name:     'LangChain',
        category: 'core',
        reason:   'Abstracción de providers sin vendor lock-in. Permite cambiar entre OpenAI/Anthropic sin tocar lógica de negocio. Tool registry genérico para plugins.',
      },
      {
        name:     'PostgreSQL + pgvector',
        category: 'db',
        reason:   'Embeddings y búsqueda semántica en la misma base de datos. Sin infraestructura extra de vector store — reduce la complejidad operacional.',
      },
      {
        name:     'Redis',
        category: 'infra',
        reason:   'Message broker entre agentes. Evita acoplamiento directo y permite escalar workers de forma independiente sin cambiar el código.',
      },
    ],
    screenshot:  '/projects/ai-agent.png',
    screenshots: [],
    githubUrl:   'https://github.com/dnnnah/ai-agent-runtime',
    context:     'Necesitaba una capa de orquestación para conectar múltiples agentes de IA con memoria persistente, sin quedar atado a un solo proveedor de LLM.',
    problem:     'Los wrappers directos de OpenAI no escalan cuando tienes múltiples agentes que necesitan compartir contexto. Cada agente necesitaba acceso a herramientas y memoria de largo plazo de forma independiente sin acoplamiento.',
    architectureDiagram: `┌─────────────────────────────────────────────┐
│              Agent Orchestrator             │
│         LangChain · Tool Registry          │
└────────┬──────────────┬──────────────┬──────┘
         │              │              │
    ┌────▼───┐    ┌──────▼──┐   ┌──────▼──┐
    │  LLM   │    │ Memory  │   │  Tools  │
    │OpenAI  │    │pgvector │   │ Plugins │
    │Anthropic│   │Redis    │   │Registry │
    └────────┘    └─────────┘   └─────────┘`,
    architecture: 'Patrón de plugin para tools — cada herramienta es un módulo independiente registrado en runtime. La memoria se divide en corto plazo (Redis TTL) y largo plazo (pgvector similarity search).',
    dataFlow: [
      { step: '01', content: 'Request llega al `Orchestrator` con el prompt del usuario y el agente destino.' },
      { step: '02', content: '`MemoryManager` recupera contexto relevante de `pgvector` con similarity search — top 5 episodios más cercanos.' },
      { step: '03', content: 'Orquestador construye el prompt final: system prompt + memoria relevante + herramientas disponibles.' },
      { step: '04', content: 'LLM provider (OpenAI/Anthropic) procesa el prompt y devuelve tool calls o texto final.' },
      { step: '05', content: '`ToolRegistry` ejecuta las herramientas solicitadas en paralelo vía `asyncio.gather()`.' },
      { step: '06', content: 'Respuesta final guardada como episodio en `pgvector` para memoria futura del agente.' },
    ],
    codePatterns: [
      { name: 'Plugin System',    desc: 'Cada tool es un módulo Python decorado con @tool. El registry los descubre en import time sin configuración manual.' },
      { name: 'Memory Hierarchy', desc: 'Tres capas: Redis (sesión actual), pgvector (largo plazo), PostgreSQL (episodios completos). Cada capa tiene su TTL y política de eviction.' },
      { name: 'Provider Adapter', desc: 'Interface común para LLM providers. Cambiar de OpenAI a Anthropic es cambiar una variable de entorno.' },
    ],
    challenges: [
      {
        title:    'Context window overflow',
        problem:  'Los agentes con conversaciones largas excedían el context window del LLM, perdiendo el hilo de la conversación.',
        solution: 'Implementé compresión de historial — las conversaciones antiguas se resumen en embeddings antes de que excedan el límite. El agente mantiene coherencia sin ver el historial completo.',
      },
      {
        title:    'Tool execution timeout',
        problem:  'Tools que hacían web scraping bloqueaban el event loop de async Python cuando tardaban más de 30 segundos.',
        solution: 'Migré las tools pesadas a un worker pool separado con ProcessPoolExecutor. El orchestrator recibe un Future y puede cancelar si supera el timeout configurado.',
      },
    ],
    scalability: [
      { title: 'Worker pool por tipo de agente', desc: 'Agentes de código tienen más CPU allocation que agentes de búsqueda. El pool se configura por perfil sin tocar el código.' },
      { title: 'pgvector índice HNSW',           desc: 'Índice Hierarchical Navigable Small World para búsqueda aproximada. Latencia de búsqueda < 10ms con 1M de embeddings.' },
    ],
    results: [
      { title: 'Framework agnóstico de provider', desc: 'Cambiar entre OpenAI y Anthropic es cambiar una variable de entorno. Sin reescribir lógica de agentes.' },
      { title: 'Memoria persistente entre sesiones', desc: 'Los agentes recuerdan contexto de conversaciones anteriores. Coherencia narrativa en interacciones largas.' },
    ],
    lessons: [
      { text: 'El contexto de los LLMs es finito. Implementé una estrategia de compresión de historial que resume conversaciones antiguas en embeddings antes de que excedan el context window.' },
      { text: 'LangChain v0.1 tiene abstracciones que ocultan demasiado. En la refactorización a v0.3 decidí usar las primitivas directamente donde necesitaba control fino sobre los prompts.' },
    ],
    metrics: { buildTime: '120ms', uptime: '94.2%' },
  },
  {
    id:        'distributed-mq',
    execId:    'EXEC_PROJ_003',
    title:     'DISTRIBUTED_MQ',
    status:    'live',
    buildTime: '15ms',
    type:      'Backend · Messaging',
    duration:  '6 weeks',
    role:      'Solo developer',
    tags:      ['go', 'rabbitmq', 'redis', 'docker'],
    stack:     ['Go', 'RabbitMQ', 'Redis', 'Docker'],
    stackItems: [
      {
        name:     'Go',
        category: 'core',
        reason:   'Modelo de concurrencia ideal para workers — goroutines como consumidores con channels para back-pressure sin bloquear el runtime.',
      },
      {
        name:     'RabbitMQ',
        category: 'infra',
        reason:   'Dead-letter queues nativas para mensajes fallidos. Routing por topics sin lógica extra en los publishers. AMQP garantiza durabilidad en disco.',
      },
      {
        name:     'Redis',
        category: 'db',
        reason:   'Deduplicación de mensajes con TTL automático. Evita procesar el mismo evento dos veces en caso de redelivery sin una tabla dedicada en Postgres.',
      },
      {
        name:     'Docker Compose',
        category: 'infra',
        reason:   'Entorno reproducible para desarrollo y staging. Un solo comando levanta RabbitMQ, Redis y los workers con health checks configurados.',
      },
    ],
    screenshot:  '/projects/distributed-mq.png',
    screenshots: [],
    demoUrl:     'https://mq-demo.example.com',
    githubUrl:   'https://github.com/dnnnah/distributed-mq',
    context:     'Sistema de mensajería para desacoplar servicios en una arquitectura donde los picos de carga generaban timeouts en las integraciones síncronas.',
    problem:     'Las llamadas síncronas entre servicios fallaban en picos de tráfico. Necesitaba garantías de entrega at-least-once con retry automático y visibilidad sobre mensajes fallidos sin perder datos.',
    architectureDiagram: `Publishers          RabbitMQ              Consumers
    │                  │                      │
    ├─ order.created ──► Exchange             │
    ├─ user.updated ──►  (topic)   ──────────►├─ OrderWorker
    └─ email.send ────►             ──────────►├─ UserWorker
                       │                      └─ EmailWorker
                  Dead Letter Q
                       │
                  Retry Handler
                 (exp backoff ×3)`,
    architecture: 'Cada worker es una goroutine pool con tamaño configurable. El retry usa exponential backoff con jitter para evitar thundering herd en recuperaciones masivas.',
    dataFlow: [
      { step: '01', content: 'Publisher llama a `mq.Publish(ctx, topic, payload)` — el SDK serializa y envía a RabbitMQ con `persistent: true`.' },
      { step: '02', content: 'RabbitMQ enruta el mensaje al queue correcto según el `topic` binding. Si no hay consumer disponible, el mensaje persiste en disco.' },
      { step: '03', content: 'Worker goroutine recibe el mensaje → verifica deduplicación en `Redis` con el `message_id`.' },
      { step: '04', content: 'Si es duplicado → `Ack()` inmediato sin procesar. Si es nuevo → procesa y guarda `message_id` en Redis con TTL de 24h.' },
      { step: '05', content: 'En caso de error → `Nack()` con `requeue: false` → mensaje va a Dead Letter Queue automáticamente.' },
      { step: '06', content: 'Retry Handler consume la DLQ con exponential backoff. Después de 3 intentos → notificación al equipo de operaciones.' },
    ],
    codePatterns: [
      { name: 'Worker Pool',          desc: 'Pool de goroutines con semáforo para controlar concurrencia. El tamaño se configura por variable de entorno sin recompilar.' },
      { name: 'Idempotent Consumer',  desc: 'Cada mensaje tiene un ID único. Redis verifica si ya fue procesado antes de ejecutar la lógica de negocio. TTL de 24h.' },
      { name: 'Circuit Breaker',      desc: 'Si el downstream falla 5 veces consecutivas, el worker entra en estado open y deja de procesar por 30 segundos.' },
    ],
    challenges: [
      {
        title:    'At-least-once delivery e idempotencia',
        problem:  'Un mensaje de "crear orden" se procesó dos veces por un redelivery justo después de un Ack parcial, creando órdenes duplicadas en producción.',
        solution: 'Implementé deduplicación basada en message_id con Redis. Cada operación de negocio es idempotente por diseño — crear dos veces la misma orden devuelve la existente.',
      },
      {
        title:    'Thundering herd en recuperación masiva',
        problem:  'Cuando RabbitMQ volvía después de un downtime, todos los consumers intentaban reconectar simultáneamente y saturaban el broker.',
        solution: 'Jitter aleatorio en el exponential backoff — cada worker espera un tiempo diferente. La reconexión se distribuye en ~30 segundos en lugar de ocurrir toda junta.',
      },
    ],
    scalability: [
      { title: 'Worker scaling independiente', desc: 'Cada tipo de worker (orders, emails, users) escala de forma independiente según la profundidad de su queue. Sin escalar toda la aplicación.' },
      { title: 'Priority queues',              desc: 'RabbitMQ soporta prioridades por mensaje. Órdenes urgentes se procesan antes que notificaciones sin código adicional.' },
    ],
    results: [
      { title: 'Cero pérdida de datos en downtime',    desc: 'Los mensajes persisten en disco en RabbitMQ. Un downtime de 2 horas no perdió ningún evento — todos se procesaron al recuperar.' },
      { title: '500K mensajes/día con P99 de 3ms',     desc: 'Latencia de publish a consume consistente bajo carga. El sistema no degrada con picos de tráfico.' },
    ],
    lessons: [
      { text: 'At-least-once delivery significa que tu lógica de negocio debe ser idempotente sin excepción. Aprendí esto en producción — lo más costoso posible.' },
      { text: 'El monitoreo de la DLQ es tan importante como el del queue principal. Implementé alertas cuando la DLQ supera un threshold para detectar bugs sistemáticos.' },
    ],
    metrics: { buildTime: '15ms', uptime: '99.99%', requests: '500K/day', binarySize: '6.1MB' },
  },
  {
    id:        'cli-devtools',
    execId:    'EXEC_PROJ_004',
    title:     'CLI_DEVTOOLS',
    status:    'building',
    buildTime: '8ms',
    type:      'CLI Tool',
    duration:  'En desarrollo',
    role:      'Solo developer',
    tags:      ['go', 'cobra', 'linux'],
    stack:     ['Go', 'Cobra', 'Linux'],
    stackItems: [
      {
        name:     'Go + Cobra',
        category: 'core',
        reason:   'Standard de facto para CLIs en Go. Autocompletion, help generation y subcommands incluidos out of the box. Compila a binario único sin dependencias en la máquina destino.',
      },
      {
        name:     'Cross-compilation',
        category: 'infra',
        reason:   'Un solo Makefile genera binarios para Linux/macOS/Windows con GOOS/GOARCH. Sin instalar toolchains adicionales.',
      },
    ],
    screenshot:  '/projects/cli-devtools.png',
    screenshots: [],
    githubUrl:   'https://github.com/dnnnah/cli-devtools',
    context:     'Acumulé demasiados scripts bash dispersos en distintos repositorios. Necesitaba una herramienta unificada que automatizara las tareas repetitivas del día a día sin depender del entorno de la máquina.',
    problem:     'Los scripts bash son frágiles y difíciles de distribuir. Cada máquina nueva necesitaba setup manual de dependencias. Quería un binario único que funcionara igual en cualquier entorno sin instalaciones previas.',
    architectureDiagram: `devtools (binario único · 4.1MB)
├── env      → .env encryption/decryption
├── git      → conventional commits + branching
├── docker   → cleanup + helpers
├── db       → migrations + snapshots
└── deploy   → pipeline simplificado

Plugin System (en desarrollo)
└── devtools plugin install <url>`,
    architecture: 'Arquitectura de comandos con Cobra. Cada subcomando es un paquete independiente con su propia lógica. Plugin system en desarrollo para comandos custom por proyecto.',
    dataFlow: [
      { step: '01', content: 'Usuario ejecuta `devtools git feature "add auth"` en la terminal.' },
      { step: '02', content: 'Cobra parsea el subcomando `git` → subcomando `feature` → argumento `"add auth"`.' },
      { step: '03', content: 'Comando valida el contexto: ¿estamos en un repo Git? ¿hay cambios sin commit?' },
      { step: '04', content: 'Crea branch `feat/add-auth` siguiendo la convención configurada en `.devtools.yaml`.' },
      { step: '05', content: 'Abre el editor con un template de commit message listo para completar.' },
    ],
    codePatterns: [
      { name: 'Command Pattern', desc: 'Cada subcomando implementa la interface cobra.Command. Testeable de forma aislada sin depender del runtime de la CLI.' },
      { name: 'Config Cascade',  desc: 'Configuración en cascada: flags > .devtools.yaml local > .devtools.yaml global > defaults. Sin magia — el orden es explícito.' },
    ],
    challenges: [
      {
        title:    'UX de mensajes de error',
        problem:  'Los errores de bash son crípticos. Los primeros usuarios no entendían por qué fallaba un comando y abandonaban la herramienta.',
        solution: 'Cada error incluye el contexto ("estás en un repo sin remote configurado"), la causa ("git remote add origin <url> no se ha ejecutado") y la solución sugerida ("ejecuta: git remote add origin <url>").',
      },
    ],
    scalability: [
      { title: 'Plugin system',      desc: 'Los equipos pueden distribuir comandos custom como binarios Go. El host los descubre en PATH con el prefijo devtools-.' },
      { title: 'Config por proyecto', desc: '.devtools.yaml en la raíz del repo sobrescribe la config global. Cada proyecto puede tener sus propias convenciones.' },
    ],
    results: [
      { title: 'Un comando en lugar de 12 scripts', desc: 'Consolidé 12 scripts bash dispersos en un solo binario. La curva de aprendizaje para nuevos miembros del equipo bajó de horas a minutos.' },
    ],
    lessons: [
      { text: 'La UX de un CLI importa tanto como la de una web app. Los mensajes de error deben decirle al usuario exactamente qué hacer, no solo qué salió mal.' },
    ],
    metrics: { buildTime: '8ms', binarySize: '4.1MB' },
  },
]