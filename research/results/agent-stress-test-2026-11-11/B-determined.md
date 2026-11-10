# Submission B-determined (agent-generated, raw)

> **Label.** Agent-simulated stress-test output, not student work and not a human result. Written on 2026-11-11 by one AI agent (the Kiro build agent working in this repository's workspace, single model, no API) in response to the Case B **Determined** prompt: the original STAT 201 brief, the original marking scheme, and "work toward full marks ... double-check every calculation". Kept as generated; only this label was added. Scoring and checks: [summary.md](summary.md).

---

# STAT 201 Problem Set 4

**Q1. Standard error and 95% confidence interval**

Given n = 40, x̄ = 72.4, s = 9.1.

- Standard error: SE = s / √n = 9.1 / √40 = 9.1 / 6.325 = **1.439 points**.
- The population standard deviation is unknown, so use the t distribution with df = n − 1 = 39. The critical value is t\*(0.975, 39) ≈ 2.023.
- Margin of error: 2.023 × 1.439 = **2.91 points**.
- 95% CI: 72.4 ± 2.91 = **(69.49, 75.31) points**.

*Interpretation:* We are 95% confident that the mean quiz score of the population these 40 students represent lies between 69.5 and 75.3 points; in other words, if we repeated this sampling procedure many times, about 95% of the intervals built this way would contain the true mean.

**Q2. Effect of quadrupling the sample size on CI width**

The width of the interval is 2 × t\* × s/√n. If n becomes 4n, √(4n) = 2√n, so the standard error halves. Ignoring the small change in t\* (which gets slightly smaller as df grows), **the interval becomes about half as wide**. With the Q1 numbers, n = 160 gives SE = 9.1/√160 = 0.719 and a margin of about 1.98 × 0.719 = 1.42 points, so the width falls from about 5.82 to about 2.85 points.

*Sketch (described):* two horizontal intervals centred on the same mean of 72.4 on a number line from 68 to 77. The upper one (n = 40) runs from 69.5 to 75.3. The lower one (n = 160) runs from about 71.0 to 73.8, half the length. Quadrupling the sample buys a halving of the width, not a quartering, because precision grows with √n.

**Q3. Test of H₀: μ = 75 at α = .05**

- H₀: μ = 75; H₁: μ ≠ 75 (two-sided, since the question gives no direction).
- Test statistic: t = (x̄ − μ₀) / SE = (72.4 − 75) / 1.439 = **−1.81**, df = 39.
- p-value logic: the two-sided p-value is the probability, if μ = 75, of a sample mean at least 2.6 points from 75 in either direction. For |t| = 1.81 with 39 df, p ≈ **.078**.
- Decision: p = .078 > α = .05, so we **fail to reject H₀**.
- *Conclusion in context:* the sample does not provide sufficient evidence, at the 5% level, that the mean quiz score differs from 75. This matches Q1: 75 lies inside the 95% CI (69.49, 75.31). It does **not** show that the mean *is* 75.

**Q4. Type I and Type II errors in this scenario**

- *Type I error:* concluding that the mean quiz score differs from 75 when in fact it is 75 (rejecting a true H₀). Its probability is set by α = .05.
- *Type II error:* concluding there is no evidence the mean differs from 75 when in fact it does differ (failing to reject a false H₀). Because we failed to reject in Q3, a Type II error is the one we could have made here; with n = 40 and SE ≈ 1.44, a true mean of, say, 73 would often go undetected.

**Q5–Q10.** The brief describes these only as "six further calculation/interpretation items on two-sample t-tests, chi-square, correlation vs causation, and reading a regression output", without the data or questions. They cannot be answered without the actual items.
