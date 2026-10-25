---
title: Literature notes
nav_order: 1
parent: Research
has_toc: false
---

# Literature notes

Everything cited below was checked against the source on **2026-10-25** unless marked otherwise. Access method and status are recorded per source. Where a source could not be fetched directly (publisher bot-blocks), that is stated, and the claim rests only on what the publisher's own index shows. Sources that could not be verified at all are removed or marked **UNVERIFIED**.

## 1. Assessment fundamentals

### Constructive alignment — Biggs

Biggs, J. & Tang, C., *Teaching for Quality Learning at University* (Open University Press; multiple editions). Constructive alignment: intended learning outcomes, teaching/learning activities and assessment tasks must point at the same capabilities; assessment drives what students actually do. [Book citation; publisher page not fetched — foundational textbook, statement uncontroversial.]

### Validity, and assessment for vs. of learning

- The working question for this kit: **"Does this task show the learning we claim it shows?"** If an AI tool can produce a passing product without the target learning, the evidence the task yields is no longer valid — not because students "cheated", but because the task no longer measures what it claims (see stress-test rationale, §2).
- Assessment **of** learning (assurance of individual achievement) vs. **for** and **as** learning (building capability). The University of Sydney two-lane approach operationalises this distinction institutionally (below, §2).
- TEQSA's assessment-reform advice uses the same distinction and proposes reform principles for AI-era assessment: Lodge, J. et al., *Assessment Reform for the Age of Artificial Intelligence*, TEQSA discussion paper, September 2023 — <https://www.teqsa.gov.au/guides-resources/resources/corporate-publications/assessment-reform-age-artificial-intelligence> (search-index verified 2026-10-25; the PDF fetch timed out, so exact principle wording was not quoted from the source).

## 2. AI-use level frameworks

### AI Assessment Scale (AIAS) — Perkins, Furze, Roe & MacVaugh

- **Original article (verified, fetched 2026-10-25):** Perkins, M., Furze, L., Roe, J., & MacVaugh, J. (2024). "The Artificial Intelligence Assessment Scale (AIAS): A Framework for Ethical Integration of Generative AI in Educational Assessment." *Journal of University Teaching and Learning Practice*, 21(06). <https://doi.org/10.53761/q3azde36>
- **Latest version (verified, fetched 2026-10-25):** the scale's official resource site <https://aiassessmentscale.com> lists **AIAS 2.1** as the current revision (first published 2023, revised through Version 2 and 2.1). AIAS 2.1's stated change is "one clear statement per level"; the level structure is unchanged.
- **The five levels, exact names (verified verbatim from aiassessmentscale.com, 2026-10-25):**

| Level | Exact name |
|---|---|
| 1 | **No AI** |
| 2 | **AI Planning** |
| 3 | **AI Collaboration** |
| 4 | **Full AI** |
| 5 | **AI Exploration** |

- A 2025 JUTLP article "Reimagining the AIAS" (<https://doi.org/10.53761/rrm4y757>) is cited on the official site as the revised model's publication. DOI resolved via the site's own citation list; article page not fetched — cite the site for the current level names.
- This kit uses AIAS 2.1 level names on every student-facing brief ([ai-use-levels](../ai-use-levels.html)). Icons are always paired with text labels.

### Two-lane approach — University of Sydney

- **Original post (verified, fetched 2026-10-25):** Liu, D. & Bridgeman, A. (2023, 12 July). "What to do about assessments if we can't out-design or out-run AI?" *Teaching@Sydney*. <https://educational-innovation.sydney.edu.au/teaching@sydney/what-to-do-about-assessments-if-we-cant-out-design-or-out-run-ai/>
  - Lane 1 = secured assessment **of** learning (in-class, viva, live simulation) to assure outcomes.
  - Lane 2 = open assessment **as/for** learning where AI use is assumed, scaffolded, and the documented process can carry more weight than the artefact.
  - The post explicitly recommends testing assignment prompts against AI tools, and avoiding detection software (unreliability; bias against non-native English writers).
- Implementation follow-up (verified, fetched 2026-10-25): Bridgeman, A., Weeks, R. & Liu, D. (2024, 26 November). "Aligning our assessments to the age of generative AI." *Teaching@Sydney*. <https://educational-innovation.sydney.edu.au/teaching@sydney/aligning-our-assessments-to-the-age-of-generative-ai/> — new assessment principles (Nov 2023) embedded the two lanes in the university's Coursework Policy.
- This kit applies the two lanes at task level: each redesign designates a secure lane (a few weighted checks) and an open lane (practice and process work).

### National guidance

- TEQSA (Australia) advice cited above. QAA (UK) guidance exists but was not verified during this build and is therefore not cited in these notes. (UNVERIFIED — deliberately not used.)

## 3. Why not detection

All three primary sources below were fetched on 2026-10-25.

1. **Accuracy is poor and unreliable.** Weber-Wulff, D., Anohina-Naumeca, A., Bjelobaba, S., Foltýnek, T., Guerrero-Dib, J., Popoola, O., Šigut, P., & Waddington, L. (2023). "Testing of detection tools for AI-generated text." *International Journal for Educational Integrity*, 19, 26. <https://doi.org/10.1007/s40979-023-00146-z>
   - 14 tools tested (incl. Turnitin); none above 80% accuracy; more-obfuscated text and machine-translated text sharply degrade accuracy (~50% misattribution; ~20-point accuracy drop on machine-translated English).
   - Conclusion quoted from the abstract: tools "should not be used in academic settings" as sole evidence of misconduct.
2. **Bias against non-native English writers.** Liang, W., Yuksekgonul, M., Mao, Y., Wu, E., & Zou, J. (2023). "GPT detectors are biased against non-native English writers." *Patterns*, 4(7), 100779. <https://doi.org/10.1016/j.patter.2023.100779> (DOI resolution to the *Patterns* article PII S2666389923001307 verified 2026-10-25; arXiv version fetched and verified: <https://arxiv.org/abs/2304.02819>)
   - Detectors "consistently misclassify non-native English writing samples as AI-generated" (abstract, verified) while classifying native-English essays accurately; the authors caution against detector use in evaluative or educational settings. (The commonly cited ≈61% false-positive figure on TOEFL essays appears in the full text; the arXiv abstract page fetched here states the qualitative finding — the number is therefore reported as "over half" only in secondary summaries and not asserted from the fetched primary text.)
3. **Detector vendors themselves concede it.** OpenAI's AI Classifier was launched 31 January 2023 and withdrawn on 20 July 2023: "As of July 20, 2023, the AI classifier is no longer available due to its low rate of accuracy" (notice quoted in the publisher's page, verified via search index 2026-10-25: <https://openai.com/index/new-ai-classifier-for-indicating-ai-written-text/>).
4. **Detection is also not a design strategy:** it asks nothing of learning design, invites adversarial games, and mis-targets the students most at risk of unfair accusations (Liang et al., above). This kit designs assessment so that AI use is *explicit and levelled* rather than policed. Practical corollary from Liu & Bridgeman (2023): assume unsecured work involves AI and design accordingly.

## 4. Process-based assessment

- Evidence base for staged drafts, annotated bibliographies, process logs and short oral checks ("viva-vee"): these are standard process-assessment moves, and the Sydney two-lane work and TEQSA advice both recommend interactive oral formats for the secure lane. Ratings in [approaches](../approaches.html) are labelled **strong / emerging / anecdotal** with this caveat: strong = multiple independent studies or institutional adoptions; emerging = single-site studies or documented pilots; anecdotal = practitioner reports. No new meta-analysis was performed for this kit.
- Oral-assessment revival context: Liu & Bridgeman (2023) and Bridgeman, Weeks & Liu (2024) document institutional adoption of interactive orals as the secure lane at scale.

## 5. Equity and accessibility

- **Detection bias** against non-native English writers: Liang et al. (2023) and Weber-Wulff et al. (2023) — see §3. Any approach that invites accusations disproportionately harms multilingual students.
- **Oral assessment and anxiety / accommodations:** interactive orals can disadvantage students with communication disabilities or high anxiety unless a written or asynchronous alternative is built in from the start. This kit's faculty notes require an alternative format in every case with an oral component (case A, B and C faculty notes).
- **Workload at scale:** redesigns that cost more grading time than the original will not be adopted; every case's faculty-notes page includes a time estimate and a 200+ student scaling plan (TA rubrics, sampled orals, cohort-level data collection).
- **Digital access:** AI-use levels must not assume paid subscriptions. Every student brief states which level can be met with free-tier tools, and Full AI levels are only set where lack of access does not affect the mark (case-by-case notes).

## 6. Context sources (2026)

All dated 2026-10-25.

1. Alalwani, S. (2026). "Faculty perceptions of ChatGPT on academic integrity and institutional roles in higher education." *Scientific Reports*, 16, 27532. <https://doi.org/10.1038/s41598-026-63852-x> — verified via the publisher's citation metadata (title, author, volume, DOI). Faculty in administrative roles ask for clearer guidelines on AI in assessment and integrity procedures.
2. Balart, T., Raju, G. & Shryock, K. (2026). "Examining Generative AI Disruption: A Repeated Cross-Sectional Study of Faculty and Staff Sensemaking in Higher Education." *Algorithms*, 19(8), 703. <https://doi.org/10.3390/a19080703> — MDPI's site blocks automated fetching (HTTP 403); details verified via the publisher's search-index record. Faculty discourse is shifting from containment toward selective integration.
3. Carvajal, H. et al. (2026). "Artificial Intelligence and Academic Integrity in Virtual Higher Education." *Trends in Higher Education*, 5(3), 67. <https://www.mdpi.com/2813-4346/5/3/67> — MDPI fetch blocked (403); title (truncated in the publisher index) and author verified via the publisher's search-index record; no DOI asserted. Students frame AI as academic support; faculty frame it as authorship/integrity risk.
4. Sangwa, S. (2026). "The EPIQ-AI Framework for Epistemic Integrity." Preprint, <https://www.preprints.org/manuscript/202604.0310> — site blocks automated fetching (403); title/author verified via search index only. **Note:** the plan that briefed this repo described this preprint as "faculty readiness" evidence; the indexed title under that ID is the EPIQ-AI framework paper. The plan's characterisation is recorded here as **UNVERIFIED** and this kit does not rest any claim on it.
5. Teamed, *L&D Skills Landscape 2026* and other cross-portfolio context sources are listed in the portfolio overview, not relied on in this repo.

## 7. What these notes are for

These notes feed the [six design principles](../principles.html) and the [approach comparison](../approaches.html). They are the research layer only — the design decisions and their reasoning live in the docs.
