/**
 * Tipos del feature bin/projects — v3
 */

export type ProjectStatus = 'live' | 'building' | 'offline'

export type StackCategory = 'core' | 'db' | 'frontend' | 'infra'

export interface StackItem {
  name:     string
  category: StackCategory
  reason:   string
}

export interface Challenge {
  title:    string
  problem:  string
  solution: string
}

export interface ScaleDecision {
  title: string
  desc:  string
}

export interface Result {
  title: string
  desc:  string
}

export interface Lesson {
  text: string
}

export interface FlowStep {
  step:    string
  content: string
}

export interface CodePattern {
  name: string
  desc: string
}

export interface ProjectMetrics {
  buildTime:   string
  uptime?:     string
  requests?:   string
  binarySize?: string
}

export interface Project {
  id:                  string
  execId:              string
  title:               string
  status:              ProjectStatus
  buildTime:           string
  type:                string
  duration:            string
  role:                string
  tags:                string[]
  stack:               string[]
  stackItems:          StackItem[]
  screenshot:          string
  screenshots:         string[]
  demoUrl?:            string
  githubUrl:           string
  context:             string
  problem:             string
  architectureDiagram: string
  architecture:        string
  dataFlow:            FlowStep[]
  codePatterns:        CodePattern[]
  challenges:          Challenge[]
  scalability:         ScaleDecision[]
  results:             Result[]
  lessons:             Lesson[]
  metrics:             ProjectMetrics
}