# Verification Protocol — Fresh Per Section

Every section must pass all three checks **fresh** after implementation.
Do not skip checks. Do not rely on a previous section's verification.

## Error Classification Reference

When a check fails, classify the error using one of these codes:

| Code | Meaning | Typical cause |
|------|---------|---------------|
| `TS_TYPE_ERROR` | TypeScript type mismatch | Missing prop, wrong type, undefined property |
| `IMPORT_ERROR` | Module import failure | Missing dependency, wrong path, circular import |
| `PLUGIN_ERROR` | Vite/Tailwind plugin failure | Config issue, incompatible plugin version |
| `SYNTAX_ERROR` | JavaScript/JSX syntax error | Unclosed bracket, invalid JSX, missing return |
| `RUNTIME_ERROR` | Runtime exception in browser | Null reference, hook violation, missing context |
| `HOOK_ERROR` | React hook rules violation | Conditional hook, hook in loop, wrong component |
| `IMPORT_MISSING` | Component not found at runtime | Forgot to export, wrong import path |
| `DEP_WARNING` | Missing dependency warning | useEffect dependency array incomplete |
| `RENDER_ERROR` | Component fails to render | Missing required prop, invalid children |

Always log failures with: `Check N FAILED: [CODE] in [file:line] — [message]`

---

## Check 1: Build Succeeds

Run a production build from the project root:

```bash
cd <project_path>
npm run build
```

**Pass criteria:**
- Exit code 0
- No TypeScript errors
- No Vite build errors
- Output shows bundle size summary

**If it fails:**
- Read the error output and identify the **specific file and line** causing the error
- Classify the failure: `TS_TYPE_ERROR` | `IMPORT_ERROR` | `PLUGIN_ERROR` | `SYNTAX_ERROR`
- Log to progress.md: `Check 1 FAILED: [classification] in [file:line] — [message]`
- Fix the source file at the identified location
- Re-run `npm run build` until it succeeds (max 5 attempts per section)
- If 5 attempts fail, log the unresolved error to `progress.md` with classification and file:line
- Use `vscode_askQuestions` to ask the user: "Check 1 has failed 5 times for section N. Error: [classification] in [file:line]. How would you like to proceed? (1) I'll fix it manually, (2) Skip this section, (3) Abort BUILD"
- Do NOT proceed to Check 2 until this passes

---

## Check 2: No Console Errors

With the dev server running (`npm run dev`), check for errors:

```bash
# Verify dev server is running
lsof -i :5173 | grep LISTEN
```

Check the terminal where `npm run dev` is running:
- No red error messages
- No unhandled runtime exceptions
- No React error boundaries triggered
- Warnings about unused variables are acceptable; warnings about missing
  dependencies, invalid hooks, or TypeScript errors are NOT acceptable

**If errors appear:**
- Identify the **specific component and error type**: `RUNTIME_ERROR` | `HOOK_ERROR` | `IMPORT_MISSING` | `DEP_WARNING`
- Log to progress.md: `Check 2 FAILED: [type] in [component] — [message]`
- Fix the issue in the source
- Vite HMR will reload — check the terminal again
- Do NOT proceed to Check 3 until the console is clean

---

## Check 3: Component Renders

Confirm the section is visible and functional in the browser:

1. Open `http://localhost:5173` in the browser
2. Scroll to the newly implemented section
3. Verify:
   - The section heading and content are visible
   - Layout matches the wireframe intent (structure, not pixel-perfect)
   - Interactive elements respond to user input (clicks, hovers, sliders, etc.)
   - Transitions to/from adjacent sections are smooth
   - No blank areas, missing images, or broken layouts

**If the section does not render:**
- Check the browser console (F12 → Console tab) for runtime errors
- Verify the component is imported and rendered in `App.tsx`
- Verify all imports within the component resolve correctly
- Fix and re-check

---

## Full Verification Sequence (copy-paste ready)

```bash
# 1. Build check
cd <project_path> && npm run build

# 2. Dev server check
lsof -i :5173 | grep LISTEN || (cd <project_path> && npm run dev &)

# 3. Render check — open in browser
echo "Open http://localhost:5173 and verify the section renders correctly"
```

---

## When to Run This Protocol

| Event | Run verification? |
|-------|-------------------|
| After implementing a new section | Yes — all 3 checks |
| After fixing a failed check | Yes — restart from Check 1 |
| After human requests changes (calibration) | Yes — all 3 checks |
| After re-entering a session | Yes — Check 1 only (sanity) |
| Before marking a section as `passes: true` | Must have passed all 3 |

---

## Important Notes

- **Fresh means fresh.** Each section gets its own full verification run.
  A passing build from section 2 does not guarantee section 3 didn't break it.
- **Earlier sections can break.** If a later section's code changes shared
  styles, layouts, or imports, earlier sections may regress. When in doubt,
  scroll through all completed sections during Check 3.
- **Do not skip Check 3.** Automated checks (1 and 2) catch syntax and build
  errors. Only a visual check catches layout regressions, missing interactivity,
  and design drift.
