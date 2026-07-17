// data.js — Digitweb Lanka / PH-Sales Team onboarding content.
//
// SOURCE-OF-TRUTH STATUS: every Programme, Module, Lesson, Quiz and Question
// below is derived from one of the two authoritative source documents listed
// in SOURCE_DOCUMENTS, and carries a `source` field citing the exact section
// it comes from. Per that authorisation, this content is status FINAL_TRUTH
// — it is NOT labelled DEMO_DATA, CONFIGURATION_REQUIRED, VERIFY, or
// CONTENT_REVIEW_REQUIRED, because it is not placeholder content.
//
// This does NOT change the prototype boundary: everything the *learner does*
// in this browser (lesson completion, quiz attempts/results, simulated
// team-leader sign-off, programme completion) is still generated client-side,
// stored only in this browser's localStorage, and remains PROTOTYPE_ONLY —
// it is not official onboarding evidence. See config.js for the handful of
// values that genuinely are not stated in either source document (quiz
// passing percentage, max attempts) and remain CONFIGURATION_REQUIRED.
//
// PRODUCTION_BLOCKER: both source documents are marked "Confidential
// Internal Document" / "Internal Use Only — Do Not Share Outside the
// Company". This file is loaded into the browser as plain JavaScript and is
// readable via view-source/devtools by anyone with access to the deployed
// app — the same constraint that applies to the quiz correct answers below.

export const SOURCE_DOCUMENTS = [
  {
    id: 'onboarding-guide',
    title: 'Digitweb Lanka New Employee Onboarding Guide',
    version: 'v1.0',
    effectiveDate: 'May 2026',
    confidentiality: 'Internal Use Only — Do Not Share Outside the Company',
  },
  {
    id: 'ph-bgct-handbook',
    title: 'Digitweb Lanka PH / Sales Team BGCT Handbook',
    version: 'v1.0',
    effectiveDate: 'May 2026',
    confidentiality: 'Confidential Internal Document',
  },
];

export const PROGRAMME = {
  id: 'prog-ph-onboarding',
  code: 'TOSP-PH-01',
  title: 'Digitweb Lanka — PH / Sales Team Onboarding & Skill Progression Programme',
  description:
    'The company-wide 7-Day BGCT Evaluation Plan followed by the PH/Sales Team’s ' +
    '11-step Sales Learning Path. Content is sourced directly from the two documents ' +
    'listed in SOURCE_DOCUMENTS and is status FINAL_TRUTH; learner progress, quiz ' +
    'results, sign-offs and completion evidence generated in this browser remain ' +
    'PROTOTYPE_ONLY.',
  version: '1.0',
  status: 'FINAL_TRUTH',
};

// Key thresholds and progression rules that are not tied to one specific
// lesson/question, preserved here with citations per the requirement that
// every threshold or progression rule keep a source reference.
export const PROGRESSION_RULES = [
  {
    id: 'rule-evaluation-period',
    rule: 'The initial evaluation period is 7 days and is unpaid.',
    source: 'Onboarding Guide v1.0 — Field table; Section 1, point 1',
  },
  {
    id: 'rule-probation-period',
    rule: 'Employees promoted from evaluation enter a 3-month probation period.',
    source: 'Onboarding Guide v1.0 — Field table; Section 5',
  },
  {
    id: 'rule-trainer-tool',
    rule: 'Claude (claude.ai), loaded with Digitweb’s BGCT knowledge base, is the trainer for the evaluation and probation period.',
    source: 'Onboarding Guide v1.0 — Section 1, point 2; Field table',
  },
  {
    id: 'rule-ph-11-steps-in-order',
    rule: 'PH team members must complete all 11 Sales Learning Path steps in order before independently managing ASINs. Competency must be demonstrated at each stage before progression.',
    source: 'PH/Sales BGCT Handbook v1.0 — Section 1, Best Practice',
  },
  {
    id: 'rule-ph-asin-ownership-gate',
    rule: 'No staff member should be assigned ASIN ownership before completing Steps 1–6 (minimum).',
    source: 'PH/Sales BGCT Handbook v1.0 — Section 1, progression model note',
  },
  {
    id: 'rule-ph-signoff',
    rule: 'Each PH Learning Path step must be verified by team leader sign-off before the staff member progresses.',
    source: 'PH/Sales BGCT Handbook v1.0 — Section 1, Checklist',
  },
  {
    id: 'rule-ph-escalation',
    rule: 'A PH team member must escalate to their team leader if stuck on a learning step for more than one working day.',
    source: 'PH/Sales BGCT Handbook v1.0 — Section 1, Guidance',
  },
  {
    id: 'rule-ph-weekly-pace',
    rule: 'The expected daily learning pace for the PH Sales Learning Path is a minimum of one step per working week, reviewed and signed off by the team leader at the end of each step.',
    source: 'PH/Sales BGCT Handbook v1.0 — Section 1, Tutorial',
  },
  {
    id: 'rule-core-knowledge',
    rule: 'If it is not written in the BGCT or current appendix, it does not exist as company knowledge.',
    source: 'Onboarding Guide v1.0 — Section 1, "The Core Company Rule"; PH/Sales BGCT Handbook v1.0 — cover statement',
  },
];

export const EVALUATION_SCORE_BANDS = [
  { range: '90 – 100', interpretation: 'Exceptional. Strong recommendation to promote to probation. Fast-track consideration.' },
  { range: '75 – 89', interpretation: 'Good. Recommended to promote to probation with minor gap follow-up.' },
  { range: '60 – 74', interpretation: 'Satisfactory. May be promoted to probation with a formal gap closure plan.' },
  { range: '45 – 59', interpretation: 'Needs Improvement. Extension of evaluation period recommended before probation.' },
  { range: 'Below 45', interpretation: 'Not recommended for probation at this time. Significant gaps identified.' },
];
export const EVALUATION_SCORE_BANDS_SOURCE = 'Onboarding Guide v1.0 — Section 4, "Evaluation Score Interpretation"';

export const PROBATION_SCORE_GATES = [
  { period: 'End of Month 1', minimumScore: 65 },
  { period: 'End of Month 2', minimumScore: 72 },
  { period: 'End of Month 3', minimumScore: 80 },
];
export const PROBATION_SCORE_GATES_SOURCE = 'Onboarding Guide v1.0 — Section 5, "Probation Progression Score Gates"';

const lesson = (id, moduleId, orderIndex, title, content, estimatedMinutes, source) => ({
  id,
  moduleId,
  orderIndex,
  title,
  content,
  estimatedMinutes,
  required: true,
  status: 'FINAL_TRUTH',
  source,
});

const question = (id, quizId, prompt, options, correctOptionId, source, points = 1) => ({
  id,
  quizId,
  prompt,
  options,
  correctOptionId,
  points,
  status: 'FINAL_TRUTH',
  source,
});

// ---------------------------------------------------------------------------
// MODULES — 7 company-wide BGCT Evaluation days, then 11 PH/Sales Learning
// Path steps. requiresSignoff marks the modules where the source explicitly
// requires team-leader sign-off before progression (PH steps only — the
// 7-day BGCT plan does not state a per-day sign-off requirement).
// ---------------------------------------------------------------------------

export const MODULES = [
  {
    id: 'm1', programmeId: PROGRAMME.id, orderIndex: 1,
    title: 'Day 1: Company Foundation & BGCT Introduction',
    summary: 'What Digitweb Lanka does, what BGCT stands for, and the core company rule that the handbook is the only source of company knowledge.',
    estimatedMinutes: 20, realWorldPace: '1 working day (Day 1 of the 7-day evaluation)',
    status: 'FINAL_TRUTH', requiresSignoff: false,
    source: 'Onboarding Guide v1.0 — Section 1; Section 3, Day 1',
  },
  {
    id: 'm2', programmeId: PROGRAMME.id, orderIndex: 2,
    title: 'Day 2: Best Practice — Understanding the Standard',
    summary: 'What a Best Practice is, its required fields, and why it must be reviewed monthly.',
    estimatedMinutes: 15, realWorldPace: '1 working day (Day 2 of the 7-day evaluation)',
    status: 'FINAL_TRUTH', requiresSignoff: false,
    source: 'Onboarding Guide v1.0 — Section 1 (BGCT table, B row); Section 3, Day 2',
  },
  {
    id: 'm3', programmeId: PROGRAMME.id, orderIndex: 3,
    title: 'Day 3: Guidance — The Roadmap',
    summary: 'What Guidance is, why it is the most important BGCT part, and how to spot a Guidance "Accident Spot".',
    estimatedMinutes: 20, realWorldPace: '1 working day (Day 3 of the 7-day evaluation)',
    status: 'FINAL_TRUTH', requiresSignoff: false,
    source: 'Onboarding Guide v1.0 — Section 1 (BGCT table, G row); Section 3, Day 3',
  },
  {
    id: 'm4', programmeId: PROGRAMME.id, orderIndex: 4,
    title: 'Day 4: Checklist — The Control Gate',
    summary: 'What a Checklist is, and why a checklist item needs a binary YES/NO or PASS/FAIL condition.',
    estimatedMinutes: 15, realWorldPace: '1 working day (Day 4 of the 7-day evaluation)',
    status: 'FINAL_TRUTH', requiresSignoff: false,
    source: 'Onboarding Guide v1.0 — Section 1 (BGCT table, C row); Section 3, Day 4',
  },
  {
    id: 'm5', programmeId: PROGRAMME.id, orderIndex: 5,
    title: 'Day 5: Tutorial / Handbook — Source of Truth',
    summary: 'What a Tutorial/handbook must contain, the core knowledge rule, and the purpose of the Weekly Appendix.',
    estimatedMinutes: 15, realWorldPace: '1 working day (Day 5 of the 7-day evaluation)',
    status: 'FINAL_TRUTH', requiresSignoff: false,
    source: 'Onboarding Guide v1.0 — Section 1 (BGCT table, T row); Section 3, Day 5',
  },
  {
    id: 'm6', programmeId: PROGRAMME.id, orderIndex: 6,
    title: 'Day 6: Department BGCT — Applying the Standard',
    summary: 'Applying BGCT understanding to real PH/Sales Team scenarios via the department handbook.',
    estimatedMinutes: 20, realWorldPace: '1 working day (Day 6 of the 7-day evaluation)',
    status: 'FINAL_TRUTH', requiresSignoff: false,
    source: 'Onboarding Guide v1.0 — Section 3, Day 6; applied via PH/Sales BGCT Handbook v1.0',
  },
  {
    id: 'm7', programmeId: PROGRAMME.id, orderIndex: 7,
    title: 'Day 7: Review, Gaps & Evaluation Assessment',
    summary: 'Reviewing all six days and understanding how the Day 7 Evaluation Report and its 25-question assessment work.',
    estimatedMinutes: 20, realWorldPace: '1 working day (Day 7 of the 7-day evaluation)',
    status: 'FINAL_TRUTH', requiresSignoff: false,
    source: 'Onboarding Guide v1.0 — Section 3, Day 7; Section 4',
  },
  {
    id: 'm8', programmeId: PROGRAMME.id, orderIndex: 8,
    title: 'Step 1: Sales Fundamentals',
    summary: 'Revenue, orders, profit, margin, CTR, CVR, impressions, organic vs PPC sales, ACOS, TACOS, and Buy Box.',
    estimatedMinutes: 20, realWorldPace: 'Minimum 1 working week (Step 1 of the PH Sales Learning Path)',
    status: 'FINAL_TRUTH', requiresSignoff: true,
    source: 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 1',
  },
  {
    id: 'm9', programmeId: PROGRAMME.id, orderIndex: 9,
    title: 'Step 2: Amazon Platform Basics',
    summary: 'Seller Central navigation, ASIN vs SKU, Parent–Child variation, FBA vs FBM, and inventory basics.',
    estimatedMinutes: 20, realWorldPace: 'Minimum 1 working week (Step 2 of the PH Sales Learning Path)',
    status: 'FINAL_TRUTH', requiresSignoff: true,
    source: 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 2',
  },
  {
    id: 'm10', programmeId: PROGRAMME.id, orderIndex: 10,
    title: 'Step 3: eBay Platform Basics',
    summary: 'eBay listing structure, item specifics, promoted listings basics, price competitiveness, and eBay traffic metrics.',
    estimatedMinutes: 20, realWorldPace: 'Minimum 1 working week (Step 3 of the PH Sales Learning Path)',
    status: 'FINAL_TRUTH', requiresSignoff: true,
    source: 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 3',
  },
  {
    id: 'm11', programmeId: PROGRAMME.id, orderIndex: 11,
    title: 'Step 4: Amazon Listing Structure',
    summary: 'Title optimisation, image structure, bullet writing, description formatting, backend keywords, A+ content, and prohibited words.',
    estimatedMinutes: 25, realWorldPace: 'Minimum 1 working week (Step 4 of the PH Sales Learning Path)',
    status: 'FINAL_TRUTH', requiresSignoff: true,
    source: 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 4; Section 5',
  },
  {
    id: 'm12', programmeId: PROGRAMME.id, orderIndex: 12,
    title: 'Step 5: Keyword Research Mastery',
    summary: 'Manual research, competitor extraction, auto-suggest, PPC search term mining, Helium 10, and keyword prioritisation.',
    estimatedMinutes: 20, realWorldPace: 'Minimum 1 working week (Step 5 of the PH Sales Learning Path)',
    status: 'FINAL_TRUTH', requiresSignoff: true,
    source: 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 5',
  },
  {
    id: 'm13', programmeId: PROGRAMME.id, orderIndex: 13,
    title: 'Step 6: PPC Fundamentals',
    summary: 'Campaign types, keyword targeting, match types, bid strategy, search term report, and negative keywords.',
    estimatedMinutes: 20, realWorldPace: 'Minimum 1 working week (Step 6 of the PH Sales Learning Path)',
    status: 'FINAL_TRUTH', requiresSignoff: true,
    source: 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 6',
  },
  {
    id: 'm14', programmeId: PROGRAMME.id, orderIndex: 14,
    title: 'Step 7: Sales Analysis (Daily)',
    summary: 'Reading the daily performance sheet, identifying drop/growth trends, and diagnosing CTR/CVR/Impression/PPC issues.',
    estimatedMinutes: 25, realWorldPace: 'Minimum 1 working week (Step 7 of the PH Sales Learning Path)',
    status: 'FINAL_TRUTH', requiresSignoff: true,
    source: 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 7; Section 4',
  },
  {
    id: 'm15', programmeId: PROGRAMME.id, orderIndex: 15,
    title: 'Step 8: FBA & Inventory Management',
    summary: 'When to send stock, restock calculation, sell-through rate, avoiding stockouts, and excess inventory.',
    estimatedMinutes: 25, realWorldPace: 'Minimum 1 working week (Step 8 of the PH Sales Learning Path)',
    status: 'FINAL_TRUTH', requiresSignoff: true,
    source: 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 8; Section 6',
  },
  {
    id: 'm16', programmeId: PROGRAMME.id, orderIndex: 16,
    title: 'Step 9: Competitor & Market Analysis',
    summary: 'Price benchmarking, review comparison, feature comparison, ranking comparison, and gap identification.',
    estimatedMinutes: 20, realWorldPace: 'Minimum 1 working week (Step 9 of the PH Sales Learning Path)',
    status: 'FINAL_TRUTH', requiresSignoff: true,
    source: 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 9',
  },
  {
    id: 'm17', programmeId: PROGRAMME.id, orderIndex: 17,
    title: 'Step 10: Workflow Execution (PH Level)',
    summary: 'ASIN ownership mindset, root cause identification, action planning, cross-team coordination, and reporting.',
    estimatedMinutes: 25, realWorldPace: 'Minimum 1 working week (Step 10 of the PH Sales Learning Path)',
    status: 'FINAL_TRUTH', requiresSignoff: true,
    source: 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 10; Section 2',
  },
  {
    id: 'm18', programmeId: PROGRAMME.id, orderIndex: 18,
    title: 'Step 11: Scaling & Decision Making',
    summary: 'Identifying a scalable ASIN, budget/variation/international expansion, and the Kill SKU decision.',
    estimatedMinutes: 20, realWorldPace: 'Minimum 1 working week (Step 11 of the PH Sales Learning Path)',
    status: 'FINAL_TRUTH', requiresSignoff: true,
    source: 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 11; Section 2, Steps 8–9',
  },
];

// ---------------------------------------------------------------------------
// LESSONS
// ---------------------------------------------------------------------------

export const LESSONS = [
  // Module 1 — Day 1
  lesson('m1-l1', 'm1', 1, 'What This Guide Is',
    'This guide tells you exactly what to do from Day 1 of your evaluation. Follow it in order — do not skip sections. You have a 7-day evaluation period, and it is unpaid: this is your opportunity to show you are right for Digitweb, and to decide if Digitweb is right for you. Your trainer for the entire evaluation and probation period is Claude, an AI assistant loaded with Digitweb’s BGCT knowledge base for your role.',
    6, 'Onboarding Guide v1.0 — Section 1, points 1–2; Field table'),
  lesson('m1-l2', 'm1', 2, 'What is BGCT?',
    'BGCT is Digitweb’s operating standard — every task at the company is documented in this format, and it is not optional reading. B is Best Practice: the standard the company expects you to reach. G is Guidance: the step-by-step roadmap showing how to reach that standard safely. C is Checklist: the control gate — binary YES/NO checks to confirm nothing is missed. T is Tutorial: the full written handbook, your source of truth for every task.',
    8, 'Onboarding Guide v1.0 — Section 1, "What is BGCT?" table'),
  lesson('m1-l3', 'm1', 3, 'The Core Company Rule',
    'If it is not written in the BGCT or current appendix, it does not exist as company knowledge. You must always use the handbook — not memory, not verbal advice, not guesswork.',
    5, 'Onboarding Guide v1.0 — Section 1, "The Core Company Rule"'),

  // Module 2 — Day 2
  lesson('m2-l1', 'm2', 1, 'What a Best Practice Is',
    'A Best Practice is the standard the company expects you to reach — the target every task is measured against.',
    5, 'Onboarding Guide v1.0 — Section 1, BGCT table (B row); Section 3, Day 2'),
  lesson('m2-l2', 'm2', 2, 'Required Fields and the Monthly Review',
    'By the end of Day 2 you must be able to identify the required fields of a Best Practice (date, version, owner, evidence) and explain why it must be reviewed monthly — a standard that is not revisited goes stale.',
    8, 'Onboarding Guide v1.0 — Section 3, Day 2 row'),

  // Module 3 — Day 3
  lesson('m3-l1', 'm3', 1, 'Guidance: The Most Important BGCT Part',
    'Guidance is the step-by-step roadmap showing how to reach the Best Practice standard safely. It converts the Best Practice from a target into safe execution — which is why it is considered the most important part of BGCT.',
    7, 'Onboarding Guide v1.0 — Section 1, BGCT table (G row); Section 4, Sample Q2'),
  lesson('m3-l2', 'm3', 2, 'Guidance Elements and Accident Spots',
    'By the end of Day 3 you must be able to identify at least 5 Guidance elements — such as milestones, pitfalls, and escalation paths — and give a real-life example of a pitfall. An "Accident Spot" in Guidance means a high-risk point where losses, wrong decisions, or customer problems happen.',
    8, 'Onboarding Guide v1.0 — Section 3, Day 3 row; Section 4, Sample Q8'),

  // Module 4 — Day 4
  lesson('m4-l1', 'm4', 1, 'Checklist: The Control Gate',
    'A Checklist is the control gate of BGCT — binary YES/NO checks that confirm nothing has been missed before work is considered complete.',
    5, 'Onboarding Guide v1.0 — Section 1, BGCT table (C row); Section 3, Day 4'),
  lesson('m4-l2', 'm4', 2, 'What Makes a Checklist Item Weak',
    'A checklist item such as "Ensure the process is done correctly" is weak because it has no YES/NO or PASS/FAIL condition — it cannot actually be checked. Thresholds, percentages, and other configurable values inside a BGCT handbook must be governed or formally excepted, not left to individual judgement.',
    7, 'Onboarding Guide v1.0 — Section 4, Sample Q5 and Q9'),

  // Module 5 — Day 5
  lesson('m5-l1', 'm5', 1, 'Tutorial / Handbook: Source of Truth',
    'The Tutorial is the full written handbook — your source of truth for every task. It is considered incomplete if a new staff member still needs someone beside them after reading it.',
    6, 'Onboarding Guide v1.0 — Section 1, BGCT table (T row); Section 4, Sample Q7'),
  lesson('m5-l2', 'm5', 2, 'The Weekly Appendix',
    'The Weekly Appendix is a temporary holding area for new gaps and learning, promoted into the main handbook on a monthly basis. If it is not in the BGCT or the appendix, it does not exist as company knowledge — the same core rule from Day 1.',
    6, 'Onboarding Guide v1.0 — Section 4, Sample Q6; Section 1, "The Core Company Rule"'),

  // Module 6 — Day 6
  lesson('m6-l1', 'm6', 1, 'Moving From Company-Wide BGCT to Your Department',
    'Day 6 is where you apply your BGCT understanding to your specific department’s tasks — for the PH/Sales Team, that means the PH/Sales BGCT Handbook. Ask about real scenarios from your team’s handbook, and practise using Guidance to make a decision.',
    8, 'Onboarding Guide v1.0 — Section 3, Day 6 row'),
  lesson('m6-l2', 'm6', 2, 'The PH/Sales Learning Path',
    'The PH/Sales BGCT Handbook defines its own 11-step Learning Path. PH team members must complete all 11 steps in order before independently managing ASINs, and competency must be demonstrated at each stage before progression. No staff member should be assigned ASIN ownership before completing Steps 1–6 minimum.',
    8, 'PH/Sales BGCT Handbook v1.0 — Section 1, Best Practice and progression model note'),

  // Module 7 — Day 7
  lesson('m7-l1', 'm7', 1, 'Reviewing All Six Days',
    'Day 7 is a review day: go back over Days 1–6, ask to be quizzed on weak areas, and identify any gaps before triggering your evaluation.',
    6, 'Onboarding Guide v1.0 — Section 3, Day 7 row'),
  lesson('m7-l2', 'm7', 2, 'The Day 7 Evaluation Report',
    'On Day 7, after completing your review, you trigger a 25-question MCQ assessment covering BGCT understanding (40%), role/department knowledge (30%), company rules and values (20%), and cultural fit indicators (10%). The report includes your score, a topic breakdown, strengths, gaps, and a recommendation: Promote to Probation, Extend Evaluation, or Not Recommended.',
    9, 'Onboarding Guide v1.0 — Section 4, "The Day 7 Evaluation Report"'),

  // Module 8 — Step 1
  lesson('m8-l1', 'm8', 1, 'Core Sales Terms',
    'Step 1 of the PH Learning Path covers the foundational sales vocabulary: revenue, orders, profit, margin, CTR, CVR, impressions, organic vs PPC sales, ACOS, TACOS, and Buy Box.',
    8, 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 1'),
  lesson('m8-l2', 'm8', 2, 'Impressions, CTR and CVR',
    'Impressions are how many times Amazon shows your product — no impressions means no traffic. CTR (Click-Through Rate) is Clicks ÷ Impressions. CVR (Conversion Rate) is Orders ÷ Clicks. These metrics, together with indexing and ranking, drive the growth formula every PH member must understand.',
    9, 'PH/Sales BGCT Handbook v1.0 — Section 3.3'),

  // Module 9 — Step 2
  lesson('m9-l1', 'm9', 1, 'Seller Central and Core Amazon Concepts',
    'Step 2 of the PH Learning Path covers Seller Central navigation, ASIN vs SKU, Parent–Child variation, FBA vs FBM, and inventory basics — the operating platform every Amazon task runs on.',
    8, 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 2'),
  lesson('m9-l2', 'm9', 2, 'FBA vs FBM in Practice',
    'Where an FBA-enabled ASIN does not already exist, and a product meets the minimum criteria — 3–5 FBM orders in the last 30 days, a rating of 4.0 or above, no active complaints or a returns spike, and a stable Buy Box share — it can be converted from FBM to FBA.',
    9, 'PH/Sales BGCT Handbook v1.0 — Section 6, "New Products for FBA Selection" and "FBA Listing Creation/Conversion"'),

  // Module 10 — Step 3
  lesson('m10-l1', 'm10', 1, 'eBay Listing Structure and Traffic Metrics',
    'Step 3 of the PH Learning Path covers eBay listing structure, item specifics, promoted listings basics, price competitiveness, and eBay traffic metrics.',
    8, 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 3'),
  lesson('m10-l2', 'm10', 2, 'Item Specifics: The Most Common eBay Gap',
    '100% of item specifics must be filled — never leave a blank. eBay’s Cassini search algorithm uses item specifics heavily for filtering and search visibility; a listing with blank specifics will rank significantly lower than a complete competitor listing.',
    8, 'PH/Sales BGCT Handbook v1.0 — Section 7.2'),

  // Module 11 — Step 4
  lesson('m11-l1', 'm11', 1, 'Title, Images and Bullets',
    'An Amazon title follows Brand + Product Type + Key Feature + Size/Specification + Colour/Variation, ideally 150–180 characters, with key specs in the first 80 characters (mobile shows around 80 characters, and over 75% of shoppers use mobile). A listing needs a minimum of 5 bullet points, each under 200 characters, structured as Package Details / Technical Details / Dimensions / Material / Usage & Benefits.',
    9, 'PH/Sales BGCT Handbook v1.0 — Section 5.1 and 5.3'),
  lesson('m11-l2', 'm11', 2, 'Backend Keywords and A+ Content',
    'Backend search terms are limited to 500 characters, space-separated only, with no punctuation or repetition. A+ Content requires a large hero image, a technical specification image, application images, and a comparison chart, and must be tested on mobile before publishing. Only account holders may approve structural changes to A+ modules.',
    9, 'PH/Sales BGCT Handbook v1.0 — Section 5.4 and 5.5'),
  lesson('m11-l3', 'm11', 3, 'Prohibited Words',
    'Certain words are prohibited on Amazon listings: false claims ("Best", "No.1", "Guaranteed") can cause listing removal or suppression; promotional language ("Sale", "Limited time") and price claims ("Cheap", "Lowest price") are policy violations; health claims ("Cures", "Heals") cause removal; and IP violations (competitor brand names, "Replica") risk an account warning or suspension.',
    7, 'PH/Sales BGCT Handbook v1.0 — Section 5.6'),

  // Module 12 — Step 5
  lesson('m12-l1', 'm12', 1, 'Keyword Research Methods',
    'Step 5 of the PH Learning Path covers manual research, competitor extraction, Amazon’s auto-suggest, PPC search term mining, Helium 10, and keyword prioritisation.',
    8, 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 5'),
  lesson('m12-l2', 'm12', 2, 'Indexing Comes Before Ranking',
    'Adding a keyword does not guarantee indexing — Amazon requires proof of relevance through engagement and sales, not just keyword presence. Never attempt to improve ranking without first confirming indexing.',
    8, 'PH/Sales BGCT Handbook v1.0 — Section 3.1 and Guidance'),

  // Module 13 — Step 6
  lesson('m13-l1', 'm13', 1, 'PPC Building Blocks',
    'Step 6 of the PH Learning Path covers campaign types, keyword targeting, match types, bid strategy, the search term report, and negative keywords.',
    8, 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 6'),
  lesson('m13-l2', 'm13', 2, 'Diagnosing Before Spending',
    'Never increase PPC spend without first diagnosing which metric — Impressions, CTR, or CVR — is actually failing. Fixing the wrong layer wastes time and budget.',
    7, 'PH/Sales BGCT Handbook v1.0 — Section 3, Guidance and Tutorial'),

  // Module 14 — Step 7
  lesson('m14-l1', 'm14', 1, 'The Start-of-Day Scan',
    'Every PH member completes a structured daily sales scan across all marketplaces — Amazon US, Amazon UK, eBay, Shopify, and B&Q — before 9:30 AM. The scan compares today’s orders and SKU count against yesterday and the same day last week, so trend changes are not missed.',
    9, 'PH/Sales BGCT Handbook v1.0 — Section 4, Best Practice and 4.1'),
  lesson('m14-l2', 'm14', 2, 'Fast Movers, Zero-Sale SKUs and Red Flags',
    'Fast-moving SKUs are checked for stock risk and competitor price changes. Regular sellers with zero sales today are compared against the last 7 days and checked for Buy Box loss or listing issues. A blocked or inactive listing must be escalated immediately — never self-fixed without approval.',
    9, 'PH/Sales BGCT Handbook v1.0 — Section 4.2, 4.3 and 4.4'),
  lesson('m14-l3', 'm14', 3, 'The Daily Written Report',
    'A written report is submitted by 11:00 AM daily, without exception — verbal updates are not a substitute. It must include today’s sold SKUs, regular SKUs with zero sales and the reason, SKUs requiring action with a proposed action, competitor trigger alerts, and a PPC suggestion if needed.',
    8, 'PH/Sales BGCT Handbook v1.0 — Section 4, Tutorial'),

  // Module 15 — Step 8
  lesson('m15-l1', 'm15', 1, 'Daily Inventory Visibility',
    'Every PH member maintains full daily visibility of inbound shipments, FBA stock levels, and stranded inventory. Zero-stock on fast-moving SKUs is a preventable failure, and stranded inventory must be brought to zero by the end of each working day.',
    8, 'PH/Sales BGCT Handbook v1.0 — Section 6, Best Practice'),
  lesson('m15-l2', 'm15', 2, 'Inbound Checks and Fast-Mover Alerts',
    'Inbound shipments are cross-checked every morning — comparing units shipped, checked-in, and received — with discrepancies reported immediately. For the top 10 selling SKUs, an alert is set when stock drops below 7 days of sales, so replenishment happens before the Buy Box rotation breaks.',
    9, 'PH/Sales BGCT Handbook v1.0 — Section 6, task table'),
  lesson('m15-l3', 'm15', 3, 'Escalating Logistics Issues',
    'Mithusa is the named escalation contact for urgent logistics issues. Structured updates — stockouts, fast-movers, new FBA selections, urgent actions — are sent to Mithusa (with the PH Manager copied if needed), one update per completed task.',
    7, 'PH/Sales BGCT Handbook v1.0 — Section 6, Guidance and "Mithusa Update Communication" row'),

  // Module 16 — Step 9
  lesson('m16-l1', 'm16', 1, 'What Step 9 Covers',
    'Step 9 of the PH Learning Path covers price benchmarking, review comparison, feature comparison, ranking comparison, and gap identification against competitors.',
    7, 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 9'),
  lesson('m16-l2', 'm16', 2, 'Pricing Within the Buy Box',
    'Price competitiveness is judged against the Buy Box: landed price should stay within 1–3% of the lowest competitive FBA offer, a CRITICAL priority alongside fulfilment method and Order Defect Rate.',
    8, 'PH/Sales BGCT Handbook v1.0 — Section 8.4'),

  // Module 17 — Step 10
  lesson('m17-l1', 'm17', 1, 'The 9-Step ASIN Workflow',
    'Every PH member follows a 9-step ASIN workflow: Allocation, Data Analysis & Performance Review, Problem Identification, Action Planning, Execution, Monitoring & Tracking, Reporting, Scaling Strategy, and Kill or Revive Decision. Work not recorded in the tracking sheet is work that does not exist.',
    9, 'PH/Sales BGCT Handbook v1.0 — Section 2, Best Practice and step table'),
  lesson('m17-l2', 'm17', 2, 'Root Cause Before Action',
    'Problems are diagnosed by symptom: low impressions points to SEO/ranking, low CTR to image/title, low CVR to price/reviews/content, high ACOS to PPC, Buy Box loss to pricing, and a stock issue to inventory. The exact issue must be documented — not assumed — before a structured action plan is created.',
    8, 'PH/Sales BGCT Handbook v1.0 — Section 2, Step 3 and Checklist'),
  lesson('m17-l3', 'm17', 3, 'Monitoring and Reporting',
    'After any change, performance is monitored daily for 7–14 days, tracking CTR, CVR, Sales, Ranking, and ACOS, with before/after data recorded. A weekly summary is due every Friday by 5:00 PM.',
    8, 'PH/Sales BGCT Handbook v1.0 — Section 2, Step 6–7 and Tutorial'),

  // Module 18 — Step 11
  lesson('m18-l1', 'm18', 1, 'When to Scale',
    'Step 11 of the PH Learning Path covers identifying a scalable ASIN, budget expansion, variation expansion, international expansion, and the Kill SKU decision. For ASINs with 20+ orders per month, scaling actions include increasing PPC, sending stock to FBA, expanding keywords, launching a variation, improving reviews, and considering international expansion.',
    9, 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 11 and Section 2, Step 8'),
  lesson('m18-l2', 'm18', 2, 'Kill or Revive',
    'Non-performing ASINs are given a 30-day revival plan first. If there is no improvement, the sequence is: reduce PPC, then bundle/repackage, then liquidate, then mark as Kill SKU — only after the full 30-day revival attempt.',
    8, 'PH/Sales BGCT Handbook v1.0 — Section 2, Step 9'),
];

// ---------------------------------------------------------------------------
// QUIZZES — one Skill Check per module. passingScorePct/maxAttempts reuse the
// prototype-wide CONFIGURATION_REQUIRED defaults (config.js): neither source
// document states a per-module MCQ passing percentage or attempt limit — see
// EVALUATION_SCORE_BANDS / PROBATION_SCORE_GATES above for the source's own
// (differently-shaped) scoring model, shown for reference on the Dashboard.
// ---------------------------------------------------------------------------

export const QUIZZES = MODULES.map((m) => ({
  id: `${m.id}-quiz`,
  moduleId: m.id,
  title: `${m.title} — Skill Check`,
  passingScorePct: 80,
  maxAttempts: 3,
}));

// ---------------------------------------------------------------------------
// QUESTIONS
// ---------------------------------------------------------------------------

export const QUESTIONS = [
  // Module 1 quiz (Day 1)
  question('m1-quiz-q1', 'm1-quiz', 'What does BGCT stand for at Digitweb Lanka?',
    [
      { id: 'a', text: 'Business Growth Control Tracker' },
      { id: 'b', text: 'Best Practice, Guidance, Checklist, Tutorial' },
      { id: 'c', text: 'Basic Guide, Content, Training' },
      { id: 'd', text: 'Budget, Goals, Checklist, Tasks' },
    ], 'b', 'Onboarding Guide v1.0 — Section 4, Sample Q1'),
  question('m1-quiz-q2', 'm1-quiz', 'How long is the evaluation period at Digitweb Lanka, and is it paid?',
    [
      { id: 'a', text: '7 days, unpaid' },
      { id: 'b', text: '14 days, paid' },
      { id: 'c', text: '30 days, unpaid' },
      { id: 'd', text: '7 days, paid' },
    ], 'a', 'Onboarding Guide v1.0 — Field table; Section 1, point 1'),
  question('m1-quiz-q3', 'm1-quiz', 'Who acts as your trainer during the evaluation and probation period?',
    [
      { id: 'a', text: 'Your direct manager' },
      { id: 'b', text: 'Claude, an AI assistant loaded with Digitweb’s BGCT knowledge base' },
      { id: 'c', text: 'The HR department' },
      { id: 'd', text: 'A senior colleague chosen at random' },
    ], 'b', 'Onboarding Guide v1.0 — Section 1, point 2; Field table'),

  // Module 2 quiz (Day 2)
  question('m2-quiz-q1', 'm2-quiz', 'A Best Practice must include a "Next Review Date". Why?',
    [
      { id: 'a', text: 'To track employee performance' },
      { id: 'b', text: 'To ensure the standard is updated and does not become stale' },
      { id: 'c', text: 'To satisfy auditors' },
      { id: 'd', text: 'To track costs' },
    ], 'b', 'Onboarding Guide v1.0 — Section 4, Sample Q3'),
  question('m2-quiz-q2', 'm2-quiz', 'What BGCT part represents "the standard the company expects you to reach — the target"?',
    [
      { id: 'a', text: 'Guidance' },
      { id: 'b', text: 'Checklist' },
      { id: 'c', text: 'Best Practice' },
      { id: 'd', text: 'Tutorial' },
    ], 'c', 'Onboarding Guide v1.0 — Section 1, BGCT table (B row)'),
  question('m2-quiz-q3', 'm2-quiz', 'A Best Practice must be reviewed and improved every:',
    [
      { id: 'a', text: 'Year' },
      { id: 'b', text: 'Quarter' },
      { id: 'c', text: 'Month' },
      { id: 'd', text: 'Week' },
    ], 'c', 'Onboarding Guide v1.0 — Section 4, Sample Q21'),

  // Module 3 quiz (Day 3)
  question('m3-quiz-q1', 'm3-quiz', 'Which part of BGCT is described as "the most important part because it converts the Best Practice from a target into safe execution"?',
    [
      { id: 'a', text: 'Best Practice' },
      { id: 'b', text: 'Checklist' },
      { id: 'c', text: 'Guidance' },
      { id: 'd', text: 'Tutorial' },
    ], 'c', 'Onboarding Guide v1.0 — Section 4, Sample Q2'),
  question('m3-quiz-q2', 'm3-quiz', 'What does an "Accident Spot" mean in the Guidance section?',
    [
      { id: 'a', text: 'A health and safety concern in the office' },
      { id: 'b', text: 'A high-risk point where losses, wrong decisions, or customer problems happen' },
      { id: 'c', text: 'A location where staff often lose personal items' },
      { id: 'd', text: 'A section of the checklist that is frequently wrong' },
    ], 'b', 'Onboarding Guide v1.0 — Section 4, Sample Q8'),
  question('m3-quiz-q3', 'm3-quiz', 'According to the BGCT table, what does Guidance provide?',
    [
      { id: 'a', text: 'A binary YES/NO gate' },
      { id: 'b', text: 'The step-by-step roadmap showing how to reach the standard safely' },
      { id: 'c', text: 'The full written handbook' },
      { id: 'd', text: 'A performance score' },
    ], 'b', 'Onboarding Guide v1.0 — Section 1, BGCT table (G row)'),

  // Module 4 quiz (Day 4)
  question('m4-quiz-q1', 'm4-quiz', 'A checklist item says "Ensure the process is done correctly". According to BGCT, this checklist item is:',
    [
      { id: 'a', text: 'A strong control gate' },
      { id: 'b', text: 'Weak because it has no YES/NO or PASS/FAIL condition' },
      { id: 'c', text: 'Acceptable for senior staff' },
      { id: 'd', text: 'Correct if signed by a manager' },
    ], 'b', 'Onboarding Guide v1.0 — Section 4, Sample Q5'),
  question('m4-quiz-q2', 'm4-quiz', 'Thresholds, percentages, and configurable values in a BGCT handbook must be:',
    [
      { id: 'a', text: 'Set by the employee based on experience' },
      { id: 'b', text: 'Governed or formally excepted' },
      { id: 'c', text: 'Agreed verbally between team members' },
      { id: 'd', text: 'Left flexible for managers to decide' },
    ], 'b', 'Onboarding Guide v1.0 — Section 4, Sample Q9'),
  question('m4-quiz-q3', 'm4-quiz', 'What does the Checklist part of BGCT function as?',
    [
      { id: 'a', text: 'The full handbook' },
      { id: 'b', text: 'The step-by-step roadmap' },
      { id: 'c', text: 'The control gate — binary YES/NO checks to confirm nothing is missed' },
      { id: 'd', text: 'A performance score' },
    ], 'c', 'Onboarding Guide v1.0 — Section 1, BGCT table (C row)'),

  // Module 5 quiz (Day 5)
  question('m5-quiz-q1', 'm5-quiz', 'What is the core company rule about knowledge at Digitweb?',
    [
      { id: 'a', text: 'Knowledge can be shared verbally if confirmed by a manager' },
      { id: 'b', text: 'Knowledge in screenshots is acceptable' },
      { id: 'c', text: 'If it is not in the BGCT or appendix, it does not exist as company knowledge' },
      { id: 'd', text: 'Knowledge must be approved by HR before use' },
    ], 'c', 'Onboarding Guide v1.0 — Section 4, Sample Q4'),
  question('m5-quiz-q2', 'm5-quiz', 'What is the purpose of the Weekly Appendix?',
    [
      { id: 'a', text: 'A backup of the main handbook' },
      { id: 'b', text: 'A temporary holding area for new gaps and learning before monthly promotion' },
      { id: 'c', text: 'A list of employee mistakes' },
      { id: 'd', text: 'A daily schedule template' },
    ], 'b', 'Onboarding Guide v1.0 — Section 4, Sample Q6'),
  question('m5-quiz-q3', 'm5-quiz', 'The Tutorial/handbook is considered incomplete when:',
    [
      { id: 'a', text: 'It has fewer than 20 pages' },
      { id: 'b', text: 'A new staff member still needs someone beside them after reading it' },
      { id: 'c', text: 'It does not include financial data' },
      { id: 'd', text: 'It is not printed in colour' },
    ], 'b', 'Onboarding Guide v1.0 — Section 4, Sample Q7'),

  // Module 6 quiz (Day 6 — sourced from department handbook per Section 4's own instruction)
  question('m6-quiz-q1', 'm6-quiz', 'Per the PH/Sales BGCT Handbook, how many learning steps must a PH team member complete, in order, before independently managing ASINs?',
    [
      { id: 'a', text: '5' },
      { id: 'b', text: '8' },
      { id: 'c', text: '11' },
      { id: 'd', text: '15' },
    ], 'c', 'PH/Sales BGCT Handbook v1.0 — Section 1, Best Practice'),
  question('m6-quiz-q2', 'm6-quiz', 'What is the minimum number of learning steps a PH staff member must complete before being assigned ASIN ownership?',
    [
      { id: 'a', text: 'Steps 1–3' },
      { id: 'b', text: 'Steps 1–6' },
      { id: 'c', text: 'Steps 1–9' },
      { id: 'd', text: 'All 11 steps' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 1, progression model note'),
  question('m6-quiz-q3', 'm6-quiz', 'According to the PH/Sales BGCT Handbook, who must verify each learning step before a staff member progresses?',
    [
      { id: 'a', text: 'The staff member themselves' },
      { id: 'b', text: 'HR' },
      { id: 'c', text: 'Team leader sign-off' },
      { id: 'd', text: 'No verification is required' },
    ], 'c', 'PH/Sales BGCT Handbook v1.0 — Section 1, Checklist'),

  // Module 7 quiz (Day 7)
  question('m7-quiz-q1', 'm7-quiz', 'When a staff member faces a situation not covered in the handbook, what must they do?',
    [
      { id: 'a', text: 'Make a decision based on experience' },
      { id: 'b', text: 'Ask a colleague for advice' },
      { id: 'c', text: 'Refer to the "No-Rule Point" protocol — stop and escalate to the named owner' },
      { id: 'd', text: 'Do nothing and wait' },
    ], 'c', 'Onboarding Guide v1.0 — Section 4, Sample Q19'),
  question('m7-quiz-q2', 'm7-quiz', 'Evidence is required to mark work as complete. A staff member submits a task with no attached evidence. The correct action is:',
    [
      { id: 'a', text: 'Accept the task if the staff member verbally confirms completion' },
      { id: 'b', text: 'Reject — no evidence means no completed work' },
      { id: 'c', text: 'Accept if it was done by a senior staff member' },
      { id: 'd', text: 'Escalate to the auditor' },
    ], 'b', 'Onboarding Guide v1.0 — Section 4, Sample Q20'),
  question('m7-quiz-q3', 'm7-quiz', 'A colleague gives you a verbal instruction that contradicts the BGCT handbook. What do you do?',
    [
      { id: 'a', text: 'Follow the verbal instruction because they have more experience' },
      { id: 'b', text: 'Follow the handbook and politely flag the contradiction to your team leader' },
      { id: 'c', text: 'Ignore both and do what seems best' },
      { id: 'd', text: 'Report the colleague immediately to HR' },
    ], 'b', 'Onboarding Guide v1.0 — Section 4, Sample Q24'),
  question('m7-quiz-q4', 'm7-quiz', 'During your first week, you notice a process that seems inefficient but is not covered in your handbook. The correct action is:',
    [
      { id: 'a', text: 'Change the process on your own initiative' },
      { id: 'b', text: 'Raise it as an appendix gap item with your team leader' },
      { id: 'c', text: 'Complain to colleagues' },
      { id: 'd', text: 'Wait for someone else to notice' },
    ], 'b', 'Onboarding Guide v1.0 — Section 4, Sample Q25'),

  // Module 8 quiz (Step 1)
  question('m8-quiz-q1', 'm8-quiz', 'According to the PH Learning Path Readiness Gate, what must a staff member be able to do regarding ACOS, TACOS, CTR, CVR, and Buy Box before progressing?',
    [
      { id: 'a', text: 'List their definitions from a reference sheet' },
      { id: 'b', text: 'Explain them without reference material' },
      { id: 'c', text: 'Nothing — they are optional terms' },
      { id: 'd', text: 'Only understand ACOS' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 1, Checklist'),
  question('m8-quiz-q2', 'm8-quiz', 'CTR (Click-Through Rate) is calculated as:',
    [
      { id: 'a', text: 'Orders ÷ Clicks' },
      { id: 'b', text: 'Clicks ÷ Impressions' },
      { id: 'c', text: 'Impressions ÷ Orders' },
      { id: 'd', text: 'Orders ÷ Impressions' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 3.3'),
  question('m8-quiz-q3', 'm8-quiz', 'CVR (Conversion Rate) is calculated as:',
    [
      { id: 'a', text: 'Orders ÷ Clicks' },
      { id: 'b', text: 'Clicks ÷ Impressions' },
      { id: 'c', text: 'Impressions ÷ Orders' },
      { id: 'd', text: 'Clicks ÷ Orders' },
    ], 'a', 'PH/Sales BGCT Handbook v1.0 — Section 3.3'),

  // Module 9 quiz (Step 2)
  question('m9-quiz-q1', 'm9-quiz', 'Which of the following is listed as a Step 2 topic in the PH Sales Learning Path?',
    [
      { id: 'a', text: 'PPC bid strategy' },
      { id: 'b', text: 'ASIN vs SKU' },
      { id: 'c', text: 'Break-even calculation' },
      { id: 'd', text: 'Kill SKU decision' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 2'),
  question('m9-quiz-q2', 'm9-quiz', 'Per Section 6 (FBA Inbound & Inventory Management), when should a listing be converted from FBM to FBA?',
    [
      { id: 'a', text: 'Never — keep all listings FBM' },
      { id: 'b', text: 'When an FBA-enabled ASIN does not already exist and the product meets minimum criteria' },
      { id: 'c', text: 'Only for branded products' },
      { id: 'd', text: 'Automatically after 24 hours' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 6, "FBA Listing Creation/Conversion"'),
  question('m9-quiz-q3', 'm9-quiz', 'What minimum FBM order history is required before considering a product for FBA, per Section 6?',
    [
      { id: 'a', text: '1 order in the last 7 days' },
      { id: 'b', text: '3–5 FBM orders in the last 30 days' },
      { id: 'c', text: '50 orders in the last 90 days' },
      { id: 'd', text: 'No minimum is required' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 6, "New Products for FBA Selection"'),

  // Module 10 quiz (Step 3)
  question('m10-quiz-q1', 'm10-quiz', 'What must never be left blank on an eBay listing, according to the handbook?',
    [
      { id: 'a', text: 'The item description' },
      { id: 'b', text: 'Item specifics' },
      { id: 'c', text: 'The shipping method only' },
      { id: 'd', text: 'The category only' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 7.2'),
  question('m10-quiz-q2', 'm10-quiz', 'Where must the primary keyword appear in an eBay listing title?',
    [
      { id: 'a', text: 'Anywhere in the title' },
      { id: 'b', text: 'Only in the last 10 characters' },
      { id: 'c', text: 'In the first 40 characters (45 for mobile)' },
      { id: 'd', text: 'It does not matter' },
    ], 'c', 'PH/Sales BGCT Handbook v1.0 — Section 7.1'),
  question('m10-quiz-q3', 'm10-quiz', 'What eBay research tool is named in the handbook for finding high-performing search terms?',
    [
      { id: 'a', text: 'Helium 10' },
      { id: 'b', text: 'Terapeak' },
      { id: 'c', text: 'Google Trends' },
      { id: 'd', text: 'Jungle Scout' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 7.3'),

  // Module 11 quiz (Step 4)
  question('m11-quiz-q1', 'm11-quiz', 'What is the ideal character length for an Amazon product title, per the handbook?',
    [
      { id: 'a', text: '50–80 characters' },
      { id: 'b', text: '150–180 characters' },
      { id: 'c', text: '500 characters' },
      { id: 'd', text: 'No limit' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 5.1'),
  question('m11-quiz-q2', 'm11-quiz', 'What is the minimum number of bullet points required on an Amazon listing?',
    [
      { id: 'a', text: '2' },
      { id: 'b', text: '3' },
      { id: 'c', text: '5' },
      { id: 'd', text: '10' },
    ], 'c', 'PH/Sales BGCT Handbook v1.0 — Section 5.3'),
  question('m11-quiz-q3', 'm11-quiz', 'What is the character limit for Amazon backend search keywords?',
    [
      { id: 'a', text: '100 characters' },
      { id: 'b', text: '250 characters' },
      { id: 'c', text: '500 characters' },
      { id: 'd', text: '1000 characters' },
    ], 'c', 'PH/Sales BGCT Handbook v1.0 — Section 5.4'),
  question('m11-quiz-q4', 'm11-quiz', 'Which of these words is listed as prohibited on an Amazon listing due to a false claim?',
    [
      { id: 'a', text: 'Lightweight' },
      { id: 'b', text: 'Best' },
      { id: 'c', text: 'Waterproof' },
      { id: 'd', text: 'Adjustable' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 5.6'),

  // Module 12 quiz (Step 5)
  question('m12-quiz-q1', 'm12-quiz', 'Which of these is listed as a keyword research method in the PH Sales Learning Path (Step 5)?',
    [
      { id: 'a', text: 'Break-even calculation' },
      { id: 'b', text: 'Helium 10' },
      { id: 'c', text: 'Stranded inventory resolution' },
      { id: 'd', text: 'Buy Box matching' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 5'),
  question('m12-quiz-q2', 'm12-quiz', 'Which keyword research method is described as extracting keywords from top competitor listings?',
    [
      { id: 'a', text: 'Auto-suggest' },
      { id: 'b', text: 'Competitor extraction' },
      { id: 'c', text: 'PPC search term mining' },
      { id: 'd', text: 'Manual research' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 5'),
  question('m12-quiz-q3', 'm12-quiz', 'What PPC-related keyword research method is listed under Step 5?',
    [
      { id: 'a', text: 'PPC search term mining' },
      { id: 'b', text: 'Campaign budget planning' },
      { id: 'c', text: 'Bid strategy testing' },
      { id: 'd', text: 'Negative keyword removal' },
    ], 'a', 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 5'),

  // Module 13 quiz (Step 6)
  question('m13-quiz-q1', 'm13-quiz', 'Which of these is listed as a PPC Fundamentals topic in the Learning Path?',
    [
      { id: 'a', text: 'Match types' },
      { id: 'b', text: 'Break-even formula' },
      { id: 'c', text: 'Item specifics' },
      { id: 'd', text: 'Stranded inventory' },
    ], 'a', 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 6'),
  question('m13-quiz-q2', 'm13-quiz', 'What PPC report is used to find new keyword opportunities and negative keywords, per Step 6?',
    [
      { id: 'a', text: 'Daily performance sheet' },
      { id: 'b', text: 'Search term report' },
      { id: 'c', text: 'Weekly summary report' },
      { id: 'd', text: 'Stranded inventory report' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 6'),
  question('m13-quiz-q3', 'm13-quiz', 'Negative keywords are listed as a topic under which learning step?',
    [
      { id: 'a', text: 'Step 5: Keyword Research Mastery' },
      { id: 'b', text: 'Step 6: PPC Fundamentals' },
      { id: 'c', text: 'Step 9: Competitor & Market Analysis' },
      { id: 'd', text: 'Step 11: Scaling & Decision Making' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 6'),

  // Module 14 quiz (Step 7)
  question('m14-quiz-q1', 'm14-quiz', 'By what time must the daily sales scan be completed, per the handbook?',
    [
      { id: 'a', text: '8:00 AM' },
      { id: 'b', text: '9:30 AM' },
      { id: 'c', text: '12:00 PM' },
      { id: 'd', text: '5:00 PM' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 4, Best Practice'),
  question('m14-quiz-q2', 'm14-quiz', 'By what time must the written daily sales report be submitted?',
    [
      { id: 'a', text: '9:30 AM' },
      { id: 'b', text: '11:00 AM' },
      { id: 'c', text: '3:00 PM' },
      { id: 'd', text: '5:00 PM' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 4, Tutorial'),
  question('m14-quiz-q3', 'm14-quiz', 'If a listing is blocked or inactive, what is the correct red-flag action?',
    [
      { id: 'a', text: 'Self-fix immediately without approval' },
      { id: 'b', text: 'Escalate immediately to team leader — do not self-fix without approval' },
      { id: 'c', text: 'Ignore until next week' },
      { id: 'd', text: 'Lower the price' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 4.4'),
  question('m14-quiz-q4', 'm14-quiz', 'Which marketplaces must be checked during the start-of-day sales scan?',
    [
      { id: 'a', text: 'Amazon US only' },
      { id: 'b', text: 'Amazon US, Amazon UK, eBay, Shopify, B&Q' },
      { id: 'c', text: 'eBay and Shopify only' },
      { id: 'd', text: 'Whichever the staff member prefers' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 4.1'),

  // Module 15 quiz (Step 8)
  question('m15-quiz-q1', 'm15-quiz', 'What is the target for stranded inventory by end of each working day?',
    [
      { id: 'a', text: 'Under 10 items' },
      { id: 'b', text: 'Zero' },
      { id: 'c', text: 'Under 5% of catalogue' },
      { id: 'd', text: 'No target is set' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 6, Best Practice'),
  question('m15-quiz-q2', 'm15-quiz', 'Within what timeframe should zero-stock SKUs be cleared, per the handbook?',
    [
      { id: 'a', text: '24–48 hours' },
      { id: 'b', text: '7 days' },
      { id: 'c', text: '30 days' },
      { id: 'd', text: 'No timeframe is specified' },
    ], 'a', 'PH/Sales BGCT Handbook v1.0 — Section 6, "Zero FBA Stock Identification"'),
  question('m15-quiz-q3', 'm15-quiz', 'Who is the named escalation contact for urgent logistics issues in Section 6?',
    [
      { id: 'a', text: 'The Operations Manager' },
      { id: 'b', text: 'Mithusa' },
      { id: 'c', text: 'The PH Team Leader' },
      { id: 'd', text: 'The Account Holder' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 6, Guidance'),
  question('m15-quiz-q4', 'm15-quiz', 'A SKU is flagged as a "Fast-Moving Low Stock Alert" when it has less than how many days of stock remaining?',
    [
      { id: 'a', text: '3 days' },
      { id: 'b', text: '7 days' },
      { id: 'c', text: '14 days' },
      { id: 'd', text: '30 days' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 6, "Fast-Moving Low Stock Alert"'),

  // Module 16 quiz (Step 9)
  question('m16-quiz-q1', 'm16-quiz', 'Which of these is listed as a Step 9 (Competitor & Market Analysis) topic?',
    [
      { id: 'a', text: 'Price benchmarking' },
      { id: 'b', text: 'Break-even calculation' },
      { id: 'c', text: 'Backend keywords' },
      { id: 'd', text: 'Stranded inventory' },
    ], 'a', 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 9'),
  question('m16-quiz-q2', 'm16-quiz', 'What analysis is listed alongside price benchmarking under Step 9?',
    [
      { id: 'a', text: 'Review comparison' },
      { id: 'b', text: 'PPC bid strategy' },
      { id: 'c', text: 'FBA conversion' },
      { id: 'd', text: 'Weekly reporting' },
    ], 'a', 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 9'),
  question('m16-quiz-q3', 'm16-quiz', 'What is the final topic listed under Step 9 — Competitor & Market Analysis?',
    [
      { id: 'a', text: 'Ranking comparison' },
      { id: 'b', text: 'Gap identification' },
      { id: 'c', text: 'Feature comparison' },
      { id: 'd', text: 'Price benchmarking' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 9'),

  // Module 17 quiz (Step 10)
  question('m17-quiz-q1', 'm17-quiz', 'How many steps make up the PH/Sales Team’s ASIN workflow, per Section 2?',
    [
      { id: 'a', text: '5' },
      { id: 'b', text: '7' },
      { id: 'c', text: '9' },
      { id: 'd', text: '11' },
    ], 'c', 'PH/Sales BGCT Handbook v1.0 — Section 2, step table'),
  question('m17-quiz-q2', 'm17-quiz', 'What is the first step in the 9-step ASIN workflow?',
    [
      { id: 'a', text: 'Data Analysis & Performance Review' },
      { id: 'b', text: 'ASIN Allocation' },
      { id: 'c', text: 'Problem Identification' },
      { id: 'd', text: 'Execution' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 2, Step 1'),
  question('m17-quiz-q3', 'm17-quiz', 'According to Section 2, work that is not recorded in the tracking sheet is:',
    [
      { id: 'a', text: 'Still valid if reported verbally' },
      { id: 'b', text: 'Work that does not exist' },
      { id: 'c', text: 'Automatically escalated' },
      { id: 'd', text: 'Reviewed weekly regardless' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 2, Best Practice'),
  question('m17-quiz-q4', 'm17-quiz', 'What must never be skipped when moving toward Scaling (Step 8) in the ASIN workflow?',
    [
      { id: 'a', text: 'Steps 2–7' },
      { id: 'b', text: 'Only Step 1' },
      { id: 'c', text: 'Nothing needs to be completed first' },
      { id: 'd', text: 'Step 9 only' },
    ], 'a', 'PH/Sales BGCT Handbook v1.0 — Section 2, Guidance'),

  // Module 18 quiz (Step 11)
  question('m18-quiz-q1', 'm18-quiz', 'Per Section 2, ASINs are considered eligible for scaling actions (increased PPC, FBA, variation expansion) at what monthly order threshold?',
    [
      { id: 'a', text: '5+ orders/month' },
      { id: 'b', text: '20+ orders/month' },
      { id: 'c', text: '50+ orders/month' },
      { id: 'd', text: '100+ orders/month' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 2, Step 8'),
  question('m18-quiz-q2', 'm18-quiz', 'What is required before a Kill SKU decision is made, per Section 2?',
    [
      { id: 'a', text: 'A single week of poor sales' },
      { id: 'b', text: 'A full 30-day revival attempt' },
      { id: 'c', text: 'Manager approval only, no revival attempt' },
      { id: 'd', text: 'No process is required' },
    ], 'b', 'PH/Sales BGCT Handbook v1.0 — Section 2, Step 9'),
  question('m18-quiz-q3', 'm18-quiz', 'Which of these is listed as a Step 11 (Scaling & Decision Making) topic?',
    [
      { id: 'a', text: 'International expansion' },
      { id: 'b', text: 'Backend keywords' },
      { id: 'c', text: 'Daily performance sheet' },
      { id: 'd', text: 'Item specifics' },
    ], 'a', 'PH/Sales BGCT Handbook v1.0 — Section 1, Step 11'),
];
