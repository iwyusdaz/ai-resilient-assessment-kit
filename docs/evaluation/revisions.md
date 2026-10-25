---
title: Revisions log
nav_order: 11
---

# Revisions log

Every documented evaluation (agent review, educator review, simulated-participant pipeline, real workshop delivery) lands its accepted and rejected changes here. Empty until the first review completes — **no invented feedback**, per the kit's honesty rules.

## How entries are made

| Field | Meaning |
|---|---|
| Source | Which evaluation produced it ("Agent review, fresh-context reviewer, 2026-xx-xx" / "Educator #2, statistics lecturer" / "Simulated participant P4") |
| Finding | What the reviewer said, in one or two sentences |
| Change | What changed in the repo (file + substance), or **Rejected** with the reason |

## Pending entries

| # | Source | Finding | Change |
|---|---|---|---|
| — | *Agent review (fresh-context reviewer agent)* | *Scheduled after the build completes; findings recorded here.* | — |
| — | *Multi-model review panel* | **PENDING: requires API key** (`evaluation/run-review-panel.mjs`) | — |
| — | *AI-simulated workshop participants* | **PENDING: requires API key** (`evaluation/run-simulated-participants.mjs`) | — |
| — | *Educator review (≥3 human educators)* | **Not yet recruited** — form ready in [`evaluation/human-protocol/`](https://github.com/iwyusdaz/ai-resilient-assessment-kit/tree/main/evaluation/human-protocol) | — |

## Known gaps already on the list

1. The workshop agenda's timing (90 minutes) has **not** been validated by delivery — the facilitator guide's timings are estimates; the simulated-participant pipeline is designed to stress them.
2. The stress-test score tables are pending the API run; the vulnerability analyses are reasoning, and will be revised against measured results if the data disagrees.
