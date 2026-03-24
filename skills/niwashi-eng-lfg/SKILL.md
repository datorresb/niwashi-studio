---
name: niwashi-eng-lfg
description: "Full autonomous engineering workflow — complete landscaping from blueprint to garden tour. Use when the user wants end-to-end feature delivery: plan, build, review, test, document, and ship. Triggers on 'ship this', 'build end-to-end', 'lfg', 'let's go', or any request for a full feature pipeline."
disable-model-invocation: true
---

# 造園 (Zouen) — Complete Landscaping

> *A master gardener works through every phase: blueprint, planting, pruning, composting, and finally inviting visitors to admire the garden.*

CRITICAL: You MUST execute every step below IN ORDER. Do NOT skip any required step. Do NOT jump ahead to coding or implementation. The plan phase (step 2, and step 3 when warranted) MUST be completed and verified BEFORE any work begins.

## Sequential Pipeline

1. **Optional:** If a `ralph-loop` skill is available, run it first. If not available or it fails, skip and continue to step 2 immediately.

2. **📐 庭図 (Niwazu) — Draw the Blueprint**
   `/niwashi-eng-03-plan $ARGUMENTS`

   GATE: STOP. Verify that the plan workflow produced a plan file in `docs/plans/`. If no plan file was created, run `/niwashi-eng-03-plan $ARGUMENTS` again. Do NOT proceed until a written plan exists on disk.

3. **🌳 深掘り (Fukabori) — Deepen the Roots** (Conditional)
   `/niwashi-eng-04-deepen`

   Run the deepen workflow only if the plan is `Standard` or `Deep`, touches a high-risk area (auth, security, payments, migrations, external APIs, significant rollout concerns), or still has obvious confidence gaps in decisions, sequencing, system-wide impact, risks, or verification.

   GATE: STOP. If you ran the deepen workflow, confirm the plan was deepened or explicitly judged sufficiently grounded. If you skipped it, briefly note why and proceed to step 4.

4. **🌿 植栽 (Shokusai) — Plant with Intention**
   `/niwashi-eng-05-work`

   GATE: STOP. Verify that implementation work was performed — files were created or modified beyond the plan. Do NOT proceed to step 5 if no code changes were made.

5. **✂️ 剪定 (Sentei) — Prune for Perfection**
   `/niwashi-eng-06-review`

6. **草取り (Kusatori) — Weed the Garden**
   `/niwashi-eng-weed`

7. **水やり (Mizuyari) — Water the Garden**
   `/niwashi-eng-test`

8. **庭見 (Niwami) — Guided Garden Tour**
   `/niwashi-eng-showcase`

9. Output `<promise>DONE</promise>` when video is in PR.

Start with step 2 now (or step 1 if ralph-loop is available). Remember: blueprint FIRST, then plant. Never skip the plan.
