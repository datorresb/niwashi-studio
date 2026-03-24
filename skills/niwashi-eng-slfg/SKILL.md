---
name: niwashi-eng-slfg
description: "Swarm-enabled full engineering workflow — storm landscaping with parallel agents for maximum throughput. Use when the user wants fast end-to-end feature delivery with parallel execution. Triggers on 'slfg', 'swarm mode', 'fast ship', or any request for parallelized full pipeline."
disable-model-invocation: true
---

# 嵐の造園 (Arashi no Zouen) — Storm Landscaping

> *When a storm sweeps through the garden, many hands work at once — planting, pruning, watering in parallel. The result is the same beautiful garden, delivered faster.*

Run these steps in order, parallelizing where indicated. Do not stop between steps — complete every step through to the end.

## Sequential Phase

1. **Optional:** If a `ralph-loop` skill is available, run it first. If not available or it fails, skip and continue to step 2 immediately.

2. **📐 庭図 (Niwazu) — Draw the Blueprint**
   `/niwashi-eng-03-plan $ARGUMENTS`

3. **🌳 深掘り (Fukabori) — Deepen the Roots** (Conditional)
   `/niwashi-eng-04-deepen`

   Run the deepen workflow only if the plan is `Standard` or `Deep`, touches a high-risk area (auth, security, payments, migrations, external APIs, significant rollout concerns), or still has obvious confidence gaps in decisions, sequencing, system-wide impact, risks, or verification.

   If you run the deepen workflow, confirm the plan was deepened or explicitly judged sufficiently grounded before moving on. If you skip it, note why and continue to step 4.

4. **🌿 植栽 (Shokusai) — Plant with Intention (Swarm Mode)**
   `/niwashi-eng-05-work` — **Use swarm mode**: Make a Task list and launch an army of agent swarm subagents to build the plan.

## Parallel Phase

After work completes, launch steps 5 and 6 as **parallel swarm agents** (both only need code to be written):

5. **✂️ 剪定 (Sentei) — Prune** — spawn as background Task agent
   `/niwashi-eng-06-review`

6. **水やり (Mizuyari) — Water** — spawn as background Task agent
   `/niwashi-eng-test`

Wait for both to complete before continuing.

## Finalize Phase

7. **草取り (Kusatori) — Weed the Garden**
   `/niwashi-eng-weed` — resolve findings, compound on learnings, clean up completed todos.

8. **庭見 (Niwami) — Guided Garden Tour**
   `/niwashi-eng-showcase` — record the final walkthrough and add to PR.

9. Output `<promise>DONE</promise>` when video is in PR.

Start with step 1 now.
