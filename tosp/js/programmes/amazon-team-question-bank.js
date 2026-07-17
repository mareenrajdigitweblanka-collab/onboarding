// programmes/amazon-team-question-bank.js — Amazon Team QUIZZES + QUESTIONS.
//
// One Skill Check per module. passingScorePct/maxAttempts REUSE the exact
// existing TOSP prototype configuration (80% / 3 attempts) unchanged — no new
// scoring logic or thresholds are introduced (user-confirmed requirement).
//
// Every question and every answer option is generated only from the FINAL
// Amazon source documents and carries a `source` citation. Distractors are
// plausible but are NOT presented as real company rules. Content excluded from
// quizzes (per docs/amazon-team-source-map.md): named individuals, confidential
// account identifiers, live scorecard figures, and any figure under an
// unresolved SOURCE_CONFLICT (backend byte limit; description character limit).

import { MODULES } from './amazon-team-modules.js';

// Reuse the exact existing prototype quiz configuration (see PH programme /
// config.js history): 80% to pass, 3 attempts per Skill Check.
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
  // ---- Module 1 — Account Health & Compliance ----
  question('az-m1-quiz-q1', 'az-m1-quiz', 'On the Account Health Rating scale (0–1,000), which range is "Healthy" (green)?',
    opt('200 to 1,000', '100 to 199', '0 to 99', '500 to 1,000'), 'a',
    'Amazon Account Health & Performance Guide 2026 — Account Health Rating'),
  question('az-m1-quiz-q2', 'az-m1-quiz', 'The Order Defect Rate (ODR) must stay below which level (measured over 60 days)?',
    opt('4%', '2%', '1%', '5%'), 'c',
    'Amazon Account Health & Performance Guide 2026 — Performance Metrics'),
  question('az-m1-quiz-q3', 'az-m1-quiz', 'The Valid Tracking Rate (VTR) must exceed:',
    opt('80%', '90%', '95%', '99%'), 'c',
    'Amazon Account Health & Performance Guide 2026 — Performance Metrics'),
  question('az-m1-quiz-q4', 'az-m1-quiz', 'Account Health Assurance (AHA) requires maintaining an AHR of:',
    opt('250+ for 6 consecutive months (no more than 10 days below 250)', '200+ for 3 months', '100+ for 12 months', '500+ for 6 months'), 'a',
    'Amazon Account Health & Performance Guide 2026 — Account Health Assurance'),

  // ---- Module 2 — Listing SEO & Content ----
  question('az-m2-quiz-q1', 'az-m2-quiz', 'Which part of the title is described as the most important because it is what mobile shoppers see?',
    opt('The first 40 characters', 'The first 80 characters', 'The first 150 characters', 'The last 20 characters'), 'b',
    'Amazon Listing SEO Guideline (UK Marketplace) — Product Title'),
  question('az-m2-quiz-q2', 'az-m2-quiz', 'What share of Amazon UK traffic comes from mobile?',
    opt('About 25%', 'About 50%', 'Over 75%', 'About 90%'), 'c',
    'Amazon Listing SEO Guideline (UK Marketplace) — Product Title'),
  question('az-m2-quiz-q3', 'az-m2-quiz', 'How many bullet points should a listing use?',
    opt('3', '5', '7', '10'), 'b',
    'Amazon Listing SEO Guideline (UK Marketplace) — Bullet Points'),
  question('az-m2-quiz-q4', 'az-m2-quiz', 'Backend search terms must NOT contain which of the following?',
    opt('Singular-form keywords', 'Synonyms', 'The brand, ASIN, or competitor brand names', 'Lowercase words'), 'c',
    'Amazon Listing SEO Guideline (UK Marketplace) — Backend Search Terms'),

  // ---- Module 3 — Keyword Research ----
  question('az-m3-quiz-q1', 'az-m3-quiz', 'A 4+ word long-tail keyword should be targeted using which match type?',
    opt('Broad', 'Phrase', 'Exact', 'No match type is needed'), 'c',
    'Complete Amazon Keyword Research Guide (2026) — Match Types'),
  question('az-m3-quiz-q2', 'az-m3-quiz', 'For a new product launch, target keywords with a CPR (Cerebro Product Rank) under:',
    opt('50', '100', '30', '500'), 'a',
    'Complete Amazon Keyword Research Guide (2026) — Keyword Scoring'),
  question('az-m3-quiz-q3', 'az-m3-quiz', 'Under the 2026 A10+ algorithm, which factor carries the highest weight (35%)?',
    opt('Keyword Relevance', 'Conversion Rate', 'Sales Velocity', 'External Traffic'), 'b',
    'Complete Amazon Keyword Research Guide (2026) — 2026 Updates'),
  question('az-m3-quiz-q4', 'az-m3-quiz', 'How often should indexing be checked?',
    opt('Daily', 'Weekly', 'Monthly', 'Once at launch only'), 'b',
    'Complete Amazon Keyword Research Guide (2026) — Indexing'),

  // ---- Module 4 — Competitor Analysis ----
  question('az-m4-quiz-q1', 'az-m4-quiz', 'A direct competitor should be within what price range of your product?',
    opt('±5%', '±10%', '±30%', '±50%'), 'c',
    'Amazon Competitor Analysis Guidelines — Identifying Competitors'),
  question('az-m4-quiz-q2', 'az-m4-quiz', 'What is the minimum number of reviews for a product to count as a direct competitor?',
    opt('50', '100', '500', '1,000'), 'c',
    'Amazon Competitor Analysis Guidelines — Identifying Competitors'),
  question('az-m4-quiz-q3', 'az-m4-quiz', 'The competitive price "sweet spot" is:',
    opt('Within ±10% of the category average', '30% below the average', '50% above the average', 'Always the lowest price'), 'a',
    'Amazon Competitor Analysis Guidelines — Price Positioning'),
  question('az-m4-quiz-q4', 'az-m4-quiz', 'How many high-resolution images do leading listings use?',
    opt('1–2', '3–4', '7–9', '15 or more'), 'c',
    'Amazon Competitor Analysis Guidelines — Listing Benchmarks'),

  // ---- Module 5 — Pricing Strategy & Buy Box ----
  question('az-m5-quiz-q1', 'az-m5-quiz', 'On top of product cost, the break-even price must also cover:',
    opt('Only the referral fee', 'Only inbound shipping', 'The referral fee, FBA fulfilment fee, inbound shipping, average PPC per sale, and storage allocation', 'Nothing else'), 'c',
    'Dynamic Pricing Strategy Guide (2025) — Break-Even Formula'),
  question('az-m5-quiz-q2', 'az-m5-quiz', 'The Amazon referral fee is typically:',
    opt('1–5% of the sale price', '8–15% of the sale price', '20–30% of the sale price', 'A flat 25%'), 'b',
    'Dynamic Pricing Strategy Guide (2025) — UK Fee Reference'),
  question('az-m5-quiz-q3', 'az-m5-quiz', 'What is the monthly storage cost per cubic foot in Q4 (October–December)?',
    opt('£0.75', '£1.20', '£2.40', '£5.00'), 'c',
    'Dynamic Pricing Strategy Guide (2025) — UK Fee Reference'),
  question('az-m5-quiz-q4', 'az-m5-quiz', 'What share of Amazon sales goes through the Buy Box?',
    opt('82–90%', '25–30%', 'About 50%', '100%'), 'a',
    'Dynamic Pricing Strategy Guide (2025) — Buy Box'),

  // ---- Module 6 — FBA Product Selection & Rules ----
  question('az-m6-quiz-q1', 'az-m6-quiz', 'What is the minimum customer rating required for FBA eligibility?',
    opt('3 stars or above', '4 stars or above', '4.5 stars or above', 'Any rating is acceptable'), 'b',
    'Amazon FBA Guidelines 2026 — Product Selection Eligibility'),
  question('az-m6-quiz-q2', 'az-m6-quiz', 'What is the minimum net margin (after FBA fees) required for FBA eligibility?',
    opt('20%', '30%', '45%', '60%'), 'c',
    'Amazon FBA Guidelines 2026 — Product Selection Eligibility'),
  question('az-m6-quiz-q3', 'az-m6-quiz', 'How many units must have sold in the last 30 days for a product to be FBA-eligible?',
    opt('At least 1', 'At least 5', 'At least 10', 'At least 50'), 'b',
    'Amazon FBA Guidelines 2026 — Product Selection Eligibility'),
  question('az-m6-quiz-q4', 'az-m6-quiz', 'What is the correct way to move an existing FBM product to FBA?',
    opt('Convert the FBM listing directly to FBA', 'Use "Add Another Condition" and select the FBA option', 'Delete the FBM listing and recreate it as FBA', 'There is no rule — either method is fine'), 'b',
    'Amazon FBA Guidelines 2026 — FBA Listing Conversion'),

  // ---- Module 7 — FBA Unfulfillable Inventory Settings ----
  question('az-m7-quiz-q1', 'az-m7-quiz', 'What is the cheapest way to handle unfulfillable (used/damaged) inventory?',
    opt('Dispose of it immediately', 'Return it to inventory', 'Liquidate it', 'Keep it in storage for 6 months'), 'a',
    'Amazon FBA Unfulfillable Settings Guide — Cost Comparison'),
  question('az-m7-quiz-q2', 'az-m7-quiz', 'What are the recommended values for "Return or Dispose" and "Schedule"?',
    opt('Return, Scheduled', 'Dispose, Immediate', 'Liquidate, Weekly', 'Grade & Resell, Monthly'), 'b',
    'Amazon FBA Unfulfillable Settings Guide — Recommended Configuration'),
  question('az-m7-quiz-q3', 'az-m7-quiz', 'What is the healthy target for the number of "used" SKUs?',
    opt('0–2', '10', '20', 'No target'), 'a',
    'Amazon FBA Unfulfillable Settings Guide — Success Metrics'),
  question('az-m7-quiz-q4', 'az-m7-quiz', 'Liquidation is only worthwhile for high-value items because its commission is:',
    opt('5–10%', '15–30%', '50%', '80–95%'), 'd',
    'Amazon FBA Unfulfillable Settings Guide — Cost Comparison'),

  // ---- Module 8 — SIPP ----
  question('az-m8-quiz-q1', 'az-m8-quiz', 'What does the SIPP programme do?',
    opt('Waives the extra oversized packaging fee by shipping in the product’s own packaging', 'Increases the referral fee', 'Guarantees faster delivery', 'Removes all storage fees'), 'a',
    'SIPP – Ships in Product Packaging (Webinar Summary) — Overview'),
  question('az-m8-quiz-q2', 'az-m8-quiz', 'During SIPP testing, how many sides of the packaging are photographed?',
    opt('All 6 sides', '4 sides', '2 sides', '1 side'), 'a',
    'SIPP – Ships in Product Packaging (Webinar Summary) — Enrollment Steps'),
  question('az-m8-quiz-q3', 'az-m8-quiz', 'How long does approval of a SIPP Seller Support case take?',
    opt('Instantly', '5–7 business days', '24 hours', '30 days'), 'b',
    'SIPP – Ships in Product Packaging (Webinar Summary) — Enrollment Steps'),

  // ---- Module 9 — Vendor Central Introduction ----
  question('az-m9-quiz-q1', 'az-m9-quiz', 'Vendor Central is which selling model?',
    opt('First-party (1P) wholesale — you sell to Amazon', 'Third-party (3P) — you sell directly', 'Consignment', 'Dropshipping'), 'a',
    'Amazon Vendor Central Introduction Guide 2026 — Vendor vs Seller Central'),
  question('az-m9-quiz-q2', 'az-m9-quiz', 'What are the Vendor Central payment terms?',
    opt('Immediate', 'Every 14 days', '30 NET days', '60 NET days'), 'd',
    'Amazon Vendor Central Introduction Guide 2026 — Vendor vs Seller Central'),
  question('az-m9-quiz-q3', 'az-m9-quiz', 'Within what window must a Purchase Order be confirmed before it auto-cancels?',
    opt('24–72 hours', '1 hour', '7 days', '30 days'), 'a',
    'Amazon Selling Platforms Guide 2026 — PO Handling'),

  // ---- Module 10 — Vendor Product Selection & Migration ----
  question('az-m10-quiz-q1', 'az-m10-quiz', 'Which products are a MANDATORY transfer to Vendor Central?',
    opt('Products priced below £10', 'Products priced above £50', 'Products priced £10–£20', 'All products'), 'a',
    'Vendor Product Selection & Migration Guide 2026 — Category 1'),
  question('az-m10-quiz-q2', 'az-m10-quiz', 'Products above which price should NOT be migrated to Vendor Central?',
    opt('£10', '£20', '£50', '£100'), 'c',
    'Vendor Product Selection & Migration Guide 2026 — Exclusions'),
  question('az-m10-quiz-q3', 'az-m10-quiz', 'For a £10–£20 product where Vendor and Seller margins are within 2% of each other, you should:',
    opt('Migrate it automatically', 'Escalate to the Sales Manager', 'Never migrate it', 'Delete the listing'), 'b',
    'Vendor Product Selection & Migration Guide 2026 — Category 2'),
  question('az-m10-quiz-q4', 'az-m10-quiz', 'When can the Seller Central listing be deleted after migration?',
    opt('Immediately', 'After 7 days', 'Not until at least 30 days after Vendor go-live', 'Never'), 'c',
    'Vendor Product Selection & Migration Guide 2026 — Migration Strategy'),

  // ---- Module 11 — Vendor Listing Creation ----
  question('az-m11-quiz-q1', 'az-m11-quiz', 'The main image background must be:',
    opt('Pure white (RGB 255,255,255)', 'Light grey', 'Any solid colour', 'Transparent'), 'a',
    'LEDSone Vendor Central Listings Guide 2026 — Main Image Requirements'),
  question('az-m11-quiz-q2', 'az-m11-quiz', 'The product must fill at least what percentage of the main-image frame?',
    opt('50%', '70%', '85%', '100%'), 'c',
    'LEDSone Vendor Central Listings Guide 2026 — Main Image Requirements'),
  question('az-m11-quiz-q3', 'az-m11-quiz', 'What is the minimum main-image resolution?',
    opt('500×500 pixels', '800×800 pixels', '1,000×1,000 pixels', '2,000×2,000 pixels'), 'c',
    'LEDSone Vendor Central Listings Guide 2026 — Main Image Requirements'),
  question('az-m11-quiz-q4', 'az-m11-quiz', 'What is the maximum title length for a Vendor listing?',
    opt('80 characters', '200 characters (keep under 150 for mobile)', '500 characters', 'Unlimited'), 'b',
    'LEDSone Vendor Central Listings Guide 2026 — Listing Creation Steps'),

  // ---- Module 12 — Vendor PO Fulfilment & Label Booking ----
  question('az-m12-quiz-q1', 'az-m12-quiz', 'Within how long must a PO be confirmed?',
    opt('1 hour', '24 hours', '72 hours', '7 days'), 'b',
    'LEDSone Label Booking Guide 2026 — PO Confirmation'),
  question('az-m12-quiz-q2', 'az-m12-quiz', 'What is the maximum weight for a single carton?',
    opt('15 kg', '23 kg', '30 kg', '50 kg'), 'b',
    'LEDSone Label Booking Guide 2026 — Packing'),
  question('az-m12-quiz-q3', 'az-m12-quiz', 'To avoid a chargeback, the total ASN units must equal:',
    opt('Any reasonable estimate', 'The packed units and the PO-confirmed quantity', 'More than the PO quantity', 'The invoice total only'), 'b',
    'LEDSone Label Booking Guide 2026 — ASN & Labelling'),
  question('az-m12-quiz-q4', 'az-m12-quiz', 'What is the minimum percentage of cartons that must be spot-checked?',
    opt('1%', '10%', '25%', '100%'), 'b',
    'LEDSone Label Booking Guide 2026 — ASN & Labelling'),

  // ---- Module 13 — Vendor Invoicing ----
  question('az-m13-quiz-q1', 'az-m13-quiz', 'You can raise an invoice for a PO only once it is:',
    opt('Created', 'Confirmed', 'Shipped (with the ASN already submitted)', 'Received by the FC'), 'c',
    'Amazon Vendor Central Invoice Guide 2026 — Prerequisites'),
  question('az-m13-quiz-q2', 'az-m13-quiz', 'What is the standard VAT rate for LED / lighting products?',
    opt('GB 0%', 'GB 5%', 'GB 15%', 'GB 20%'), 'd',
    'Amazon Vendor Central Invoice Guide 2026 — Tax Rates'),
  question('az-m13-quiz-q3', 'az-m13-quiz', 'Invoice numbers must be:',
    opt('Random', 'Unique and sequential', 'Reused each month', 'Optional'), 'b',
    'Amazon Vendor Central Invoice Guide 2026 — Prerequisites'),
  question('az-m13-quiz-q4', 'az-m13-quiz', 'What payment terms appear on the invoice header?',
    opt('Due on receipt', '14 NET days', '30 NET days', '60 NET days'), 'd',
    'Amazon Vendor Central Invoice Guide 2026 — Tax Rates & Payment'),

  // ---- Module 14 — Receive Variance & Shortage Disputes ----
  question('az-m14-quiz-q1', 'az-m14-quiz', 'What is the shortage-dispute window from the invoice date (after which the tool locks)?',
    opt('7 days', '14 days', '30 days', '60 days'), 'c',
    'Shortage Claims & Dispute Resolution Handbook 2026 — Dispute Window'),
  question('az-m14-quiz-q2', 'az-m14-quiz', 'How long should the daily receive-variance check take?',
    opt('10–15 minutes', 'A full hour', 'Under 1 minute', 'Only weekly, not daily'), 'a',
    'Receive Variance Dashboard Daily Check Guide 2026 — Daily Routine'),
  question('az-m14-quiz-q3', 'az-m14-quiz', 'A fulfilment centre (FC) is blocked after how many unresolved failures?',
    opt('1', '2 or more', '5', '10'), 'b',
    'Shortage Claims & Dispute Resolution Handbook 2026 — Block FC Rule'),
  question('az-m14-quiz-q4', 'az-m14-quiz', 'What is the monthly target for dispute approval rate?',
    opt('Above 80%', 'Above 20%', 'Exactly 50%', '100%'), 'a',
    'Receive Variance Dashboard Daily Check Guide 2026 — Monthly Metrics'),

  // ---- Module 15 — Vendor Chargebacks ----
  question('az-m15-quiz-q1', 'az-m15-quiz', 'Across how many operational performance metrics can Amazon issue chargebacks?',
    opt('5', '10', '21', '50'), 'c',
    'Amazon Vendor Chargeback Guideline 2026 — Metrics'),
  question('az-m15-quiz-q2', 'az-m15-quiz', 'A chargeback that is received should be actioned within:',
    opt('48 hours', '7 days', '30 days', 'By month end'), 'a',
    'Amazon Vendor Chargeback Guideline 2026 — 10 Non-Negotiables'),
  question('az-m15-quiz-q3', 'az-m15-quiz', 'Double-wall cartons are required for shipments over:',
    opt('1 kg', '5 kg', '10 kg', '23 kg'), 'b',
    'Amazon Vendor Chargeback Guideline 2026 — Core Rules'),
  question('az-m15-quiz-q4', 'az-m15-quiz', 'Which day is treated as the critical last chance to dispute a chargeback?',
    opt('Day 7', 'Day 28–29', 'Day 60', 'Day 90'), 'b',
    'Amazon Vendor Chargeback Guideline 2026 — Escalation Timeline'),

  // ---- Module 16 — Vendor Product Returns Management ----
  question('az-m16-quiz-q1', 'az-m16-quiz', 'A Recall/Safety return requires you to:',
    opt('Stop all despatch and escalate to the Sales Manager', 'Log it as low priority', 'Resell it immediately', 'Ignore it'), 'a',
    'Amazon Vendor Product Returns Management Guide 2026 — Return Types & Priority'),
  question('az-m16-quiz-q2', 'az-m16-quiz', 'An ASIN becomes a "Priority ASIN" after how many returns in 30 days?',
    opt('1 return', '3 or more returns', '10 returns', '5 returns per week'), 'b',
    'Amazon Vendor Product Returns Management Guide 2026 — Priority ASINs'),
  question('az-m16-quiz-q3', 'az-m16-quiz', 'A Priority ASIN’s fix must be actioned within:',
    opt('24 hours', '7 days', '30 days', '90 days'), 'b',
    'Amazon Vendor Product Returns Management Guide 2026 — Priority ASINs'),
  question('az-m16-quiz-q4', 'az-m16-quiz', 'How often is the returns tracker reviewed?',
    opt('Every Monday (weekly)', 'Daily only', 'Monthly only', 'Never'), 'a',
    'Amazon Vendor Product Returns Management Guide 2026 — Routine & Disputes'),
];
