---
title: Research
nav_order: 10
has_children: true
---

# Research

The evidence layer under the kit's designs: what was checked, how the stress test works, and what its results will (and will not) show.

- **[Literature notes](literature-notes.html)** — every source the kit cites, with access dates and verification status (including the sources that could not be fetched directly).
- **[Stress-test protocol](stress-test-protocol.html)** — the method of record for the pending AI stress test: three prompt strategies × two models, blind cross-judging where no model scores its own output.

The pipelines that execute the protocol live in the repository (not on this site): `research/run-stress-test.mjs` runs the stress test, and `evaluation/METHODS.md` describes every evaluation method, run and pending. Results stay **PENDING** until the pipeline runs with real API keys — no fabricated numbers anywhere.
