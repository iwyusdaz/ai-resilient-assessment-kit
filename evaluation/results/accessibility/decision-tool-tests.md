# Decision tool — scripted task tests

Target: http://127.0.0.1:54769/decision-tool/index.html
Date: 2026-10-25T19:12:24.466Z

| # | Check | Result |
|---|---|---|
| 1 | T1: one h1 | PASS |
| 2 | T1: six fieldsets with legends | PASS |
| 3 | T1: all radios inside labeled groups | PASS — 19/19 radios |
| 4 | T2: first radio reachable by keyboard | PASS |
| 5 | T2: results render after answering all | PASS |
| 6 | T3: focus moves to results heading | PASS |
| 7 | T3: results heading has tabindex=-1 | PASS |
| 8 | T4: live region polite | PASS |
| 9 | T4: live region populated | PASS — Results ready: 3 recommended approaches shown below. |
| 10 | T5: every result card explains why | PASS — 3/3 |
| 11 | T6: Back clears one answer | PASS — 5 checked after back |
| 12 | T6: focus returns to a radio after Back | PASS |
| 13 | T7: Start over clears all | PASS |
| 14 | T7: results hidden after restart | PASS |
| 15 | T8: incomplete submit shows error | PASS |
| 16 | T8: error announced (role=alert) | PASS |
| 17 | T9: no horizontal scroll at 320px | PASS — scrollWidth=320 |
| 18 | T10: usable at 256px (beyond 400% on 1024 base) | PASS — scrollWidth=256 |
| 19 | T10: submit button tappable at 256px | PASS |
| 20 | T11: no data sent anywhere while using the tool | PASS — 0 non-local requests |

**20/20 passed.**
