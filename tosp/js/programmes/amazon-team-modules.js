// programmes/amazon-team-modules.js — Amazon Team programme MODULES + LESSONS.
//
// SOURCE-OF-TRUTH STATUS: every Module and Lesson below is derived from one of
// the FINAL Amazon Team source documents in the repository root (see
// amazon-team-programme.js SOURCE_DOCUMENTS) and carries a `source` field
// citing the exact document/section it comes from. Content status is
// FINAL_TRUTH. Learner progress recorded in this browser remains
// PROTOTYPE_ONLY and is not official onboarding evidence.
//
// SCOPE RULES APPLIED (see docs/amazon-team-source-map.md):
//  - No PH / Sales curriculum, names, thresholds or sign-off rules appear here.
//  - Confidential account identifiers (vendor/payee codes, VAT number, live
//    account IDs, live scorecard figures) and named individuals from the
//    source documents are deliberately NOT reproduced.
//  - Where two source documents conflict (backend search-term byte limit;
//    product description character limit) the disputed figure is NOT stated as
//    fact in any lesson and is NOT used as quiz content — see SOURCE_CONFLICT
//    entries in the source map.
//  - Modules follow the source-backed sequence: FBM foundations → FBA
//    operations → Vendor Central (authored 01–10 order).

const PROGRAMME_ID = 'prog-amazon-onboarding';

const module = (id, orderIndex, title, summary, estimatedMinutes, source, prerequisiteModuleIds) => ({
  id,
  programmeId: PROGRAMME_ID,
  orderIndex,
  title,
  summary,
  estimatedMinutes,
  prerequisiteModuleIds: prerequisiteModuleIds || [],
  // Amazon Team requires NO team-leader sign-off (user-confirmed requirement).
  requiresSignoff: false,
  status: 'FINAL_TRUTH',
  source,          // === sourceReference in the data model
});

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

// ---------------------------------------------------------------------------
// MODULES — 16, across three source tracks:
//   FBM Foundations (1–5) · FBA Operations (6–8) · Vendor Central (9–16)
// ---------------------------------------------------------------------------

export const MODULES = [
  // ---- Track: FBM Foundations ----
  module('az-m1', 1, 'Account Health & Compliance',
    'The Account Health Rating scale, the performance thresholds every listing must stay within, and Account Health Assurance.',
    18, 'Amazon Account Health & Performance Guide 2026'),
  module('az-m2', 2, 'Listing SEO & Content',
    'How Amazon SEO works, the title formula and mobile-first rule, and how bullets and backend keywords are written.',
    18, 'Amazon Listing SEO Guideline (UK Marketplace)', ['az-m1']),
  module('az-m3', 3, 'Keyword Research',
    'Match types, keyword scoring with Magnet IQ and CPR, indexing checks, and the 2026 A10+ ranking weights.',
    18, 'Complete Amazon Keyword Research Guide (2026)', ['az-m2']),
  module('az-m4', 4, 'Competitor Analysis',
    'Identifying direct competitors, benchmarking their listings, and reading price positioning to find high-impact gaps.',
    16, 'Amazon Competitor Analysis Guidelines', ['az-m3']),
  module('az-m5', 5, 'Pricing Strategy & Buy Box',
    'Break-even before profit, the Amazon fees to budget for, the Buy Box, and the 8-week launch pricing ladder.',
    18, 'Dynamic Pricing Strategy Guide (2025)', ['az-m4']),

  // ---- Track: FBA Operations ----
  module('az-m6', 6, 'FBA Product Selection & Rules',
    'The FBA eligibility checklist, testing new products, the 180-day rule, FBA pricing, and the FBM→FBA conversion rule.',
    18, 'Amazon FBA Guidelines 2026', ['az-m5']),
  module('az-m7', 7, 'FBA Unfulfillable Inventory Settings',
    'Why used returns accumulate cost, the correct auto-dispose settings, and healthy inventory targets.',
    16, 'Amazon FBA Unfulfillable Settings Guide', ['az-m6']),
  module('az-m8', 8, 'SIPP — Ships in Product Packaging',
    'What the SIPP programme is, which products are eligible, and how enrollment and testing work.',
    14, 'SIPP – Ships in Product Packaging (Webinar Summary)', ['az-m7']),

  // ---- Track: Vendor Central (authored sequence 01–10) ----
  module('az-m9', 9, 'Vendor Central Introduction',
    'Vendor Central (1P) versus Seller Central (3P), the three fulfilment models, and Purchase Order handling.',
    14, 'Amazon Vendor Central Introduction Guide 2026; Amazon Selling Platforms Guide 2026', ['az-m8']),
  module('az-m10', 10, 'Vendor Product Selection & Migration',
    'Which products must migrate to Vendor Central, the margin-based decision for mid-priced products, and what must never migrate.',
    16, 'Vendor Product Selection & Migration Guide 2026', ['az-m9']),
  module('az-m11', 11, 'Vendor Listing Creation',
    'The mandatory main-image rules and how a new Vendor ASIN is created and titled.',
    16, 'LEDSone Vendor Central Listings Guide 2026', ['az-m10']),
  module('az-m12', 12, 'Vendor PO Fulfilment & Label Booking',
    'Confirming and packing a PO, ASN and labelling rules, and POD, receipt timelines and dispute windows.',
    20, 'LEDSone Label Booking Guide 2026', ['az-m11']),
  module('az-m13', 13, 'Vendor Invoicing',
    'Invoicing prerequisites, invoice numbering, VAT rates for lighting, and payment terms.',
    14, 'Amazon Vendor Central Invoice Guide 2026', ['az-m12']),
  module('az-m14', 14, 'Receive Variance & Shortage Disputes',
    'The daily receive-variance check, raising and escalating shortage disputes, and monthly dispute targets.',
    18, 'Receive Variance Dashboard Daily Check Guide 2026; Shortage Claims & Dispute Resolution Handbook 2026', ['az-m13']),
  module('az-m15', 15, 'Vendor Chargebacks',
    'What operational chargebacks are, the core physical rules that prevent them, and how to handle a chargeback received.',
    16, 'Amazon Vendor Chargeback Guideline 2026', ['az-m14']),
  module('az-m16', 16, 'Vendor Product Returns Management',
    'Return types and priority, physical verification and Priority ASINs, and the monitoring and dispute routine.',
    18, 'Amazon Vendor Product Returns Management Guide 2026', ['az-m15']),
];

// ---------------------------------------------------------------------------
// LESSONS
// ---------------------------------------------------------------------------

export const LESSONS = [
  // Module 1 — Account Health & Compliance
  lesson('az-m1-l1', 'az-m1', 1, 'The Account Health Rating (AHR)',
    'The Account Health Rating runs on a scale from 0 to 1,000. It is Healthy (green) at 200 to 1,000, At Risk (yellow) at 100 to 199, and Critical (red) at 0 to 99. Keeping the rating in the healthy band protects your selling privileges.',
    6, 'Amazon Account Health & Performance Guide 2026 — Account Health Rating'),
  lesson('az-m1-l2', 'az-m1', 2, 'Core Performance Thresholds',
    'Several metrics must each stay within a hard limit: the Order Defect Rate (ODR) must stay below 1%, measured over 60 days; the Late Shipment Rate must stay below 4%; the Pre-fulfilment Cancellation Rate must stay below 2.5%, measured over 7 days; the Valid Tracking Rate must exceed 95%; and the On-Time Delivery Rate must exceed 90%.',
    7, 'Amazon Account Health & Performance Guide 2026 — Performance Metrics'),
  lesson('az-m1-l3', 'az-m1', 3, 'Account Health Assurance & Monitoring',
    'Account Health Assurance (AHA) is earned by maintaining an AHR of 250 or above for 6 consecutive months, with no more than 10 days below 250. The recovery routine is to monitor the Account Health dashboard daily and respond to performance notifications within 12 hours.',
    6, 'Amazon Account Health & Performance Guide 2026 — Account Health Assurance & Recovery'),

  // Module 2 — Listing SEO & Content
  lesson('az-m2-l1', 'az-m2', 1, 'How Amazon SEO Works',
    'Amazon SEO combines Relevancy and Performance, and the golden rule is to write for customers first and the algorithm second. Keywords are organised in tiers: Primary keywords are front-loaded in the Title; Secondary keywords (3–5) go in the Bullets and Description; and Long-Tail keywords (5–10) go in the Description and Backend.',
    6, 'Amazon Listing SEO Guideline (UK Marketplace) — SEO Fundamentals & Keyword Tiers'),
  lesson('az-m2-l2', 'az-m2', 2, 'Writing the Title',
    'A desktop title runs 150–200 characters, but the first 80 characters must sell the product because they are what mobile shoppers see — over 75% of Amazon UK traffic is mobile. Use the formula [Brand] + [Primary Keyword] + [Feature 1] + [Feature 2] + [Size/Qty] + [Use Case], keep the primary keyword within the first 40 characters, and use no promotional words, no year, and no special characters.',
    7, 'Amazon Listing SEO Guideline (UK Marketplace) — Product Title'),
  lesson('az-m2-l3', 'az-m2', 3, 'Bullets & Backend Keywords',
    'Use 5 bullet points, each structured as Main Benefit + Feature + Keyword. Backend search terms are space-separated, written in singular form and lowercase, and must never repeat the brand, the ASIN, or competitor brand names.',
    6, 'Amazon Listing SEO Guideline (UK Marketplace) — Bullet Points & Backend Search Terms'),

  // Module 3 — Keyword Research
  lesson('az-m3-l1', 'az-m3', 1, 'Match Types & Campaign Structure',
    'Keyword length guides match type: 1–2 word keywords use Broad match; 2–3 word keywords where order matters use Phrase match; and 4+ word long-tail keywords use Exact match. Broad campaigns target 1–4 word terms, while Exact campaigns target a minimum of 4 words.',
    6, 'Complete Amazon Keyword Research Guide (2026) — Match Types'),
  lesson('az-m3-l2', 'az-m3', 2, 'Scoring Keywords — Magnet IQ & CPR',
    'The Magnet IQ Score bands are 0–30 Low (avoid), 31–50 Medium, 51–70 High (good), and 71–100 Very High (excellent). CPR (Cerebro Product Rank) bands are 0–50 Easy, 51–100 Medium, and 100+ Hard — for new product launches, target keywords with a CPR under 50.',
    7, 'Complete Amazon Keyword Research Guide (2026) — Keyword Scoring'),
  lesson('az-m3-l3', 'az-m3', 3, 'Indexing & the 2026 Algorithm',
    'Check indexing weekly; after adding a keyword, wait 48 hours and re-check. Under the 2026 A10+ algorithm the weightings shifted so that Conversion Rate is the largest factor at 35%, with Keyword Relevance at 25%, Sales Velocity at 20%, Review Quality at 15%, and External Traffic at 5%.',
    6, 'Complete Amazon Keyword Research Guide (2026) — Indexing & 2026 Updates'),

  // Module 4 — Competitor Analysis
  lesson('az-m4-l1', 'az-m4', 1, 'Identifying Direct Competitors',
    'A direct competitor is in the same category, within a similar price range of ±30%, has a minimum of 500 reviews, and is active and in stock. When surveying category best-sellers, review the top 10–20 products.',
    6, 'Amazon Competitor Analysis Guidelines — Identifying Competitors'),
  lesson('az-m4-l2', 'az-m4', 2, 'Benchmarking Listings',
    'Strong competitor titles run 150–200 characters with the brand at the beginning and key features in the first 80 characters. Leading listings use 7–9 high-resolution images and a 30–60 second video.',
    5, 'Amazon Competitor Analysis Guidelines — Listing Benchmarks'),
  lesson('az-m4-l3', 'az-m4', 3, 'Price Positioning & Gaps',
    'Price positioning is read against the category average: priced below average is a budget position; within ±10% of the average is the competitive "sweet spot"; above average is premium. Focus improvement effort on 1–2 high-impact gaps rather than many small ones.',
    5, 'Amazon Competitor Analysis Guidelines — Price Positioning & Gap Analysis'),

  // Module 5 — Pricing Strategy & Buy Box
  lesson('az-m5-l1', 'az-m5', 1, 'Break-Even Before Profit',
    'The break-even selling price must cover Product Cost plus the Referral Fee, the FBA Fulfilment Fee, Inbound Shipping, the Average PPC Cost per Sale, and a Storage Allocation. A product must never be priced below its break-even.',
    6, 'Dynamic Pricing Strategy Guide (2025) — Break-Even Formula'),
  lesson('az-m5-l2', 'az-m5', 2, 'Amazon Fees to Budget',
    'The referral fee is typically 8–15% of the sale price (most categories 15%; electronics 8–10%). Monthly storage cost rises sharply in Q4: about £0.75 per cubic foot from January to September, versus £2.40 per cubic foot from October to December.',
    6, 'Dynamic Pricing Strategy Guide (2025) — UK Fee Reference'),
  lesson('az-m5-l3', 'az-m5', 3, 'Buy Box & Launch Pricing',
    'Between 82% and 90% of Amazon sales go through the Buy Box; to stay eligible keep the ODR below 1% and the cancellation rate below 2.5%. A new product is launched with a discount ladder over 8 weeks, starting around 50% below the target price and stepping up to it, raising price in small 3–5% increments to avoid sudden 20–30% jumps.',
    6, 'Dynamic Pricing Strategy Guide (2025) — Buy Box & 8-Week Launch'),

  // Module 6 — FBA Product Selection & Rules
  lesson('az-m6-l1', 'az-m6', 1, 'The FBA Eligibility Checklist',
    'Before creating an FBA listing, ALL of these must be true: a customer rating of 4 stars or above; at least 5 units sold in the last 30 days; a net margin of 45% or above after FBA fees; and stock above 20 units available in the system. Sales performance is verified via Amazon Business Reports.',
    7, 'Amazon FBA Guidelines 2026 — Product Selection Eligibility'),
  lesson('az-m6-l2', 'az-m6', 2, 'Testing New Products & the 180-Day Rule',
    'For new or low-volume products, send only 1–2 units to test and require at least 1 customer rating before sending — no bulk launches. Products removed from the warehouse for not selling for more than 180 days should not be returned to FBA until they are likely to sell within the next replenishment cycle.',
    6, 'Amazon FBA Guidelines 2026 — New Products & Aged Stock'),
  lesson('az-m6-l3', 'az-m6', 3, 'Pricing & the FBM→FBA Conversion Rule',
    'The FBA price equals the FBM price, or up to £1 lower, and never more than £1 lower unless the 45% net margin is maintained. ⚠ Do NOT convert an existing FBM listing directly to FBA — instead use "Add Another Condition" and select the FBA option, so the FBM offer is preserved.',
    6, 'Amazon FBA Guidelines 2026 — FBA Pricing & Listing Conversion'),

  // Module 7 — FBA Unfulfillable Inventory Settings
  lesson('az-m7-l1', 'az-m7', 1, 'The Unfulfillable Inventory Problem',
    'Used and damaged customer returns accumulate as "used" SKUs and keep incurring monthly storage cost. The cheapest outcome is to dispose of them immediately — about £0.15–£0.30 per unit with no ongoing cost — rather than return them to inventory (which adds £0.50–£2 per month plus surcharges) or liquidate them (an 80–95% commission, only worthwhile for high-value items).',
    6, 'Amazon FBA Unfulfillable Settings Guide — Cost Comparison'),
  lesson('az-m7-l2', 'az-m7', 2, 'The Correct Automated Settings',
    'In FBA Settings, set "Return or Dispose" to Dispose and the Schedule to Immediate. Leave Value Recovery excluding, Grade & Resell not selected, and Liquidation unchecked. Do not touch the automated Fulfillable settings.',
    5, 'Amazon FBA Unfulfillable Settings Guide — Recommended Configuration'),
  lesson('az-m7-l3', 'az-m7', 3, 'Cleaning Existing Stock & Targets',
    'Clear existing used stock via Manage Inventory → filter "Used" → create a removal order → Dispose → Submit. Healthy targets are 0–2 used SKUs, 0 aged units, and a 30–50% reduction in monthly storage fees.',
    5, 'Amazon FBA Unfulfillable Settings Guide — Action Steps & Success Metrics'),

  // Module 8 — SIPP
  lesson('az-m8-l1', 'az-m8', 1, 'What SIPP Is',
    'Ships in Product Packaging (SIPP) lets eligible products ship in their own packaging instead of Amazon-added packaging, which waives the extra oversized packaging fee introduced on 1 February 2025 (for example, an extra €2.97 per unit for an oversized item without SIPP). The programme is free and optional.',
    7, 'SIPP – Ships in Product Packaging (Webinar Summary) — Overview & Fee Update'),
  lesson('az-m8-l2', 'az-m8', 2, 'Eligibility & Enrollment',
    'Shrink wrap alone is not allowed, and handles, hangers, cut-outs, and tie bags are not allowed; hazmat, cylindrical or spherical items, granular products under 2.5 cm, and liquid pouches are ineligible. Enrollment is: review & design packaging, group ASINs (only the heaviest/largest are tested), test & evaluate (photograph all 6 sides, run a drop test, and an ISTA lab test for fragile/liquid/food), then submit a Seller Support case — approval takes 5–7 business days.',
    7, 'SIPP – Ships in Product Packaging (Webinar Summary) — Eligibility & Enrollment Steps'),

  // Module 9 — Vendor Central Introduction
  lesson('az-m9-l1', 'az-m9', 1, 'Vendor Central vs Seller Central',
    'Vendor Central is a first-party (1P) wholesale model — you sell your stock to Amazon and Amazon sells it to customers — whereas Seller Central is a third-party (3P) model where you sell directly. Vendor payment terms are 60 NET days, compared with roughly every 14 days on Seller Central.',
    7, 'Amazon Vendor Central Introduction Guide 2026 — Vendor vs Seller Central'),
  lesson('az-m9-l2', 'az-m9', 2, 'The Three Fulfilment Models & Purchase Orders',
    'There are three models: FBM (you store and ship your own 3P stock), FBA (Amazon fulfils your 3P stock), and Vendor Central (Amazon buys your stock wholesale as 1P). On Vendor Central, Purchase Orders (POs) must be confirmed within 24–72 hours or they auto-cancel.',
    7, 'Amazon Selling Platforms Guide 2026 — FBM vs FBA vs Vendor; PO Handling'),

  // Module 10 — Vendor Product Selection & Migration
  lesson('az-m10-l1', 'az-m10', 1, 'What Must Migrate',
    'Products priced below £10 (Category 1) are a mandatory transfer to Vendor Central, because FBA pick & pack (about £2.80–£3.50 per unit) pushes a sub-£10 product’s net margin below 10% or into negative.',
    6, 'Vendor Product Selection & Migration Guide 2026 — Category 1'),
  lesson('az-m10-l2', 'az-m10', 2, 'Margin-Based & Excluded Products',
    'For £10–£20 products, migrate only where the Vendor margin is greater than or equal to the Seller Central margin; if the two are within 2% of each other, escalate to the Sales Manager. Do NOT migrate products above £50, slow movers (under 1 unit per week), or short-shelf-life, new, or unproven products. Keep the Seller Central listing live — do not delete it until at least 30 days after Vendor go-live.',
    7, 'Vendor Product Selection & Migration Guide 2026 — Categories 2–4 & Exclusions'),

  // Module 11 — Vendor Listing Creation
  lesson('az-m11-l1', 'az-m11', 1, 'Main Image Rules (Mandatory)',
    'The main image must be on a pure white background (RGB 255,255,255), with the product filling at least 85% of the frame, at a minimum of 1,000×1,000 pixels (1,600×1,600 recommended), JPEG preferred, and with no text, logos, props, or packaging.',
    7, 'LEDSone Vendor Central Listings Guide 2026 — Main Image Requirements'),
  lesson('az-m11-l2', 'az-m11', 2, 'Creating a New ASIN',
    'A new Vendor listing is created either by matching the Amazon catalogue (about 3–5 business days) or by submitting a New Item Setup / NIS (typically approved in 3–7 business days). Titles run to a maximum of 200 characters — keep under 150 for mobile — with no promotional words or special characters, and the cost price, case-pack quantity and MOQ are confirmed by the Sales Manager.',
    7, 'LEDSone Vendor Central Listings Guide 2026 — Listing Creation Steps'),

  // Module 12 — Vendor PO Fulfilment & Label Booking
  lesson('az-m12-l1', 'az-m12', 1, 'Confirming & Packing a PO',
    'Confirm a PO within 24 hours and only confirm the quantity that is 100% shippable — never over-confirm. Cartons have a maximum weight of 23 kg and a maximum of 63.5 cm on any side; a single item over 23 kg is packed alone with a red "Caution Heavy" label on all four sides.',
    7, 'LEDSone Label Booking Guide 2026 — PO Confirmation & Packing'),
  lesson('az-m12-l2', 'az-m12', 2, 'ASN, Labels & Dispatch',
    'Submit the ASN before the goods leave the warehouse, and the total ASN units must equal both the packed units and the PO-confirmed quantity — any mismatch causes a chargeback. Carton labels are 4×6 inch thermal, applied to a flat surface (never over a seam or corner), with a minimum 10% spot-check of cartons.',
    6, 'LEDSone Label Booking Guide 2026 — ASN & Labelling'),
  lesson('az-m12-l3', 'az-m12', 3, 'POD, Receipt & Dispute Windows',
    'Proof of Delivery (POD) is mandatory for every shipment. Amazon’s FC receipt takes a minimum of 4 weeks; if a shipment is still not received after 4 weeks, raise a dispute immediately. The shortage-dispute deadline is 30 days — after Day 30 it is permanently locked. Invoice on the same day as dispatch.',
    7, 'LEDSone Label Booking Guide 2026 — POD, Receipt Timeline & Disputes'),

  // Module 13 — Vendor Invoicing
  lesson('az-m13-l1', 'az-m13', 1, 'Invoicing Prerequisites',
    'You can only invoice a PO that has already shipped, and the ASN must be submitted before invoicing. Every invoice number must be unique and sequential (format LED-XXXX), and each invoice uses a single Payee Code, currency, and ship-to location, dated the day it is raised.',
    6, 'Amazon Vendor Central Invoice Guide 2026 — Prerequisites'),
  lesson('az-m13-l2', 'az-m13', 2, 'Tax & Payment Terms',
    'The invoice header carries 60 NET payment terms. LED and lighting products are standard-rated at GB 20% VAT (GB 0% for zero-rated/freight and GB 5% reduced are also available), and UK domestic supply uses the reverse-charge VAT declaration. If payment is delayed beyond 60 NET, raise a dispute.',
    6, 'Amazon Vendor Central Invoice Guide 2026 — Tax Rates & Payment'),

  // Module 14 — Receive Variance & Shortage Disputes
  lesson('az-m14-l1', 'az-m14', 1, 'The Daily Receive-Variance Check',
    'Spend 10–15 minutes each morning on the Receive Variance Dashboard with the date range set to the last 30 days, filtering for "With Shortage" and high-value items. A shortage is where the ASN quantity is greater than the quantity Amazon actually received.',
    6, 'Receive Variance Dashboard Daily Check Guide 2026 — Daily Routine'),
  lesson('az-m14-l2', 'az-m14', 2, 'Raising & Escalating Disputes',
    'Disputes must be raised within the 30-day window from the invoice date; after 30 days the tool locks and you must open a Vendor Support case. Set a calendar alert for Day 25 because Day 28 is the hard trigger. Any FC with 2 or more unresolved failures is blocked. Escalate to the Vendor Manager when a dispute value is over £200 and the rejection is unjustified.',
    7, 'Shortage Claims & Dispute Resolution Handbook 2026 — Dispute Window & Escalation; Receive Variance Dashboard Daily Check Guide 2026 — £200 Escalation'),
  lesson('az-m14-l3', 'az-m14', 3, 'Monthly Targets',
    'Aim for a dispute approval rate above 80%, an average resolution time under 14 days, and 100% of disputes raised within 7 days.',
    5, 'Receive Variance Dashboard Daily Check Guide 2026 — Monthly Metrics'),

  // Module 15 — Vendor Chargebacks
  lesson('az-m15-l1', 'az-m15', 1, 'What Chargebacks Are',
    'Amazon issues operational chargebacks across 21 performance metrics (for example delivery, carton weight, and packaging compliance) when vendor operations breach the rules. The recurring physical rules are: confirm POs within 24 hours; cartons no more than 23 kg and 63.5 cm per side; double-wall cartons for shipments over 5 kg; the ASN submitted before goods leave; a 10% carton spot-check; and POD on every shipment.',
    7, 'Amazon Vendor Chargeback Guideline 2026 — Metrics & Core Rules'),
  lesson('az-m15-l2', 'az-m15', 2, 'Handling a Received Chargeback',
    'When a chargeback is received, action it within 48 hours. The escalation timeline is to escalate on Day 14, involve the Sales Manager on Day 21, and treat Day 28–29 as the critical last chance to dispute.',
    6, 'Amazon Vendor Chargeback Guideline 2026 — Escalation Timeline & 10 Non-Negotiables'),

  // Module 16 — Vendor Product Returns Management
  lesson('az-m16-l1', 'az-m16', 1, 'Return Types & Priority',
    'Returns are triaged by type and priority. Recall/Safety and Wrong Item are URGENT — a Recall/Safety return means stop all despatch and escalate to the Sales Manager. Defective, Damaged, Overstock, and Quality Issue are HIGH priority, and a standard Customer Return is MEDIUM.',
    6, 'Amazon Vendor Product Returns Management Guide 2026 — Return Types & Priority'),
  lesson('az-m16-l2', 'az-m16', 2, 'Physical Verification & Priority ASINs',
    'Every return is physically verified — scan the EAN, check the seal, and test LED functionality — and then root-caused. Any ASIN with 3 or more returns in 30 days becomes a Priority ASIN, and its fix must be actioned within 7 days.',
    6, 'Amazon Vendor Product Returns Management Guide 2026 — Verification & Priority ASINs'),
  lesson('az-m16-l3', 'az-m16', 3, 'Monitoring & Disputes',
    'Monitor returns daily over the last 7 days, and review the returns tracker every Monday — a return dated more than 25 days ago with no dispute is approaching the 30-day deadline. Amazon reviews return disputes within 30 days.',
    6, 'Amazon Vendor Product Returns Management Guide 2026 — Routine & Disputes'),
];
