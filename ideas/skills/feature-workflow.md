# Feature Workflow (TDD Implementation)

Implement a feature using a test-driven development workflow.

## Trigger
User says: "Implement [feature]", "Build [feature] using TDD", or "Start feature workflow for [feature]"

## Inputs
- `$FEATURE` — The feature to implement (from user prompt or a PRD in `tasks/`)
- `$PRD_FILE` — (Optional) Path to a PRD file in `tasks/`

## Workflow

### Phase 1: Understand
1. If a PRD file is provided, read it thoroughly
2. If no PRD, ask clarifying questions to understand the feature requirements
3. Identify the acceptance criteria

### Phase 2: Plan
1. Break the feature into small, testable units
2. Identify files to create or modify
3. Outline the implementation order (dependencies first)

### Phase 3: Red (Write Failing Tests)
1. Write test files for the first unit
2. Run tests to confirm they fail: `[TEST_COMMAND]`
3. Commit the failing tests

### Phase 4: Green (Make Tests Pass)
1. Write the minimum code to make the tests pass
2. Run tests: `[TEST_COMMAND]`
3. If tests fail, fix the code until they pass
4. Commit the passing implementation

### Phase 5: Refactor
1. Clean up the implementation (no behavior changes)
2. Run tests to confirm nothing broke: `[TEST_COMMAND]`
3. Run linter: `[LINT_COMMAND]`
4. Commit the refactor

### Phase 6: Repeat
1. Go back to Phase 3 for the next unit
2. Continue until all acceptance criteria are met

### Phase 7: Finalize
1. Run the full test suite: `[TEST_COMMAND]`
2. Run the linter: `[LINT_COMMAND]`
3. Summarize what was implemented and any remaining TODOs
