---
sidebar_position: 4
---

# GSD Workflow Guide

Step-by-step guide to using the GetShitDone (GSD) workflow on your Pamir Distiller device. This covers the full lifecycle from project initialization through milestone completion.

## Prerequisites

- Pamir Distiller device with Claude Code session active
- GSD installed (comes pre-installed on Distiller devices)
- A git repository for your project

To verify GSD is available:

```bash
/gsd:help
```

## Step 1: Initialize a New Project

Start every new project with:

```bash
/gsd:new-project
```

This runs four substeps automatically:

### 1a. Questions

GSD asks questions to understand your project vision, target users, technical constraints, and goals. Answer thoroughly -- these answers shape everything downstream.

### 1b. Research

Four parallel research agents investigate:
- **Stack Analysis** -- Best technologies for your use case
- **Feature Landscape** -- What similar projects implement
- **Architecture Patterns** -- Proven design approaches
- **Pitfalls & Gotchas** -- Common mistakes to avoid

### 1c. Requirements

GSD scopes your features into:
- **v1** -- Must-have features for the first milestone
- **v2** -- Future enhancements
- **Out of scope** -- Explicitly excluded items

Each requirement gets a `REQ-ID` for traceability.

### 1d. Roadmap

Creates a phased implementation plan. Each phase has:
- A clear goal statement
- Success criteria
- Dependencies on other phases
- Estimated complexity

**Output files:**
```
.planning/
├── PROJECT.md
├── REQUIREMENTS.md
├── ROADMAP.md
├── STATE.md
└── research/
    ├── SUMMARY.md
    ├── STACK.md
    ├── ARCHITECTURE.md
    ├── FEATURES.md
    └── PITFALLS.md
```

### Auto Mode

To skip interactive questions and let GSD make reasonable defaults:

```bash
/gsd:new-project --auto
```

## Step 2: Discuss a Phase (Optional)

Before planning, capture design decisions:

```bash
/gsd:discuss-phase 1
```

GSD identifies gray areas specific to your feature type (UI layouts, API formats, data models) and asks clarifying questions. Your answers are locked into a `CONTEXT.md` file that all downstream agents must respect.

This step is optional but recommended for complex phases where implementation choices matter.

## Step 3: Plan a Phase

```bash
/gsd:plan-phase 1
```

This runs a three-step process:

### 3a. Research

A researcher agent investigates implementation approaches, guided by your CONTEXT decisions and the project requirements.

### 3b. Plan Creation

A planner agent creates execution plans, each containing 2-3 atomic tasks. Plans use XML-structured task definitions:

```xml
<task type="auto">
  <name>Implement user registration endpoint</name>
  <files>src/routes/auth.ts, src/models/user.ts</files>
  <action>Create POST /api/register with email/password validation</action>
  <verify>curl test returns 201 with valid data, 400 with invalid</verify>
  <done>Registration endpoint accepts and validates user input</done>
</task>
```

### 3c. Verification Loop

A plan-checker agent verifies the plans will actually achieve the phase goal. If they don't pass, the planner revises until they do.

**Output files:**
```
.planning/phases/01-phase-name/
├── 01-RESEARCH.md
├── 01-01-PLAN.md
├── 01-02-PLAN.md
└── ...
```

## Step 4: Execute a Phase

```bash
/gsd:execute-phase 1
```

Execution uses **wave-based parallelism**:

1. Plans are pre-assigned to waves based on dependency analysis
2. Plans in the same wave run in parallel (independent work)
3. Waves execute sequentially (dependent work waits)
4. Each task creates one atomic git commit immediately after completion

### Deviation Rules

During execution, agents automatically handle deviations:

| Rule | Action | Example |
|---|---|---|
| **Rule 1** | Auto-fix bugs | Broken behavior, runtime errors |
| **Rule 2** | Auto-add critical missing functionality | Validation, error handling, security |
| **Rule 3** | Auto-fix blocking issues | Missing deps, broken imports, type errors |
| **Rule 4** | Ask user about architectural changes | New database tables, major refactors |

### Checkpoint Types

Plans can include checkpoints that pause execution:

- **human-verify** -- Claude automated the work; you visually confirm it looks right
- **human-action** -- You need to provide credentials, run a protected command, etc.
- **human-decision** -- You choose between architectural alternatives

**Output files:**
```
.planning/phases/01-phase-name/
├── 01-01-SUMMARY.md    # Commit hashes, deviations, metrics
├── 01-02-SUMMARY.md
└── 01-VERIFICATION.md  # Automated goal-backward verification
```

## Step 5: Verify the Work

```bash
/gsd:verify-work 1
```

An interactive acceptance testing flow:

1. Extracts testable deliverables from completed code
2. Walks through a verification checklist with you
3. Auto-diagnoses any failures using debug agents
4. Creates fix plans if issues are found

**Output:** `01-UAT.md`

## Step 6: Complete the Milestone

When all phases are done:

```bash
# Audit that definition-of-done is met
/gsd:audit-milestone

# Archive and tag the release
/gsd:complete-milestone

# Start the next milestone
/gsd:new-milestone v1.1
```

## Working with Existing Codebases

If you're adding GSD to an existing project:

```bash
# First, map your codebase
/gsd:map-codebase

# Then create the project (GSD already knows your code)
/gsd:new-project
```

The codebase mapper spawns parallel agents to analyze your stack, architecture, conventions, testing patterns, and concerns. This context feeds into project initialization so questions focus on what you're adding, not what already exists.

## Managing the Roadmap

### Add a Phase

```bash
# Append to end of roadmap
/gsd:add-phase

# Insert between existing phases (creates decimal numbering)
/gsd:insert-phase 3
# Creates phase 3.1 between phases 3 and 4
```

### Remove a Phase

```bash
/gsd:remove-phase 5
# Removes phase 5 and renumbers subsequent phases
```

### Preview Approach

Before planning, see what Claude would do:

```bash
/gsd:list-phase-assumptions 3
```

## Session Management

### Pausing and Resuming

```bash
# Create a handoff document when stopping mid-phase
/gsd:pause-work

# Resume from your last session with full context
/gsd:resume-work
```

GSD creates a `CONTINUE-HERE.md` file that preserves your exact position, active decisions, and next steps.

### Checking Progress

```bash
/gsd:progress
```

Shows current milestone status, completed phases, active work, and recommends the next action (plan or execute).

## Quick Tasks

For bug fixes, config changes, or small features that don't warrant full phase planning:

```bash
/gsd:quick
```

Quick mode provides:
- Atomic git commits
- State tracking in `.planning/quick/`
- Plan and summary documents

But skips:
- Research agents
- Verification loops
- Wave-based parallelism

## Capturing Ideas

Don't interrupt your flow to track ideas:

```bash
# Capture a todo for later
/gsd:add-todo Add rate limiting to the API

# Review pending todos
/gsd:check-todos
```

## Debugging

For systematic debugging with persistent state:

```bash
/gsd:debug
```

Launches a debugger agent that:
1. Forms hypotheses about the root cause
2. Tests them systematically
3. Maintains state across context resets
4. Tracks what's been tried and what worked

## Tips

- **Run `/gsd:discuss-phase` for complex features** -- 5 minutes of discussion saves hours of rework
- **Trust the verification loop** -- If the plan checker rejects a plan, the revision is usually better
- **Use `/gsd:quick` liberally** -- Not everything needs a full phase
- **Check `/gsd:progress` between sessions** -- It tells you exactly where to pick up
- **Review SUMMARY.md files** -- They contain commit hashes for every change, making rollbacks easy

## See Also

- [GSD Overview](../skills/gsd-overview.md) -- Architecture and design principles
- [GSD Command Reference](./gsd-commands.md) -- Complete command listing
