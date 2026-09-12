# VowFare

A three-screen interactive mock-up for VowFare — a platform where couples set a budget for each wedding vendor category, see who fits it, and book direct.

**Live prototype:** https://kenziemw.github.io/Vow-Fare-Makenzie-Whitman/

---

## 1. Need, persona, capability, value

**Need:** Couples don't know what wedding vendors actually cost until they've emailed several and waited days for replies, making it hard to know what's affordable before they get attached to an option.

**Persona:** A newly engaged couple, 4–8 months from their wedding date, planning in evenings and weekends around full-time jobs, who hasn't locked in a venue yet.

**Capability:** See and compare vendors in a specific category that fit a budget you set.

**Fundamental value:** Certainty — knowing what you can actually afford before you spend time or get emotionally attached to an option.

## 2. The three screens

| Screen | Job | Why it earned a slot | Design question it answers |
|---|---|---|---|
| **1. Landing** | Signal the core value and primary capability in five seconds | It's the first-read test — if the value isn't clear before reading body copy, nothing else on the site matters | Does the page communicate "set a budget, see vendors that fit it, book direct" before the visitor reads anything? |
| **2. Budget → Matches** | Show the couple setting a budget (and guest count, where relevant) for one category and seeing real vendors filtered against it | This is the mechanism behind the promise — without seeing it work, "certainty" is just a headline | Do the vendor cards read as "matches for my number" through grouping, or as a generic directory? |
| **3. Vendor profile** | Show the payoff: a transparent price breakdown and a direct "request to book" action | Demonstrates "book direct" — the moment the multi-platform, back-and-forth pain actually goes away | Does the pricing information read as settled and clear, or does it look like more negotiation is still needed? |

## 3. Design question plan

At least one question per group, worded as I'd actually say it to my persona, with a prediction tied to a specific part of the prototype.

| Group | Question (as I'd say it) | Prediction | What it rests on |
|---|---|---|---|
| **Need** | "Tell me about the last time you looked into vendors for something like this — what did you end up doing?" | Most will describe emailing several vendors and waiting on quotes, or relying on Instagram/word-of-mouth recommendations. | Whether Screen 2's instant, upfront pricing reads as solving that exact wait, or just as another list to browse. |
| **Value** | "If you could know upfront exactly what you could afford before reaching out to anyone, what would that be worth to you — in a word or two?" | "Peace of mind" or "confidence" — validating certainty as the value, not "convenience" or "speed." | Whether the budget slider on Screen 2 makes that upfront knowledge feel real and immediate, rather than gimmicky. |
| **Persona** | "How far out are you from your wedding, and how are you splitting up the planning right now?" | Most will be 4–9 months out, doing this in scattered evenings between other commitments. | Whether the "no back-and-forth" framing on the landing screen resonates with someone short on time, versus someone with time to spare. |
| **Capability** | "I'm going to show you this screen for five seconds." (Hide Screen 2.) "What does this let you do?" | People will say "see vendors in my price range" without mentioning booking — meaning the "request to book" action may need more visual weight on Screen 3, since it wasn't visible in a five-second glance. | Whether the primary capability (comparing by budget) reads faster than the secondary payoff (booking), which is the intended hierarchy — but worth confirming it doesn't undersell booking entirely. |

## 4. Design justification and first read

Opening the live URL fresh:

- **Does the landing screen signal the capability and value before reading?** Mostly yes — one headline, one subhead, one primary button ("Set your budget"). The category grid below it is a secondary entry point into the *same* capability, not a competing one, so it supports rather than dilutes the primary job.
- **Does everything on the landing screen earn its place?** Yes, with one caveat: the category grid is the only thing that could arguably compete for attention with the primary CTA, since it's a full second section. It still points at the same action, so I judged it a support element rather than a distraction — but it's the first thing I'd re-test with users.
- **Grouping and Gestalt principles:** On Screen 2, the guest-count and budget sliders sit inside one bordered panel — **common region** signals "these are the filters, used together." Vendor cards share one visual treatment — **similarity** — so they read as one comparable set. On Screen 3, the price breakdown sits in its own bordered panel, separating "the numbers" from the descriptive text above it, again via common region.
- **Do screens 2 and 3 stay on mission, with a way back everywhere?** Yes. Screen 2 has three paths home: the clickable logo, the breadcrumb, and an explicit "← Back to home" link. Screen 3 has the same logo/breadcrumb plus a "← Back to matches" link.
- **What did the AI get wrong or oversimplify, and what changed?**
  1. Vendor cards were clickable but gave no visual signal that they led anywhere — an interactive card looked identical to a static price line. **Fix:** added a hint line above the list ("Click a vendor to see full pricing and request to book") and a chevron icon on every card, so the affordance is visible instead of assumed.
  2. Out-of-budget vendors were only differentiated by 40% opacity, mixed into the same list as vendors that fit. Opacity alone is a weak, easy-to-miss signal — it's a **similarity/contrast** cue, not a grouping one, and on a quick glance it could just look broken. **Fix:** vendors are now split into two labeled, spatially separate sections — "Fits your budget" and "Outside this budget (n)" — using **common region and proximity** instead of relying on a subtle opacity difference.
- **Which decision motivated each change?** #1 was a signaling/affordance problem — nothing indicated interactivity. #2 was a grouping problem — the "in budget vs. out of budget" distinction needed a stronger Gestalt signal than opacity alone provides.

### Before / after

**Before** — out-of-budget vendors are only faded via opacity, mixed into one continuous list with no separation:

![Before: opacity-only signal](./docs/before.png)

**After** — out-of-budget vendors are grouped into their own labeled section, separated from the vendors that fit:

![After: grouped by common region](./docs/after.png)

"It looks generic" isn't the issue here — the specific problem was that the original list signaled fit only through a low-contrast opacity difference on individual cards, which is easy to miss at a glance and doesn't tell you *how many* vendors are outside your range. Grouping by common region and labeling the count fixes both.
