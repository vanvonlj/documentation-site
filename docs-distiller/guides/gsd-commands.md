---
sidebar_position: 5
---

# GSD Command Reference

Complete reference for all GetShitDone (GSD) commands available on the Pamir Distiller platform. All commands are invoked as `/gsd:<command>` in your Claude Code session.

## Core Workflow

### `/gsd:new-project`

Initialize a new project with guided discovery.

```bash
/gsd:new-project
/gsd:new-project --auto
```

| Flag | Description |
|---|---|
| `--auto` | Skip interactive questions; run research, requirements, and roadmap automatically |

**Creates:** `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, `research/`

---

### `/gsd:discuss-phase`

Capture design decisions before planning a phase. Asks targeted questions about implementation choices.

```bash
/gsd:discuss-phase 1
/gsd:discuss-phase 3
```

**Creates:** `{phase}-CONTEXT.md`

---

### `/gsd:plan-phase`

Research, plan, and verify a phase. Runs researcher, planner, and checker agents in sequence.

```bash
/gsd:plan-phase 1
/gsd:plan-phase 5
```

**Creates:** `{phase}-RESEARCH.md`, `{phase}-{N}-PLAN.md` (one or more)

---

### `/gsd:execute-phase`

Execute all plans in a phase with wave-based parallelism and atomic commits.

```bash
/gsd:execute-phase 1
/gsd:execute-phase 3
```

**Creates:** `{phase}-{N}-SUMMARY.md`, `{phase}-VERIFICATION.md`

---

### `/gsd:verify-work`

Interactive user acceptance testing for a completed phase.

```bash
/gsd:verify-work 1
```

**Creates:** `{phase}-UAT.md`

---

### `/gsd:quick`

Execute a one-off task with atomic commits and state tracking, without full planning overhead.

```bash
/gsd:quick
```

**Creates:** `.planning/quick/{N}-{slug}/PLAN.md`, `SUMMARY.md`

---

## Milestone Management

### `/gsd:new-milestone`

Start a new milestone cycle after completing the current one.

```bash
/gsd:new-milestone
/gsd:new-milestone v1.1
```

---

### `/gsd:audit-milestone`

Verify that the current milestone's definition-of-done is met before archiving.

```bash
/gsd:audit-milestone
```

---

### `/gsd:complete-milestone`

Archive the completed milestone, tag the release, and prepare for the next cycle.

```bash
/gsd:complete-milestone
```

**Creates:** `MILESTONES.md` (or appends to existing)

---

### `/gsd:plan-milestone-gaps`

After auditing, create phases to close any identified gaps.

```bash
/gsd:plan-milestone-gaps
```

---

## Phase Management

### `/gsd:add-phase`

Append a new phase to the end of the current roadmap.

```bash
/gsd:add-phase
```

---

### `/gsd:insert-phase`

Insert urgent work between existing phases using decimal numbering (e.g., phase 3.1 between 3 and 4).

```bash
/gsd:insert-phase 3
```

---

### `/gsd:remove-phase`

Remove a future phase from the roadmap and renumber subsequent phases.

```bash
/gsd:remove-phase 5
```

---

### `/gsd:list-phase-assumptions`

Preview Claude's planned approach for a phase before committing to planning.

```bash
/gsd:list-phase-assumptions 2
```

---

### `/gsd:research-phase`

Run research for a phase without proceeding to planning. Standalone alternative to the research step built into `/gsd:plan-phase`.

```bash
/gsd:research-phase 3
```

**Creates:** `{phase}-RESEARCH.md`

---

## Session Management

### `/gsd:pause-work`

Create a context handoff document when stopping mid-phase. Captures current position, active decisions, and next steps.

```bash
/gsd:pause-work
```

**Creates:** `.planning/.continue-here-{timestamp}.md`

---

### `/gsd:resume-work`

Resume work from a previous session with full context restoration.

```bash
/gsd:resume-work
```

---

### `/gsd:progress`

Check project status, recent work, and get routed to the recommended next action.

```bash
/gsd:progress
```

---

## Task Management

### `/gsd:add-todo`

Capture an idea or task without interrupting your current work.

```bash
/gsd:add-todo Add rate limiting to the API
/gsd:add-todo Refactor database connection pooling
```

---

### `/gsd:check-todos`

List pending todos and select one to work on.

```bash
/gsd:check-todos
```

---

## Debugging

### `/gsd:debug`

Launch systematic debugging with persistent state across context resets.

```bash
/gsd:debug
/gsd:debug Login form submits but user is not authenticated
```

The debugger agent:
1. Forms hypotheses about the root cause
2. Tests them systematically
3. Tracks what's been tried
4. Creates fix plans when the cause is identified

---

## Codebase Analysis

### `/gsd:map-codebase`

Analyze an existing codebase with parallel mapper agents. Use before `/gsd:new-project` on brownfield projects.

```bash
/gsd:map-codebase
```

**Creates:** `.planning/codebase/` with analysis documents (structure, architecture, stack, conventions, testing, concerns)

---

## Configuration

### `/gsd:settings`

View and edit GSD workflow configuration (gates, parallelization, agent toggles).

```bash
/gsd:settings
```

---

### `/gsd:set-profile`

Switch between model profiles that control cost and quality.

```bash
/gsd:set-profile quality
/gsd:set-profile balanced
/gsd:set-profile budget
```

| Profile | Description |
|---|---|
| `quality` | Opus for most agents. Best for critical projects |
| `balanced` | Mix of Opus and Sonnet. Recommended default |
| `budget` | Sonnet and Haiku. Fastest and cheapest |

---

## Utility

### `/gsd:help`

Show available commands and usage information.

```bash
/gsd:help
```

---

### `/gsd:update`

Update GSD to the latest version with changelog display.

```bash
/gsd:update
```

---

### `/gsd:join-discord`

Get a link to the GSD community Discord server.

```bash
/gsd:join-discord
```

---

### `/gsd:reapply-patches`

Reapply local modifications after a GSD update.

```bash
/gsd:reapply-patches
```

---

## Typical Command Flow

Here is the standard sequence for a full project lifecycle:

```bash
# 1. Initialize
/gsd:new-project

# 2. For each phase:
/gsd:discuss-phase 1        # Optional: capture decisions
/gsd:plan-phase 1           # Research + plan + verify
/gsd:execute-phase 1        # Build with atomic commits
/gsd:verify-work 1          # User acceptance testing

# 3. Repeat for phases 2, 3, ...

# 4. Wrap up
/gsd:audit-milestone
/gsd:complete-milestone
/gsd:new-milestone v1.1     # Start next cycle
```

## See Also

- [GSD Overview](../skills/gsd-overview.md) -- Architecture and design principles
- [GSD Workflow Guide](./gsd-workflow.md) -- Step-by-step usage instructions
