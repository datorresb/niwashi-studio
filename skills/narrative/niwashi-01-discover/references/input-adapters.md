# Input Adapters — How DISCOVER Handles Each Input Type

The DISCOVER phase must handle 4 input types. Each requires a different preparation strategy before the Socratic dialogue begins.

## Type 1: Repository / Codebase (`repo`)

**Signals:** User points to a directory, mentions "this codebase", "this repo", provides file paths, or says "explain how this system works."

**Preparation:**
1. Use `list_dir` on the root and key subdirectories to understand the project structure.
2. Use `file_search` to find entry points — `main.*`, `app.*`, `index.*`, `README.*`.
3. Read the README if it exists — it often contains the best high-level summary.
4. Use `semantic_search` to find the specific subsystem or concept the user mentioned.
5. Read 2–3 key files to understand the core mechanism.

**What to summarize for the user:**
- What the system does (one sentence)
- The major components or subsystems you identified
- Which part you think is most relevant to the user's request

**Pitfalls:**
- Don't try to read the entire codebase. Focus on what's relevant to the user's stated concept.
- If the codebase is large and the user hasn't narrowed the scope, ask them to point you to the relevant area before reading everything.
- Don't confuse implementation details with the concept to be explained. The narrative might explain the *idea* behind the code, not the code itself.

## Type 2: Abstract Concept (`concept`)

**Signals:** User names an algorithm, technique, mathematical concept, design pattern, or abstract idea without pointing to specific files.

**Preparation:**
1. Verify you understand the concept correctly — state your understanding in one sentence and ask the user to confirm.
2. If the concept has multiple interpretations or variants, surface them and ask which one. Use `vscode_askQuestions` with options derived from the known variants.
3. Check the workspace for any existing code or docs related to the concept using `semantic_search`. The user might have an implementation you should be aware of.

**What to summarize for the user:**
- Your one-sentence understanding of the concept
- Whether you found any related material in the workspace
- Any known variants or interpretations you want to disambiguate

**Pitfalls:**
- Don't assume you know the concept better than the user. They may have a specific framing in mind that differs from the textbook definition.
- Don't start researching the concept deeply — that's the RESEARCH phase. You just need to understand it well enough to ask good questions about audience and scope.

## Type 3: Documentation (`docs`)

**Signals:** User points to markdown files, wiki pages, README files, technical docs, or URLs. May say "turn this doc into something interactive" or "make this explainer better."

**Preparation:**
1. Read the documentation files the user pointed to. If multiple files, read in logical order (README first, then referenced docs).
2. Identify the core concept being documented.
3. Note the existing audience assumptions (who does the doc seem to be written for?).
4. Note weaknesses — is it too dense? Missing visuals? Assumes too much knowledge? Poorly structured?

**What to summarize for the user:**
- The core concept you identified in the docs
- Who the docs currently seem to target
- What you think could be improved through an interactive narrative (but frame this as a question, not a judgment)

**Pitfalls:**
- Don't assume the narrative should cover everything in the docs. The user might want to focus on one section.
- Don't criticize the existing docs — focus on what the interactive narrative can add.
- The docs are source material, not the narrative itself. The narrative may restructure, simplify, or reframe the content.

## Type 4: Jupyter Notebook (`notebook`)

**Signals:** User points to a `.ipynb` file or mentions a notebook.

**Preparation:**
1. Read the notebook structure — cell types, section headers, what the code does.
2. Identify the core concept or analysis the notebook demonstrates.
3. Note the narrative thread (if any) — does the notebook tell a story, or is it a grab-bag of explorations?
4. Identify the most interesting or insightful outputs (visualizations, results, surprising findings).

**What to summarize for the user:**
- The core concept or analysis in the notebook
- The strongest "story" you can find in the notebook's progression
- Which outputs or results seem most compelling for a narrative

**Pitfalls:**
- Notebooks are often messy — dead code, failed experiments, out-of-order cells. Don't try to explain the notebook; identify the *concept* worth narrating.
- The notebook's code won't become the narrative's code. The narrative will be a fresh React app that explains the same concept differently.
- If the notebook covers multiple unrelated analyses, ask the user which one to focus on.

## Mixed Inputs

Users may provide a combination — "here's our optimizer (points to code) and here's the doc that explains it (points to markdown)." Handle this by:
1. Reading both sources
2. Noting where they agree and where they diverge
3. Summarizing what you found from each source
4. Asking the user which source is the authority and which is supplementary

## No Input

If the user arrives with nothing specific — "I want to create a narrative but I'm not sure about what" — switch to exploration mode:
1. Ask about their domain or project area
2. If they have a workspace open, use `list_dir` and `semantic_search` to explore what's there
3. Identify 2–3 concepts that could make interesting narratives
4. Present them via `vscode_askQuestions` and let the user pick
