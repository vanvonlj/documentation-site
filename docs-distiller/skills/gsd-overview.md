---
sidebar_position: 10
---

# GetShitDone (GSD)

A spec-driven development workflow that manages planning, execution, and verification of projects using Claude Code on the Distiller platform. GSD eliminates context degradation by spawning fresh subagents for every task.

## Overview

GSD is a project management and execution framework built for Claude Code. It structures work into a hierarchy of **projects**, **milestones**, **phases**, and **plans**, with each unit tracked through planning documents and atomic git commits. On a Pamir Distiller device, GSD commands are available as skills invoked directly in your Claude Code session.

### The Problem GSD Solves

As Claude processes more tokens in a session, output quality degrades:

| Context Usage | Quality Level |
|---|---|
| 0-30% | Peak -- thorough, comprehensive |
| 50%+ | Starts cutting corners |
| 70%+ | Hallucinations, forgotten requirements |

GSD eliminates this by spawning **fresh Claude subagent instances** for each task. Each subagent gets a clean 200,000-token context window. Task 50 has the same quality as Task 1.

### How It Works

GSD uses a **thin orchestrator-subagent pattern**:

1. Your main Claude Code session acts as an **orchestrator** that stays at 30-40% context usage
2. Heavy lifting is done by **subagents** spawned with fresh context windows
3. The orchestrator coordinates results without doing the work itself
4. Phases execute with **wave-based parallelism** -- independent plans run simultaneously

## Project Hierarchy

```
Project
  -> Milestone (v1.0, v1.1, ...)
      -> Phase (Auth, Dashboard, ...)
          -> Plan (2-3 atomic tasks per plan)
              -> Task (1 unit of work = 1 git commit)
```

| Level | Description | Created By |
|---|---|---|
| **Project** | Top-level vision, requirements, constraints | `/gsd:new-project` |
| **Milestone** | A version or release cycle | `/gsd:new-milestone` |
| **Phase** | A feature area within a milestone | Roadmap creation |
| **Plan** | 2-3 atomic tasks with verification criteria | `/gsd:plan-phase` |
| **Task** | Smallest unit of work, one git commit | `/gsd:execute-phase` |

## Workflow Lifecycle

```
/gsd:new-project ──> Questions -> Research -> Requirements -> Roadmap
        │
        ▼
/gsd:discuss-phase N ──> Vision clarification -> CONTEXT.md
        │
        ▼
/gsd:plan-phase N ──> Research -> Planning -> Verification loop
        │
        ▼
/gsd:execute-phase N ──> Wave-based execution -> Atomic commits
        │
        ▼
/gsd:verify-work N ──> User acceptance testing
        │
        ▼
  Repeat for each phase, then:
        │
        ▼
/gsd:complete-milestone ──> Archive and start next cycle
```

See the [GSD Workflow Guide](../guides/gsd-workflow.md) for detailed step-by-step instructions.

## Quick Start

### Start a New Project

```bash
/gsd:new-project
```

This launches an interactive flow that:
1. Asks questions to understand your vision
2. Runs 4 parallel research agents to investigate the domain
3. Scopes requirements into v1, v2, and out-of-scope
4. Creates a phased roadmap

### Plan and Execute a Phase

```bash
# Plan phase 1
/gsd:plan-phase 1

# Execute phase 1
/gsd:execute-phase 1

# Verify the work
/gsd:verify-work 1
```

### Quick One-Off Tasks

For bug fixes, config changes, or small features that don't need full planning:

```bash
/gsd:quick
```

This gives you atomic commits and state tracking without the overhead of research and verification agents.

## Planning Documents

GSD creates and manages a `.planning/` directory in your project:

```
.planning/
├── PROJECT.md          # Vision, requirements, constraints
├── REQUIREMENTS.md     # Scoped v1/v2 features with REQ-IDs
├── ROADMAP.md          # Phase breakdown with goals and status
├── STATE.md            # Cross-session memory: position, decisions, blockers
├── config.json         # Workflow settings
├── research/           # Ecosystem research from project init
├── phases/
│   ├── 01-phase-name/
│   │   ├── 01-CONTEXT.md       # User decisions (from discuss-phase)
│   │   ├── 01-RESEARCH.md      # Domain research
│   │   ├── 01-01-PLAN.md       # Execution plan with XML tasks
│   │   ├── 01-01-SUMMARY.md    # Results and commit hashes
│   │   └── 01-VERIFICATION.md  # Goal-backward verification
│   └── 02-phase-name/
│       └── ...
└── quick/              # Ad-hoc quick task plans and summaries
```

## Specialized Agents

GSD uses 11 specialized agents, each optimized for a specific role:

| Agent | Role |
|---|---|
| **Planner** | Decomposes phases into executable task plans |
| **Executor** | Implements plans with atomic commits per task |
| **Verifier** | Goal-backward verification of phase outcomes |
| **Phase Researcher** | Investigates domain before planning |
| **Project Researcher** | Ecosystem research for roadmap creation |
| **Research Synthesizer** | Aggregates research into structured summaries |
| **Roadmapper** | Creates phased roadmaps with success criteria |
| **Plan Checker** | Pre-execution verification that plans achieve goals |
| **Debugger** | Scientific debugging with hypothesis testing |
| **Codebase Mapper** | Analyzes existing codebases for brownfield projects |
| **Integration Checker** | Verifies cross-phase consistency |

## Model Profiles

Control cost and quality with profiles via `/gsd:set-profile`:

| Profile | Best For |
|---|---|
| **quality** | Critical projects, complex architecture |
| **balanced** | Most projects (recommended) |
| **budget** | Simple tasks, rapid iteration |

## Key Design Principles

- **Context Preservation** -- Plans fit within fresh 200k-token windows; no degradation
- **Aggressive Atomicity** -- 2-3 tasks per plan, one commit per task
- **Goal-Backward Verification** -- Verifies "what must be TRUE" rather than "what tasks completed"
- **Traceability** -- Requirements trace to phases, phases to plans, plans to commits
- **User Fidelity** -- Decisions captured in CONTEXT.md are locked; agents must honor them

## Session Management

```bash
# Pause work and create handoff document
/gsd:pause-work

# Resume from where you left off
/gsd:resume-work

# Check current progress and next steps
/gsd:progress
```

## See Also

- [GSD Workflow Guide](../guides/gsd-workflow.md) -- Step-by-step usage instructions
- [GSD Command Reference](../guides/gsd-commands.md) -- Complete command listing
- [GSD GitHub Repository](https://github.com/glittercowboy/get-shit-done) -- Source code and releases
