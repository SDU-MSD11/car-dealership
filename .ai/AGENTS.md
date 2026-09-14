# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

# RELEVANCE-ONLY EXPLORATION

Agents must explore only the files and directories relevant to the current task. This is a hard stop condition, not a preference.

1. Start from the requested change, and identify the target area, folders and relevant files relevant to the task.
2. Search narrowly for the exact feature, component, page, configuration key or path needed. Avoid repository-wide `grep`, broad `glob`, and speculative searches that produce unrelated results.
3. Once the relevant API and conventions are clear, stop reading, and implement. Do not keep searching for alternative examples or launch exploratory subagents to confirm already sufficient context.
4. If the user identifies the working area or asks to stop reading, stop all further exploration immediately. Ask a question only when a concrete implementation blocker remains.

# CRITICAL: Git is read-only

Git is only for read-only context gathering. Agents use `git status`, `git diff`, `git log`, etc. solely to understand what changes exists or have been applied. Never modify git state.

- **NEVER** run `git add`, `git commit`, `git push`, `git tag`, or any other git-mutating command.
- **NEVER** tell the user when to commit/push. The user decides that.

# CRITICAL: Subagent Delegation & Custom Agents

- **Match model complexity to task cognitive load.** Never use expensive or heavy models for routine, single-purpose tasks. Spawn custom subagents using fast, lightweight models instead (e.g., `glm-nano` or equivalent) for low-cognitive work such as semantic file discovery, log parsing, or basic syntax formatting.
- **Do not replace deterministic tools with agent-based solutions.** Do not spawn a "file search agent" for simple keyword or regex lookups. Rely on standard CLI tools like `ripgrep`, `find`, AST parsers first. Only delegate to a custom search agent when the task requires semantic understanding or context synthesis across the codebase.
- **Enforce strict boundaries for specialized subagents.** When creating a custom agent (e.g., "Semantic Searcher", "Log Analyzer", "Linter Auto-fixer"), restrict it to a single responsibility. Provide it with a tightly scoped prompt and limit its context window to prevent scope creep and unnecessary token usage.
- **Always delegate context-heavy work to one or more capable `glm-flash` subagents.** This includes open-ended codebase discovery, broad architectural searches, gathering context across many layers, and work that would pollute the main agent's context window.
- **Run independent subagents in parallel whenever possible.** Do not duplicate their delegated exploration or implementation in the main agent unless integration, conflict resolution, or verification explicitly requires it.
- **Substantial implementations require an independent review cycle.** After an implementation subagent completes a large system, feature, or multi-file change, spawn a fresh, capable subagent to review the complete diff as if it were a pull request. The review must focus strictly on correctness, regressions, security, production risks, and missing tests without modifying the implementation itself.
- **Delegate review fixes to a seperate subagent.** Pass all actionable review findings to a fresh implementation subagent. Have it apply the changes and tests, running another independent review cycle if the fixes are substantial. Repeat until no material findings remain.
- **The main agent remains responsible for integration and final verification.** It must inspect the resulting diffs from all subagents, resolve conflicts, and run all required tests and builds before reporting completion.
- **Do not spawn any subagent for a narrow, straightforward task.** A target read, search, or edit involving only a small number of known files must remain with the main agent to avoid orchestration overhead.

# Documentation Map

| File                    | Contents                                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| `.ai/AGENTS.md`       | Overall Agents rules, behavior for Agents and how they should operate in this repository.                     |
| `.ai/ARCHITECTURE.md` | Architecture design guide, module placement, folder structure, naming conventions, and technology priorities. |
| `.ai/TESTING.md`      | Dictating rules and behavior for making tests and how they should be structured, placed and made.             |

Use the documentation map to select the directly applicable file or section. Do not automatically open `ARCHITECTURE.md` or any other documentation file when the task is already covered by the this file and current agent context.

# Coding DOs & DON'Ts

These are non-negotiable rules for working with this codebase.

## Feature System

| Rule                                                                                     | Why                                                                                                         |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **DO** follow the structure dictated in `ARCHITECTURE.md`                        | Keeps each feature clean, easy to maintain and easy to understand.                                          |
| **DO** make feature based components and place them inside of the feature location |                                                                                                             |
| **DON'T** place feature based components in the main components folder             | Makes it more maintainable if they are located within their seperate components folder within said feature. |
| **DON'T** deviate from the structure dictated in `ARCHITECTURE.md`               | Makes the codebase messy, and makes it unmaintainable.                                                      |

## Components and Pages

| Rule                                                                                         | Why                                                                                                  |
| -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **DO** use NativeWind to style together with the TailwindCSS configuration             | TailwindCSS is a lot more documented, and keeps the components, and pages clean, and easy to change. |
| **DO** group related expo routing pages and layouts within `./src/app/`              | Makes the project more structual.                                                                    |
| **DON'T** place anything but expo routing pages and layout files within `./src/app/` | expo-router tries to route every file recursively in that location.                                  |
| **DON'T** use StyleSheet                                                               | A lot less documented, which means it is a lot less maintainable, and more difficult to understand.  |

## Stores Managers

| Rule                                                                                                                            | Why                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **DO** split up stores into category specific and relevant files                                                          | Makes the stores more managable and readable                                                     |
| **DO** use zustand to create store managers                                                                              | It is a well optimized and easy readable tool to create neat and well structured store managers. |
| **DON'T** place feature based stores in the base `./src/store` folder, but keep them in their feature specific location | Makes it more maintainable.                                                                      |

## Utils

| Rule                                                                           | Why                                                        |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| **DO** group and seperate utils into multiple relevant files and folders | Makes it easy to add new utils and maintain existing ones. |

# Documentation Maintenance Rule

After completing any task, assess whether the work introduces:

- New architectural patterns or design choices
- New coding conventions adopted
- Significant new features that future agents would benefit from understanding.

**If so, ask the user:** _"Should I update/create documentation for this?"_

Do **not** ask for:

- Minor bugfixes or trivial refactors
- Small feature additions that follow existing patterns
- Configuration value changes
- Dependency version bumps

This ensures this documentation stays fresh and up to date as the codebase evolves.
