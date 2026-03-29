/**
 * Tipos del feature bin/projects.
 * Definidos antes de implementar la lógica.
 */

export type ProjectStatus = 'live' | 'building' | 'offline'

export type ProjectTag =
  | 'go' | 'python' | 'typescript'
  | 'postgresql' | 'redis' | 'supabase'
  | 'docker' | 'rabbitmq' | 'linux'
  | 'langchain' | 'react' | 'cobra'

export interface ProjectMetrics {
  buildTime:   string
  uptime?:     string
  requests?:   string
  binarySize?: string
}

export interface Project {
  id:           string
  execId:       string
  title:        string
  status:       ProjectStatus
  buildTime:    string
  stack:        string[]
  tags:         ProjectTag[]
  screenshot:   string
  demoUrl?:     string
  githubUrl:    string
  metrics:      ProjectMetrics
  architecture: string
  readme:       string
}