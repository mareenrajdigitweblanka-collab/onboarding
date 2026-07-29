// programmes/us-canada-market-rebuild-team-question-bank.js — US and Canada
// Market Rebuild Team QUIZZES + QUESTIONS.
//
// One Skill Check per module, 6 in total, 6 questions each, 36 questions
// total. passingScorePct/maxAttempts REUSE the exact existing TOSP prototype
// configuration (80% / 3 attempts) unchanged — no new scoring logic or
// thresholds are introduced, and the shared quiz engine (services/quiz-
// service.js, views/quiz-view.js) is reused completely unmodified: the
// correct answer is never shown before submission.
//
// Every question and every answer option is generated only from the two US
// BGCT Operations Handbook documents and carries a `source` citation. No
// question tests: Canada-specific content (none exists in source); any
// invented pricing formula, currency conversion, exchange rate, tax/duty
// rule, or compliance/certification threshold; the personal name in the
// confidential source subfolder path; or any unresolved SOURCE_CONFLICT value
// (the Walmart platform-scope conflict and the 2%-vs-4% Late Shipment Rate
// wording conflict are each taught as a documented conflict, never quizzed as
// if a single undisputed number). See docs/us-canada-market-rebuild-team-
// exclusions.md for the full register.

import { MODULES } from './us-canada-market-rebuild-team-modules.js';

// Reuse the exact existing prototype quiz configuration: 80% to pass, 3
// attempts per Skill Check.
const PASSING_SCORE_PCT = 80;
const MAX_ATTEMPTS = 3;

export const QUIZZES = MODULES.map((m) => ({
  id: `${m.id}-quiz`,
  moduleId: m.id,
  title: `${m.title} — Skill Check`,
  passingScorePct: PASSING_SCORE_PCT,
  maxAttempts: MAX_ATTEMPTS,
}));

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

const opt = (a, b, c, d) => [
  { id: 'a', text: a },
  { id: 'b', text: b },
  { id: 'c', text: c },
  { id: 'd', text: d },
];

export const QUESTIONS = [
  // ======================================================================
  // Module 1 — BGCT Foundation, Scope and Account Holder Accountability
  // ======================================================================
  question('usca-m1-q1', 'usca-m1-quiz',
    'According to Section B.2 ("Reason This Standard Was Chosen"), BGCT was adopted primarily to correct which four recurring root-cause failure categories?',
    opt('Advertising overspend, currency errors, warehouse rent, and staff turnover', 'Warehouse errors, listing inaccuracies, uncontrolled refund approvals (including duplicate compensation), and late single-slot shipment processing', 'Canada market entry, tax registration, product certification, and supplier vetting', 'Website design, checkout speed, mobile compatibility, and page load time'),
    'b', 'US BGCT Operations Handbook — Best Practice & Guidance Edition, Section B.2 ("Reason This Standard Was Chosen")'),
  question('usca-m1-q2', 'usca-m1-quiz',
    'Do either of the two source documents define a formal "market rebuild" methodology?',
    opt('Yes — both documents describe a step-by-step market-rebuild lifecycle', 'No — neither source document uses the word "rebuild" anywhere; "Market Rebuild" is only this programme\'s approved project title label, and this programme applies the approved US marketplace operational guidance (BGCT) the sources actually contain', 'Yes — one document defines it, and the other document adds market-entry analysis', 'No — the sources are silent, so this programme invents a market-rebuild lifecycle to fill the gap'),
    'b', 'Discovery finding — full-text search of both source documents (see docs/us-canada-market-rebuild-team-source-map.md); this programme\'s own scope statement'),
  question('usca-m1-q3', 'usca-m1-quiz',
    'According to the "Platforms Covered" field in the Best Practice & Guidance Edition, which marketplaces are confirmed within this programme\'s scope?',
    opt('Amazon (US), eBay (US), and Wayfair (US)', 'Amazon (US and Canada) and eBay (US and Canada)', 'Amazon, eBay, Wayfair, and Walmart, all across US and Canada', 'Only Amazon (US)'),
    'a', 'US BGCT Operations Handbook — Best Practice & Guidance Edition, Section B.1 ("Standard Identification — Platforms Covered")'),
  question('usca-m1-q4', 'usca-m1-quiz',
    'A new learner asks whether this programme covers any Canada-specific marketplace rule. What is the correct answer?',
    opt('Yes — Canada rules are the same as US rules, so they are taught together', 'Yes — a separate Canada section exists later in the programme', 'No — a full-text check of both source documents found zero Canada-specific content; Canada is not supported by source and is not taught', 'Only for Amazon Canada, not eBay Canada'),
    'c', 'Discovery finding — confirmed by full-text search of both source documents (see docs/us-canada-market-rebuild-team-source-map.md)'),
  question('usca-m1-q5', 'usca-m1-quiz',
    'Per the Account Holder\'s weekly responsibilities, which action is required?',
    opt('Validate PPC performance with the CPPC team', 'Personally execute all PPC campaigns without CPPC involvement', 'Ignore competitor pricing unless a customer complains', 'Delay account-health dashboard checks until month-end'),
    'a', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section A.3.2 ("Weekly Responsibilities")'),
  question('usca-m1-q6', 'usca-m1-quiz',
    'Who holds final accountability for account health and profitability across all four specialist teams?',
    opt('The CPPC Team', 'The Customer Service Team (CST)', 'The Account Holder', 'Operations/Warehouse'),
    'c', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section A.4 ("Team Structure & Roles")'),

  // ======================================================================
  // Module 2 — Account Health, Governance and Pricing Oversight
  // ======================================================================
  question('usca-m2-q1', 'usca-m2-quiz',
    'A policy warning appears on an account and the PH team delays resolving it. What does BGCT\'s critical rule require?',
    opt('Wait until the next weekly review to discuss it', 'The Account Holder escalates and ensures resolution — there is zero tolerance for ignored compliance warnings', 'Ignore it if the warning has appeared before with no consequence', 'Ask the customer whether the warning matters to them'),
    'b', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section A.5 ("Account Health & Compliance Guidelines — Critical Rule")'),
  question('usca-m2-q2', 'usca-m2-quiz',
    'What is the mandatory Order Defect Rate (ODR) target?',
    opt('Below 1%', 'Below 5%', 'Below 10%', 'No target is set for ODR'),
    'a', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section A.5.1; Best Practice & Guidance Edition, Section B.3 ("Mandatory Account Health KPI Targets")'),
  question('usca-m2-q3', 'usca-m2-quiz',
    'The source documents state conflicting numeric values for Late Shipment Rate. How does this programme handle that, and what should a learner do if they need the current figure?',
    opt('Silently pick whichever figure appears more often and teach it as the target, without mentioning the disagreement', 'Document the disagreement as an unresolved SOURCE_CONFLICT, teach neither disputed number as the approved target, and direct the learner to the current approved operational source rather than choosing a figure independently', 'Average the two figures into a new number and teach that instead', 'Ignore Late Shipment Rate entirely and remove it from the KPI list'),
    'b', 'US BGCT Operations Handbook — both editions (documented SOURCE_CONFLICT; see docs/us-canada-market-rebuild-team-exclusions.md); this programme\'s own no-independent-selection rule'),
  question('usca-m2-q4', 'usca-m2-quiz',
    'What is the stated minimum profit-margin target range, depending on SKU?',
    opt('5-10%', '10-15%', '20-30%', '40-50%'),
    'c', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section A.6.3 ("Profitability Rules")'),
  question('usca-m2-q5', 'usca-m2-quiz',
    'On Amazon (US accounts), what daily check does BGCT require regarding Buy Box?',
    opt('Buy Box monitoring is optional and only checked monthly', 'Buy Box monitoring to maintain the highest possible share', 'Buy Box is only relevant for eBay, not Amazon', 'Buy Box checks are owned entirely by the CPPC team'),
    'b', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section A.7.1 ("Amazon — All US Accounts")'),
  question('usca-m2-q6', 'usca-m2-quiz',
    'PPC spend is rising but sales are not. What does BGCT require, and which existing TOSP programme owns the general PPC execution this connects to?',
    opt('Increase the budget further and monitor next month; PPC is owned by the Customer Service Team programme', 'Stop any unnecessary or wasteful PPC spend immediately; general PPC campaign operation is owned by the existing Centralized PPC Team programme', 'Nothing — PPC spend is not monitored under BGCT', 'Cancel all campaigns permanently without review'),
    'b', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section A.6.3; cross-programme reference to the existing Centralized PPC Team programme'),

  // ======================================================================
  // Module 3 — Warehouse Operations: Picking and Packing
  // ======================================================================
  question('usca-m3-q1', 'usca-m3-quiz',
    'A picker locates a product on the shelf by matching the product name printed on the box, without scanning the barcode. What does BGCT say about this?',
    opt('This is acceptable if the picker is experienced', 'This is the documented anti-example behaviour that caused a wrong-item shipment (DW-KB-WHT-001 shipped instead of DW-KB-BLK-001) — SKU barcode scanning is mandatory', 'This is only a problem for bundle products', 'This is acceptable as long as the packer catches the error later'),
    'b', 'US BGCT Operations Handbook — Best Practice & Guidance Edition, Section T.1.1 (anti-example)'),
  question('usca-m3-q2', 'usca-m3-quiz',
    'A scanned SKU does not match the order on screen. What is the required action?',
    opt('Pick the item anyway since the shelf location was correct', 'Stop, do not pick, and report the mismatch to the supervisor immediately', 'Substitute a similar item without approval', 'Continue and flag it at the packing stage instead'),
    'b', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section B.1.2; Best Practice & Guidance Edition, Section G.2.1 (Step 03, Decision Point)'),
  question('usca-m3-q3', 'usca-m3-quiz',
    'What is the target for Damage Return Rate?',
    opt('≤1%', '≤5%', '≤10%', 'No target is set'),
    'a', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section B.1.3 (KPI Targets)'),
  question('usca-m3-q4', 'usca-m3-quiz',
    'Before packing, a product is found to have a visible scratch. What is the correct action?',
    opt('Pack it anyway since it still functions', 'Remove it from the pick, report to the supervisor, and pick a replacement unit — never pack a damaged item', 'Apply extra bubble wrap and pack it', 'Downgrade the listing description to match the damage'),
    'b', 'US BGCT Operations Handbook — Best Practice & Guidance Edition, Section G.2.2 (Step 01, Decision Point)'),
  question('usca-m3-q5', 'usca-m3-quiz',
    'What does the Same-Day Shipment Control checklist require regarding order downloads?',
    opt('Once per day, at the end of the shift', 'Every hour throughout the operating day', 'Only when a customer contacts about a delay', 'Once per week during the management review'),
    'b', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section B.1.4 ("Same-Day Shipment Control")'),
  question('usca-m3-q6', 'usca-m3-quiz',
    'For a bundle product, when may a picker proceed to the packing station?',
    opt('As soon as the main item is scanned, regardless of accessories', 'Only after every accessory, cable, manual, or component is checked against the component verification sheet and confirmed', 'Immediately, since bundle verification happens at packing instead', 'Only if the customer specifically requested full contents'),
    'b', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section B.1.1; Best Practice & Guidance Edition, Section G.2.1 (Step 04, Milestone)'),

  // ======================================================================
  // Module 4 — Listing Accuracy Readiness
  // ======================================================================
  question('usca-m4-q1', 'usca-m4-quiz',
    'What is the required reference source for verifying a listing image, per BGCT?',
    opt('The supplier\'s website description', 'A previous, already-published listing', 'The physical product or the Account-Holder-approved specification sheet', 'Customer reviews from a similar product'),
    'c', 'US BGCT Operations Handbook — Best Practice & Guidance Edition, Section G.3.1 (Step 01, Evidence Point)'),
  question('usca-m4-q2', 'usca-m4-quiz',
    'A bullet point claims "100% genuine leather" but the physical product is synthetic leather. What does BGCT\'s worked anti-example say happens?',
    opt('Nothing — bullet points are considered marketing language, not factual claims', 'A "not as described" return results, and this is recorded as a process violation', 'The customer is expected to notice and accept it', 'The claim is corrected only if a refund is requested'),
    'b', 'US BGCT Operations Handbook — Best Practice & Guidance Edition, Section T.2 (anti-example)'),
  question('usca-m4-q3', 'usca-m4-quiz',
    'For a variation listing (e.g. Red Small, Blue Large), what must be validated before publishing?',
    opt('Only the price for each variant', 'That each SKU maps to the correct image and title using the SKU-Image mapping sheet', 'Only the shipping weight', 'Nothing extra — variation listings use the same check as standalone listings'),
    'b', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section B.2.3; Best Practice & Guidance Edition, Section G.3.1 (Step 06)'),
  question('usca-m4-q4', 'usca-m4-quiz',
    'What is the KPI target for Content Mismatch Incidents?',
    opt('≤1%', '≤0.5%', 'Zero tolerance', 'No target is set'),
    'c', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section B.2.3 (KPI Targets)'),
  question('usca-m4-q5', 'usca-m4-quiz',
    'The Account Holder is unavailable when a listing is ready to publish. What does BGCT require?',
    opt('Publish it anyway since all other checks passed', 'The listing is held — not published — until Account Holder approval is obtained', 'A junior team member may approve it instead', 'Publish with a note that approval is pending'),
    'b', 'US BGCT Operations Handbook — Best Practice & Guidance Edition, Section G.3.1 (Step 07, Escalation Point)'),
  question('usca-m4-q6', 'usca-m4-quiz',
    'What is the KPI target for "Not As Described" Return Rate?',
    opt('≤1%', '≤5%', '≤10%', 'No target is set'),
    'a', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section B.2.1 (KPI Targets)'),

  // ======================================================================
  // Module 5 — Refund, Replacement and Return Inspection
  // ======================================================================
  question('usca-m5-q1', 'usca-m5-quiz',
    'A customer claims an item is faulty and requests a refund, but has not returned it yet. What does BGCT\'s core refund policy require?',
    opt('Process the refund immediately based on the customer\'s claim', 'The refund is only approved after the warehouse receives and physically validates the returned item — no refund on claim alone', 'Offer a partial refund as a compromise without inspection', 'Ask a second CST agent to approve it based on the photos alone'),
    'b', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section B.3.1; Best Practice & Guidance Edition, Section G.4.1 ("Core Refund Policy")'),
  question('usca-m5-q2', 'usca-m5-quiz',
    'Before any refund action, what MUST be checked first, per the zero-duplicate-compensation rule?',
    opt('The customer\'s order value', 'Whether a Replacement Flag exists in the system, order history, and customer communications', 'The customer\'s account age', 'The product\'s current stock level'),
    'b', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section B.3.2 ("Refund vs Replacement Validation")'),
  question('usca-m5-q3', 'usca-m5-quiz',
    'A replacement was confirmed shipped three days ago. The customer now also requests a refund. What is the correct action?',
    opt('Process both, since the customer asked twice', 'Do NOT process the refund — close the case and notify the customer the replacement is already dispatched', 'Refund first, then cancel the replacement', 'Escalate to Operations Manager for a decision on which to keep'),
    'b', 'US BGCT Operations Handbook — Best Practice & Guidance Edition, Section T.3 (worked example — replacement already shipped)'),
  question('usca-m5-q4', 'usca-m5-quiz',
    'What is the Warehouse-to-CST Communication SLA after a return inspection?',
    opt('≤1 hour', '≤4 hours', '≤24 hours', '≤48 hours'),
    'b', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section B.3.3 (KPI Targets)'),
  question('usca-m5-q5', 'usca-m5-quiz',
    'What condition categories does the warehouse use to disposition a returned item?',
    opt('Approved / Rejected', 'Resaleable / Damaged / Missing Parts', 'Refund / No Refund', 'Fast-Track / Standard'),
    'b', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section B.3.3 ("Return Inspection Communication Criteria")'),
  question('usca-m5-q6', 'usca-m5-quiz',
    'By when must a refund be completed once the warehouse inspection is finished?',
    opt('Within 12 hours', 'Within 24 hours', 'Within 48 hours', 'Within 7 days'),
    'c', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section B.3.1 (KPI Targets); Best Practice & Guidance Edition, Section T.3 (Step 07)'),

  // ======================================================================
  // Module 6 — Shipment Processing, Escalation and Weekly Governance
  // ======================================================================
  question('usca-m6-q1', 'usca-m6-quiz',
    'What operational failure caused the 2-Slot Processing Model to be introduced?',
    opt('Too many warehouse staff were scheduled at once', 'Orders were labelled and shipped only around 8:00 PM Sri Lanka Time, causing US peak-hour orders to cross the 24-hour shipment window', 'The shipping carrier changed its pricing', 'Customers were placing orders in the wrong currency'),
    'b', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section B.4 ("Current Issue Identified")'),
  question('usca-m6-q2', 'usca-m6-quiz',
    'An order is received at 09:30 AM Sri Lanka Time. Which processing slot does it fall into?',
    opt('Slot 01 — same morning', 'Slot 02 — same evening', 'The next day\'s Slot 01', 'It is not covered by either slot'),
    'b', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section B.4 ("Label Creation Priority Rules")'),
  question('usca-m6-q3', 'usca-m6-quiz',
    'A shipping label is scanned and does not match the order in the system. What is required?',
    opt('Apply it anyway since the package looks correct', 'Remove the label, print the correct one, and re-apply', 'Ship without a label and add tracking later', 'Ask the customer to confirm the address instead'),
    'b', 'US BGCT Operations Handbook — Best Practice & Guidance Edition, Section T.4 (Step 04, Accident Spot)'),
  question('usca-m6-q4', 'usca-m6-quiz',
    'A shipment delay is discovered with no order-SLA breach yet, but a duplicate refund/replacement is also detected in a separate case. According to the severity table, how should these two issues be classified?',
    opt('Both are Low severity, addressed at the next weekly review', 'The shipment delay is Critical only if SLA breach is imminent; the duplicate refund/replacement is always Critical (same day)', 'Both are automatically Medium severity regardless of detail', 'Severity is not defined anywhere in BGCT'),
    'b', 'US BGCT Operations Handbook — Best Practice & Guidance Edition, Section G.6 ("Escalation Guidance — Severity Table")'),
  question('usca-m6-q5', 'usca-m6-quiz',
    'A situation arises that is not covered by any specific rule in the BGCT handbook. What does the "No-Rule Point" require?',
    opt('The staff member should make their best independent judgement call', 'No staff member should make a judgement call — escalate to the Account Holder, document it, and add a new rule at the next monthly review', 'Ignore the situation until it recurs a second time', 'Apply the closest Canada-market rule instead'),
    'b', 'US BGCT Operations Handbook — Best Practice & Guidance Edition, Section G.6 ("No-Rule Point")'),
  question('usca-m6-q6', 'usca-m6-quiz',
    'What four outputs must be documented before a weekly management review session ends?',
    opt('Attendance list, meeting duration, next meeting date, and catering notes', 'A summary of KPI performance vs. targets, root cause for any missed KPI, a corrective-action owner and deadline for every miss, and confirmed priorities for the coming week', 'Only a list of KPIs that passed', 'A ranked list of best-performing staff'),
    'b', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section C.6 ("Weekly Review Output"); Best Practice & Guidance Edition, Section T.6 ("Mandatory Weekly Review Output")'),
];
