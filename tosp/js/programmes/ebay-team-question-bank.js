// programmes/ebay-team-question-bank.js — eBay Team QUIZZES + QUESTIONS.
//
// One Skill Check per module. passingScorePct/maxAttempts REUSE the exact
// existing TOSP prototype configuration (80% / 3 attempts) unchanged — no new
// scoring logic or thresholds are introduced (user-confirmed requirement).
//
// Every question and every answer option is generated only from the FINAL
// eBay source documents and carries a `source` citation. Distractors are
// plausible but are never presented as real eBay/company rules, and never
// reference the excluded Amazon-A+ contamination, confidential account
// identifiers, or other-programme jargon — see docs/ebay-team-source-map.md.
// Two questions (eb-m2-quiz-q3, eb-m7-quiz-q4) intentionally test the
// programme's own no-sign-off / not-a-certificate configuration; that is
// this programme's stated rule, not outside knowledge.

import { MODULES } from './ebay-team-modules.js';

// Reuse the exact existing prototype quiz configuration (see PH / Amazon
// programmes): 80% to pass, 3 attempts per Skill Check.
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
  // ---- Module 1 — Introduction to eCommerce ----
  question('eb-m1-quiz-q1', 'eb-m1-quiz',
    'A private individual sells their used lamp directly to another private individual on eBay. Which eCommerce model does this describe?',
    opt('B2B', 'B2C', 'C2C', 'D2C'), 'c',
    '7-Day eBay Training Program PDF — Day 1, Slide 2 (Types of eCommerce)'),
  question('eb-m1-quiz-q2', 'eb-m1-quiz',
    'Which of these is explicitly the Day 1 foundation, covered before any hands-on Seller Hub work begins?',
    opt('Understanding the eCommerce ecosystem and where eBay fits', 'Uploading tracking numbers', 'Configuring a return policy', 'Reviewing the Late Shipment Rate'), 'a',
    '7-Day eBay Training Program PDF — Day 1, Slide 2'),
  question('eb-m1-quiz-q3', 'eb-m1-quiz',
    "Why does the programme place 'Introduction to eCommerce' before 'eBay Account Basics & Seller Hub Navigation'?",
    opt('eCommerce theory is unrelated to using eBay, so the order does not matter', "The programme builds Day 2's hands-on Seller Hub work on top of the marketplace concepts introduced on Day 1", 'Seller Hub settings must be configured before eCommerce can be explained', 'Seller Hub navigation is a prerequisite for understanding eCommerce'), 'b',
    '7-Day eBay Training Program PDF — Day 1–Day 2 sequence'),

  // ---- Module 2 — eBay Account Basics & Seller Hub Navigation ----
  question('eb-m2-quiz-q1', 'eb-m2-quiz',
    'Where in the Seller Hub would you check whether your Late Shipment Rate is trending up?',
    opt('Messages section', 'Performance tab', 'Listings page', 'Account Settings'), 'b',
    '7-Day eBay Training Program PDF — Day 2, Slide 4'),
  question('eb-m2-quiz-q2', 'eb-m2-quiz',
    'Which Day 2 knowledge-check item asks a learner to describe how an order moves from being placed to being tracked?',
    opt('Can explain Seller Hub sections', 'Can locate performance metrics', 'Can identify order management flow', 'Can process a return'), 'c',
    '7-Day eBay Training Program PDF — Day 2, Slide 5 (Knowledge Check)'),
  question('eb-m2-quiz-q3', 'eb-m2-quiz',
    "A learner has opened every Seller Hub section once. Has Day 2's knowledge check been satisfied?",
    opt('Yes, opening each section once is the full requirement', 'No — the learner must also be able to explain each section, locate performance metrics, and describe the order-management flow without help', 'Day 2 has no knowledge-check requirement', "Only once a team leader has signed off — this programme requires sign-off"), 'b',
    '7-Day eBay Training Program PDF — Day 2, Slide 5 (Knowledge Check)'),
  question('eb-m2-quiz-q4', 'eb-m2-quiz',
    'Which Seller Hub area is used to communicate directly with a buyer?',
    opt('Orders section', 'Messages section', 'Policies overview', 'Performance tab'), 'b',
    '7-Day eBay Training Program PDF — Day 2, Slide 4'),

  // ---- Module 3 — Product Research & Listing Fundamentals ----
  question('eb-m3-quiz-q1', 'eb-m3-quiz',
    "Which four checks does Day 3's product research step cover before a listing is created?",
    opt('Demand analysis, competition analysis, profit margin basics, shipping feasibility', 'Title length, image count, description length, price', 'Defect rate, late shipment rate, cancellation rate, case rate', 'Category, item specifics, images and shipping only'), 'a',
    '7-Day eBay Training Program PDF — Day 3, Slide 6 (Product Research)'),
  question('eb-m3-quiz-q2', 'eb-m3-quiz',
    "Which of the following is on the Day 3 Listing Quality Checklist?",
    opt('Correct category selected', 'Tracking number uploaded', 'Return dispute raised', 'A completed Skill Check'), 'a',
    '7-Day eBay Training Program PDF — Day 3, Slide 7 (Listing Quality Checklist)'),
  question('eb-m3-quiz-q3', 'eb-m3-quiz',
    "A learner has reviewed a competitor's title, pricing and images, but not the shipping setup or item specifics. Per the Day 3 Competitor Analysis Checklist, is the research step complete?",
    opt('Yes, title/pricing/images is enough', "No — the competitor's shipping setup and item specifics also need reviewing", 'Yes, as long as the price is competitive', 'No, because a Skill Check must be passed first'), 'b',
    '7-Day eBay Training Program PDF — Day 3, Slide 7 (Competitor Analysis Checklist)'),
  question('eb-m3-quiz-q4', 'eb-m3-quiz',
    'Where are the exact character-limit and image-resolution rules for listings covered in this programme?',
    opt('In full detail in Module 3', 'Only introduced at a foundational level in Module 3; the exact rules are covered in the Listing Optimization Deep-Dive module', 'They are not covered anywhere in this programme', 'In Module 5, alongside account health'), 'b',
    '7-Day eBay Training Program PDF — Day 3, Slide 6; programme module structure'),

  // ---- Module 4 — Practical Listing Creation ----
  question('eb-m4-quiz-q1', 'eb-m4-quiz',
    'What is the first step in the Day 4 practical listing-creation workflow?',
    opt('Add Title', 'Choose Category', 'Upload Images', 'Set Price'), 'b',
    '7-Day eBay Training Program PDF — Day 4, Slide 8'),
  question('eb-m4-quiz-q2', 'eb-m4-quiz',
    "Why does 'Choose Category' come before 'Add Item Specifics' in the Day 4 workflow?",
    opt('The order is arbitrary and does not matter', 'The category chosen determines which item-specifics fields are available to fill in', 'Item specifics must be added before a category can be chosen', 'Category selection happens automatically after publishing'), 'b',
    '7-Day eBay Training Program PDF — Day 4, Slide 8; EBAY BGCT PDF — Item Specifics section (Slide 11)'),
  question('eb-m4-quiz-q3', 'eb-m4-quiz',
    'Per the Day 4 Variation Listing Rules, which of these must be provided for every variation in a listing?',
    opt('Stock for each variation', 'A separate listing per colour', 'A separate return policy per variation', 'A separate title per variation'), 'a',
    '7-Day eBay Training Program PDF — Day 4, Slide 9 (Variation Listing Rules)'),
  question('eb-m4-quiz-q4', 'eb-m4-quiz',
    'Which of these is on the Day 4 Practical Listing Checklist as a required part of a complete listing, alongside price and description?',
    opt('A configured return policy', 'A supplier purchase order', 'A warehouse audit report', 'A marketing campaign brief'), 'a',
    '7-Day eBay Training Program PDF — Day 4, Slide 9 (Practical Listing Checklist)'),

  // ---- Module 5 — Account Health & Customer Service ----
  question('eb-m5-quiz-q1', 'eb-m5-quiz',
    'What is the maximum acceptable Late Shipment Rate stated for Day 5 account health?',
    opt('Below 2%', 'Below 10%', 'Below 0.3%', 'Below 25%'), 'b',
    '7-Day eBay Training Program PDF — Day 5, Slide 10 (Key Performance Metrics)'),
  question('eb-m5-quiz-q2', 'eb-m5-quiz',
    'What is the maximum acceptable rate for Cases Closed Without Resolution?',
    opt('Below 2%', 'Below 10%', 'Below 0.3%', 'Below 5%'), 'c',
    '7-Day eBay Training Program PDF — Day 5, Slide 10 (Key Performance Metrics)'),
  question('eb-m5-quiz-q3', 'eb-m5-quiz',
    "A seller's Transaction Defect Rate and Cancellation Rate are both climbing. What is the shared threshold both must stay below?",
    opt('0.3%', '2%', '10%', '5%'), 'b',
    '7-Day eBay Training Program PDF — Day 5, Slide 10 (Key Performance Metrics)'),
  question('eb-m5-quiz-q4', 'eb-m5-quiz',
    "According to the Day 5 Customer Handling Checklist, replying quickly is not enough on its own — what else must the reply demonstrate?",
    opt('Nothing else is required beyond speed', 'Professionalism, the correct resolution, and polite communication throughout', 'A discount offered in every case', 'Escalation in every case'), 'b',
    '7-Day eBay Training Program PDF — Day 5, Slide 11 (Customer Handling Checklist)'),

  // ---- Module 6 — Order Management & Daily Operations ----
  question('eb-m6-quiz-q1', 'eb-m6-quiz',
    'What is the correct order of the Day 6 order lifecycle?',
    opt('Packing → Order Received → Shipping → Delivery → Tracking Upload', 'Order Received → Packing → Shipping → Tracking Upload → Delivery', 'Order Received → Shipping → Packing → Delivery → Tracking Upload', 'Tracking Upload → Order Received → Packing → Shipping → Delivery'), 'b',
    '7-Day eBay Training Program PDF — Day 6, Slide 12'),
  question('eb-m6-quiz-q2', 'eb-m6-quiz',
    "Which of these is part of the Day 6 Daily Account Holder Checklist?",
    opt('Checked stock availability', 'Confirmed a supplier purchase order', 'Raised a shortage dispute', 'Reviewed a translation request'), 'a',
    '7-Day eBay Training Program PDF — Day 6, Slide 13 (Daily Account Holder Checklist)'),
  question('eb-m6-quiz-q3', 'eb-m6-quiz',
    "A shipment is running late and has not been updated. What is the correct Day 6 action, and which Module 5 metric does leaving it unresolved put at risk?",
    opt('Update the late shipment — it risks the Late Shipment Rate staying below 10%', 'Cancel the order — it risks the Transaction Defect Rate', 'Ignore it until the buyer complains — no metric is affected', 'Wait for a Skill Check — that resolves the shipment'), 'a',
    '7-Day eBay Training Program PDF — Day 6, Slide 13; Day 5, Slide 10'),
  question('eb-m6-quiz-q4', 'eb-m6-quiz',
    "Which issue is explicitly named on the Day 6 Issue Management Checklist as something a seller must be ready to resolve?",
    opt('A buyer complaint', 'A supplier invoice reconciliation', 'A warehouse inventory audit', 'A social media advertising review'), 'a',
    '7-Day eBay Training Program PDF — Day 6, Slide 13 (Issue Management Checklist)'),

  // ---- Module 7 — Advanced Optimization & Final Evaluation ----
  question('eb-m7-quiz-q1', 'eb-m7-quiz',
    'Which of these is one of the ongoing optimization habits Day 7 introduces after a listing is live?',
    opt('Listing refresh', 'Reducing the number of images used', 'Removing item specifics to save time', 'Ignoring competitor pricing entirely'), 'a',
    '7-Day eBay Training Program PDF — Day 7, Slide 14'),
  question('eb-m7-quiz-q2', 'eb-m7-quiz',
    'Which of these is explicitly listed on Day 7 as a mistake to avoid?',
    opt('Wrong category selection', 'Reviewing customer complaints', 'Uploading tracking numbers', 'Filling in optional item specifics'), 'a',
    '7-Day eBay Training Program PDF — Day 7, Slide 15 (Mistakes to Avoid)'),
  question('eb-m7-quiz-q3', 'eb-m7-quiz',
    'What does the Day 7 Final Assessment require as evidence of practical skill, alongside a completed workflow summary?',
    opt('An optimized listing created and a customer reply drafted', 'A signed team-leader approval form', 'A live sale completed on a real eBay account', 'A certificate issued by eBay'), 'a',
    '7-Day eBay Training Program PDF — Day 7, Slide 16 (Final Assessment Tasks)'),
  question('eb-m7-quiz-q4', 'eb-m7-quiz',
    'Completing all 8 modules and their Skill Checks in this prototype means:',
    opt('The learner is now officially certified and authorized to trade independently', 'The learner has completed the recorded learning checklist for this browser-based prototype, which is not official onboarding evidence', "The learner's team leader has signed off on their competency", 'The learner is exempt from all future training'), 'b',
    '7-Day eBay Training Program PDF — Day 7, Slide 16 (Final Assessment Tasks); programme completion configuration'),

  // ---- Module 8 — Listing Optimization Deep-Dive ----
  question('eb-m8-quiz-q1', 'eb-m8-quiz',
    'What is the eBay title character limit?',
    opt('50', '65', '80', '100'), 'c',
    'EBAY BGCT PDF — Title Optimization section (Slide 2)'),
  question('eb-m8-quiz-q2', 'eb-m8-quiz',
    'Why are the first 40 characters of a title treated as the priority zone?',
    opt('eBay ignores anything after 40 characters', 'Mobile screens truncate long titles, so mobile buyers see the first 40 characters first', 'The SEO formula only allows 40 characters in total', 'eBay charges extra for titles over 40 characters'), 'b',
    'EBAY BGCT PDF — Title Optimization section (Slide 2)'),
  question('eb-m8-quiz-q3', 'eb-m8-quiz',
    'Which of these characters should NOT be used in an eBay title?',
    opt('A hyphen (-)', 'A percent sign (%)', 'A space', 'A number'), 'b',
    'EBAY BGCT PDF — Title Optimization section (Slide 2)'),
  question('eb-m8-quiz-q4', 'eb-m8-quiz',
    'What is the recommended main-image resolution?',
    opt('500×500 pixels', '1,000×1,000 pixels', '2,000×2,000 pixels', '4,000×4,000 pixels'), 'c',
    'EBAY BGCT PDF — Main Image section (Slide 7)'),
  question('eb-m8-quiz-q5', 'eb-m8-quiz',
    "A seller adds a small 'Free Shipping' banner onto their main product photo. Is this allowed?",
    opt('Yes, promotional text is encouraged on the main image', 'No — no text, artwork or marketing material may be added to the main image; that message belongs in the title, subtitle or description instead', 'Yes, as long as it covers under 10% of the image', 'Only allowed on the main image, not on sub images'), 'b',
    'EBAY BGCT PDF — Main Image section (Slide 7)'),
  question('eb-m8-quiz-q6', 'eb-m8-quiz',
    'What is the recommended base font size for an eBay description, and the minimum it should never drop below?',
    opt('16px base, never below 12px', '10px base, never below 8px', '24px base, never below 20px', 'There is no recommended size'), 'a',
    'EBAY BGCT PDF — Description section (Slide 13)'),
  question('eb-m8-quiz-q7', 'eb-m8-quiz',
    "A buyer returns an item using an eBay-provided return label under the 30-day return policy. What happens to the return postage cost?",
    opt('The seller pays it upfront and is never reimbursed', "It is deducted from the buyer's refund amount", 'eBay pays it in full with no deduction', "It is added to the seller's next invoice"), 'b',
    'EBAY BGCT PDF — Postage & Return Policy section (Slides 16–17)'),
  question('eb-m8-quiz-q8', 'eb-m8-quiz',
    'A seller wants to list a lamp that comes in three colours and two sizes. Per the Common Rules for eBay, what is the correct approach?',
    opt('Create one listing with both Colour and Size as variations', 'Create the listing using only one variation type (for example Colour), and handle the second attribute separately rather than stacking it onto the same listing', 'List every colour/size combination as a separate variation type in the same listing', 'Variations are not allowed on eBay'), 'b',
    'EBAY BGCT PDF — Common Rules For eBay section (Slide 20)'),
];
