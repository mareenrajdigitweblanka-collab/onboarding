// programmes/customer-service-team-question-bank.js — Customer Service Team
// QUIZZES + QUESTIONS.
//
// One Skill Check per module, 8 in total, 6 questions each, 48 questions
// total. passingScorePct/maxAttempts REUSE the exact existing TOSP prototype
// configuration (80% / 3 attempts) unchanged — no new scoring logic or
// thresholds are introduced, and the shared quiz engine (services/quiz-
// service.js, views/quiz-view.js) is reused completely unmodified: the
// correct answer is never shown before submission, and the review screen
// after submission shows the correct answer plus its source citation as
// constructive feedback, exactly as it does for every other programme.
//
// Every question and every answer option is generated only from the Ledsone
// Customer Support Handbook and carries a `source` citation. No question
// tests: the version-label conflict between the source filename and its
// body; the meaning of "BGCT"; any numeric eBay Transaction Defect Rate
// threshold; the disputed 7-day-domestic / 14-day-international lost-parcel
// timing; missing/incomplete template wording; real employee names; real
// customer information; payment procedures; detailed invoice handling;
// data/privacy requests; chargebacks; or unsupported marketplace-case
// procedures (Wayfair/B&Q/Avasam). See docs/customer-service-team-
// exclusions.md for the full register.

import { MODULES } from './customer-service-team-modules.js';

// Reuse the exact existing prototype quiz configuration (see PH / Amazon /
// eBay / Digital Marketing / Purchasing / Centralized PPC programmes): 80% to
// pass, 3 attempts per Skill Check.
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
  // Module 1 — Customer Service Foundation and Governance
  // ======================================================================
  question('cs-m1-q1', 'cs-m1-quiz',
    'According to the handbook, in what order should the three goals of every customer interaction be prioritised?',
    opt('Resolve the issue, then protect the account, then protect finances', 'Protect the marketplace account first, then resolve the customer\'s issue correctly, then protect the company financially', 'Protect finances first, then resolve the issue, then protect the account', 'All three are equally weighted with no priority order'),
    'b', 'Ledsone Customer Support Handbook, Chapter 7 ("The Three Goals of Every Customer Interaction")'),
  question('cs-m1-q2', 'cs-m1-quiz',
    'A resolution is valued at £75. According to the BLOS thresholds, what approval is required?',
    opt('No approval — agents may act up to £100', 'Team Head approval, since it falls in the £50-£100 band', 'Operations Manager approval, since anything over £50 needs the top level', 'No approval is ever required for refunds'),
    'b', 'Ledsone Customer Support Handbook, Chapter 15 ("BLOS Governance System — Current BLOS Thresholds")'),
  question('cs-m1-q3', 'cs-m1-quiz',
    'A customer has refused a 30% discount offer. What is the maximum discount an agent or Team Head may offer without Operations Manager approval?',
    opt('40%', '50%', '35%', 'There is no ceiling once the customer has refused once'),
    'c', 'Ledsone Customer Support Handbook, Chapter 15 ("BLOS Governance System — Current BLOS Thresholds") and Chapter 29 ("Partial Refund Rules — The Damage Discount Matrix")'),
  question('cs-m1-q4', 'cs-m1-quiz',
    'Which of the six universal pre-reply gates specifically requires stopping and executing a stop-use, no-discount protocol before continuing?',
    opt('The Evidence Gate', 'The Approval Gate', 'The Safety Gate', 'The Marketplace Gate'),
    'c', 'Ledsone Customer Support Handbook, Chapter 12 ("Decision Tree & Gate Logic System — The Universal Pre-Reply Gates")'),
  question('cs-m1-q5', 'cs-m1-quiz',
    'An agent genuinely cannot find any documented rule that covers the exact scenario in front of them. What does the No-Match Protocol require?',
    opt('Improvise a reasonable resolution based on similar cases', 'Send a holding message, escalate to Team Head in full, and let the decision feed into a new written rule afterwards', 'Deny the customer\'s request until a rule exists', 'Wait for the customer to escalate the matter themselves'),
    'b', 'Ledsone Customer Support Handbook, Chapter 14 ("Exception & No-Match Handling — The No-Match Protocol")'),
  question('cs-m1-q6', 'cs-m1-quiz',
    'A Marketplace rule (Level 2) and a Standard Operating rule (Level 4) appear to give different guidance for the same case. Which one applies, according to the rule hierarchy?',
    opt('The Standard Operating rule, because it is more detailed', 'The Marketplace rule, because a higher level always overrides a lower one', 'Whichever rule the agent prefers, using discretion', 'Neither applies — escalate to change the rules first'),
    'b', 'Ledsone Customer Support Handbook, Chapter 11 ("Master Rule Architecture — Rule Hierarchy")'),

  // ======================================================================
  // Module 2 — Communication and Message Handling
  // ======================================================================
  question('cs-m2-q1', 'cs-m2-quiz',
    'A customer\'s first message says: "My item arrived with a cracked lampshade, this is unacceptable." Which category applies?',
    opt('01 — Return Query', '06 — Defective Item', '07 — Damaged Item', '10 — Wrong Description'),
    'c', 'Ledsone Customer Support Handbook, Chapter 16 ("Complete Message Categorisation System — The 11 Categories") and Chapter 54 ("Message Category Register — CS-061")'),
  question('cs-m2-q2', 'cs-m2-quiz',
    'A message does not clearly fit any of Categories 01-03 or 05-11. What must the agent do?',
    opt('Leave it uncategorised until it is clearer', 'Assign Category 04, the mandatory default', 'Ask a colleague to guess the category', 'Categorise it based on the customer\'s tone only'),
    'b', 'Ledsone Customer Support Handbook, Chapter 54 ("Message Category Register — CS-061")'),
  question('cs-m2-q3', 'cs-m2-quiz',
    'A message reads: "I have been waiting for days and no one has replied, I need an answer today." What does this trigger, regardless of the underlying issue type?',
    opt('LOW priority, since it is a general enquiry', 'MEDIUM priority, as a standard operational query', 'HIGH priority, because of the urgent tone detected', 'No priority change — priority is set only by issue type'),
    'c', 'Ledsone Customer Support Handbook, Chapter 16 ("Complete Message Categorisation System — Priority Classification")'),
  question('cs-m2-q4', 'cs-m2-quiz',
    'What is the first step of the mandatory seven-step order verification sequence?',
    opt('Check the delivery address', 'Confirm the Order ID exists and matches the customer', 'Check the customer\'s return history', 'Check tracking status'),
    'b', 'Ledsone Customer Support Handbook, Chapter 18 ("Order Verification Process — The Order Verification Sequence")'),
  question('cs-m2-q5', 'cs-m2-quiz',
    'A customer asks the agent to just "open a case" on eBay for them. What is the approved response?',
    opt('"We are checking this with our marketplace on your behalf and will update you shortly."', '"Yes, please go ahead and open a case."', '"We cannot open cases for customers."', '"You should open a case if you are not satisfied."'),
    'a', 'Ledsone Customer Support Handbook, Chapter 20 ("Marketplace Communication Rules — Approved Phrasing Reference")'),
  question('cs-m2-q6', 'cs-m2-quiz',
    'According to the response-building framework, when may an agent offer a resolution to the customer?',
    opt('As soon as the message is read, to respond quickly', 'Only after the relevant evidence for that issue type has been received and verified', 'Once a template has been selected, regardless of evidence', 'Whenever the customer insists on an immediate answer'),
    'b', 'Ledsone Customer Support Handbook, Chapter 19 ("Response Building Framework — The Anatomy of a Correct Response")'),

  // ======================================================================
  // Module 3 — Delivery and Courier Management
  // ======================================================================
  question('cs-m3-q1', 'cs-m3-quiz',
    'A customer contacts within 3 days of dispatch; tracking exists but shows no scan yet. What is the correct first step?',
    opt('Tell the customer the parcel was not sent', 'Check internally with the postage team before replying with any claim about dispatch status', 'Immediately open a courier investigation', 'Offer a replacement to avoid any delay'),
    'b', 'Ledsone Customer Support Handbook, Chapter 23 ("Delivery Query Handling — Scenario D2")'),
  question('cs-m3-q2', 'cs-m3-quiz',
    'Tracking shows the parcel as "delivered" with a photo at the correct address, but the customer says they never received it. What is the correct action?',
    opt('Process an automatic refund immediately, since tracking is not always reliable', 'Ask the customer to check a safe place or neighbour, raise a courier investigation, and escalate to Team Head before any refund', 'Tell the customer nothing more can be done', 'Offer a discount instead of investigating'),
    'b', 'Ledsone Customer Support Handbook, Chapter 24 ("INR (Item Not Received) Handling System — INR Resolution Decision Logic")'),
  question('cs-m3-q3', 'cs-m3-quiz',
    'An eBay case deadline is approaching and the courier investigation into a possibly lost parcel has not yet concluded. What does the marketplace-first rule require?',
    opt('Wait for the courier investigation to finish before taking any action', 'Act on the marketplace deadline first (for example, issue a refund or replacement) and continue the courier claim separately afterward', 'Let the eBay case close automatically, since the courier is still investigating', 'Escalate to the customer to decide which deadline takes priority'),
    'b', 'Ledsone Customer Support Handbook, Chapter 26 ("Courier Escalation & Appeals — Protecting Marketplace Accounts During Courier Investigations")'),
  question('cs-m3-q4', 'cs-m3-quiz',
    'A parcel is returned to sender (RTS) because the customer refused it at the door due to visible box damage. Which process applies?',
    opt('The standard 30-day change-of-mind return process', 'The damage-handling process, not a standard change-of-mind refusal', 'No process applies — RTS parcels are automatically refunded', 'The international customs process'),
    'b', 'Ledsone Customer Support Handbook, Chapter 23 ("Delivery Query Handling — Scenario D11")'),
  question('cs-m3-q5', 'cs-m3-quiz',
    'A customer is charged an unexpected customs fee on an international order. What does the handbook say about reimbursing it?',
    opt('Always reimburse it immediately to keep the customer satisfied', 'It is never reimbursed under any circumstance', 'It is not automatically reimbursed — the decision escalates to Team Head', 'The agent decides case by case using discretion, with no escalation needed'),
    'c', 'Ledsone Customer Support Handbook, Chapter 23 ("Delivery Query Handling — Scenario D10, Customs Issues")'),
  question('cs-m3-q6', 'cs-m3-quiz',
    'What does the handbook use as the correct trigger for finally declaring a parcel lost and offering resolution, as taught in this programme?',
    opt('A fixed day count after dispatch', 'The courier\'s own investigation confirming the loss', 'The customer\'s own insistence that it must be lost', 'An automatic system timeout'),
    'b', 'Ledsone Customer Support Handbook, Chapter 24 ("INR (Item Not Received) Handling System — INR Resolution Decision Logic"); the handbook\'s own day-count figures for this trigger are disputed between internal sources and are intentionally excluded from this programme'),

  // ======================================================================
  // Module 4 — Customer Returns, Refunds and Warranty
  // ======================================================================
  question('cs-m4-q1', 'cs-m4-quiz',
    'According to Rule CS-051, from which date does every claim window start?',
    opt('The order date', 'The dispatch date', 'The confirmed delivery date', 'The invoice date'),
    'c', 'Ledsone Customer Support Handbook, Chapter 51 ("Claim Window Definitions — Rule CS-051")'),
  question('cs-m4-q2', 'cs-m4-quiz',
    'What is the claim window for a defective / not-working product fault claim?',
    opt('14 days from confirmed delivery date', '30 days from confirmed delivery date', '60 days from confirmed delivery date', '3 years from confirmed delivery date'),
    'c', 'Ledsone Customer Support Handbook, Chapter 51 ("Claim Window Definitions — Claim Window Reference Table")'),
  question('cs-m4-q3', 'cs-m4-quiz',
    'A seller-side issue has been confirmed. According to the resolution priority order, what should be offered first?',
    opt('A full refund without return', 'A partial refund or discount', 'A replacement or exchange', 'A full refund with return'),
    'c', 'Ledsone Customer Support Handbook, Chapter 28 ("Refund Decision Engine — Resolution Priority Order")'),
  question('cs-m4-q4', 'cs-m4-quiz',
    'A customer requests a refund but has not returned the item at all. What does the handbook require?',
    opt('Process the refund immediately since the customer asked', 'Team Head approval is required regardless of the item\'s value', 'No refund can ever be given without a return, with no exceptions or escalation path', 'Only Operations Manager may ever process refunds without a return'),
    'b', 'Ledsone Customer Support Handbook, Chapter 32 ("Refund Escalation Rules — Escalation Triggers")'),
  question('cs-m4-q5', 'cs-m4-quiz',
    'An item has moderate cosmetic damage (a small dent) but is fully functional and safe. What does the handbook say about the resolution?',
    opt('It must always be a full refund, never a discount', 'A partial refund using the damage discount matrix is appropriate, since the item is safe and functional', 'No resolution is available for cosmetic damage', 'It is automatically treated as a safety case'),
    'b', 'Ledsone Customer Support Handbook, Chapter 29 ("Partial Refund Rules — When a Partial Refund Is Appropriate; The Damage Discount Matrix")'),
  question('cs-m4-q6', 'cs-m4-quiz',
    'A return is for an item valued at £120. What must happen before any refund or replacement is processed?',
    opt('Nothing extra — it follows the standard process exactly like a £20 item', 'The high-value return protocol applies: report immediately, and only refund or replace after warehouse inspection confirms condition', 'The customer must collect the refund in person', 'The item is automatically replaced without any check'),
    'b', 'Ledsone Customer Support Handbook, Chapter 27 ("Return Policy Master System — High-Value Return Protocol")'),

  // ======================================================================
  // Module 5 — Product Issues and Technical Support
  // ======================================================================
  question('cs-m5-q1', 'cs-m5-quiz',
    'A customer reports a damaged item but has not sent any photos yet. What is the correct first step?',
    opt('Offer a discount immediately to resolve it quickly', 'Request the required evidence (outer packaging, inner packaging, and multi-angle item photos) before making any offer', 'Arrange a replacement without evidence, since the customer is likely telling the truth', 'Tell the customer nothing can be done without proof, and close the case'),
    'b', 'Ledsone Customer Support Handbook, Chapter 33 ("Damaged Item Handling — The 5-Step Damage Handling Framework")'),
  question('cs-m5-q2', 'cs-m5-quiz',
    'A defective item has a clearly visible fault confirmed from the customer\'s photos and internal SKU records. What is the correct resolution?',
    opt('Offer a partial discount to keep the item', 'Arrange a replacement without delay — never a discount for a confirmed defect', 'Ask the customer to attempt a repair themselves', 'Refer the case to the Accounts/Admin Role'),
    'b', 'Ledsone Customer Support Handbook, Chapter 34 ("Faulty Product Troubleshooting — The Universal 3-Step Defective Flow")'),
  question('cs-m5-q3', 'cs-m5-quiz',
    'A customer received the wrong item due to an internal packing error. What is the approved way to describe this to the customer?',
    opt('"We sent the wrong item, our packing team made a mistake."', '"There appears to have been a mix-up with your order — we sincerely apologise."', '"An out-of-stock substitute was sent instead."', 'No acknowledgement is given at all.'),
    'b', 'Ledsone Customer Support Handbook, Chapter 35 ("Missing Parts & Wrong Item Handling — Wrong Item Golden Rules")'),
  question('cs-m5-q4', 'cs-m5-quiz',
    'A customer reports that a few small screws are missing from a lamp holder box. What does the handbook allow?',
    opt('The small, non-critical parts can be sent immediately without requiring a return', 'A full replacement of the whole product must always be sent', 'The case must always be escalated to Operations Manager first', 'No parts can be sent until the item is returned for inspection'),
    'a', 'Ledsone Customer Support Handbook, Chapter 35 ("Missing Parts & Wrong Item Handling — Missing Parts Golden Rules")'),
  question('cs-m5-q5', 'cs-m5-quiz',
    'A customer asks for a specific IP rating or wattage compatibility answer that is not stated in the product listing. What should the agent do?',
    opt('Give a best estimate based on similar products', 'Escalate rather than guess, since the listing does not confirm the answer', 'Confirm whatever the customer suggests to keep them satisfied', 'Ignore the question entirely'),
    'b', 'Ledsone Customer Support Handbook, Chapter 36 ("Product Information & Technical Support — Technical Information Rules")'),
  question('cs-m5-q6', 'cs-m5-quiz',
    'A customer reports a burning smell from an LED driver. What must be the very first sentence of the reply?',
    opt('An offer of a discount to compensate for the inconvenience', 'A request for photos before anything else is said', 'An instruction to stop using the item immediately', 'A question asking how long the customer has owned the product'),
    'c', 'Ledsone Customer Support Handbook, Chapter 37 ("Safety, Compliance & Recall Handling — Safety Complaint Protocol")'),

  // ======================================================================
  // Module 6 — Marketplace Protection and Risk
  // ======================================================================
  question('cs-m6-q1', 'cs-m6-quiz',
    'A customer has verbally agreed to a replacement instead of returning an item, but an eBay case is still open. What does the handbook require?',
    opt('No return label is needed, since the customer agreed verbally', 'A prepaid return label must still be uploaded to the eBay case before its deadline, regardless of the verbal agreement', 'The case can be closed immediately without any label', 'The customer must open a new case instead'),
    'b', 'Ledsone Customer Support Handbook, Chapter 38 ("eBay Account Health Protection — eBay Case Strategy")'),
  question('cs-m6-q2', 'cs-m6-quiz',
    'An Amazon A-to-Z claim is filed and the evidence clearly shows the claim is valid (a genuine loss or fault). What does the handbook recommend?',
    opt('Wait for Amazon to decide before taking any action', 'Issue a proactive refund before Amazon decides, to avoid the account-level impact', 'Dispute the claim regardless of validity', 'Ignore the claim until the customer contacts again'),
    'b', 'Ledsone Customer Support Handbook, Chapter 39 ("Amazon Account Health Protection — A-to-Z Guarantee Claims")'),
  question('cs-m6-q3', 'cs-m6-quiz',
    'Three fraud signals have been observed in a single case. What does Rule CS-047 require?',
    opt('Continue standard processing since three is not yet a large number', 'Stop all financial action, send a holding message only, and escalate the full summary to Team Head', 'Accuse the customer directly so they know they are being investigated', 'Close the case immediately without any resolution'),
    'b', 'Ledsone Customer Support Handbook, Chapter 53 ("Fraud Signal Register — CS-047, The 3-Signal Trigger")'),
  question('cs-m6-q4', 'cs-m6-quiz',
    'A customer\'s issue has been resolved, and the agent wants to ask them to reconsider negative feedback they left earlier. What is not allowed?',
    opt('Referencing the specific resolution when asking', 'Offering an incentive in exchange for revising the feedback', 'Asking privately and politely whether they would reconsider', 'Doing this only after the issue is actually resolved'),
    'b', 'Ledsone Customer Support Handbook, Chapter 40 ("Negative Feedback Management — The Negative Feedback Protocol")'),
  question('cs-m6-q5', 'cs-m6-quiz',
    'A customer opens a formal case through a Wayfair-style channel that this programme does not document in detail. What is the correct action?',
    opt('Apply the eBay case-handling procedure instead, since it is similar', 'Invent a reasonable procedure based on general customer service knowledge', 'Follow the no-match escalation rule, since the handbook does not document this workflow in the same depth as eBay/Amazon', 'Tell the customer this channel is not supported and take no action'),
    'c', 'Ledsone Customer Support Handbook, Chapter 3 ("Handbook Scope & Exclusion Matrix") and Chapter 14 ("Exception & No-Match Handling")'),
  question('cs-m6-q6', 'cs-m6-quiz',
    'A courier batch failure is confirmed to have delayed many separate orders at once. What is the correct approach?',
    opt('Handle each affected order as a fully separate, unrelated individual case', 'Identify all affected orders, escalate to Team Head/management, and prepare one proactive, consistent communication for all affected customers', 'Wait for every affected customer to contact before doing anything', 'Immediately issue full refunds to every affected order without any verification'),
    'b', 'Ledsone Customer Support Handbook, Chapter 42 ("Crisis Management Procedures — Crisis Types and Response Protocol")'),

  // ======================================================================
  // Module 7 — Evidence, Audit and Internal Operations
  // ======================================================================
  question('cs-m7-q1', 'cs-m7-quiz',
    'For a damaged item claim, how many separate photo types does the evidence matrix require before proceeding?',
    opt('One overall photo is sufficient', 'Two — the item and the box', 'Three — outer packaging, inner packaging, and multi-angle item photos, all required', 'No photos are required if the customer describes the damage clearly'),
    'c', 'Ledsone Customer Support Handbook, Chapter 55 ("Evidence Requirement Matrix — CS-045")'),
  question('cs-m7-q2', 'cs-m7-quiz',
    'What is the handbook\'s core documentation principle?',
    opt('Documentation is optional if the agent remembers the case clearly', 'If it is not recorded, it did not happen', 'Only escalated cases need to be documented', 'Documentation can be completed at the end of the week in a batch'),
    'b', 'Ledsone Customer Support Handbook, Chapter 46 ("Documentation & Record Keeping — The Documentation Standard")'),
  question('cs-m7-q3', 'cs-m7-quiz',
    'An agent believes a replacement has probably been dispatched but has not received explicit confirmation from the Warehouse Contact. What should the agent tell the customer?',
    opt('Confirm the dispatch to the customer anyway, since it is probably true', 'Nothing should be confirmed to the customer until the Warehouse Contact has actually confirmed it', 'Ask the customer to contact the warehouse directly for confirmation', 'Share the warehouse contact details so the customer can check themselves'),
    'b', 'Ledsone Customer Support Handbook, Chapter 48 ("Warehouse Communication Workflow — Warehouse Communication Rules")'),
  question('cs-m7-q4', 'cs-m7-quiz',
    'An eBay order is out of stock and must be cancelled. What is the correct sequence?',
    opt('Cancel using the out-of-stock reason code directly', 'Mark the order as dispatched on eBay first, then cancel through the correct process', 'Ignore the order until stock becomes available', 'Contact the customer to cancel it themselves through eBay'),
    'b', 'Ledsone Customer Support Handbook, Chapter 49 ("Inventory & Out-of-Stock Handling — OOS Handling by Channel")'),
  question('cs-m7-q5', 'cs-m7-quiz',
    'What four elements must every escalation to Team Head include?',
    opt('Only the order ID and the customer\'s name', 'A case summary, what has been verified, what has been told to the customer, and the specific decision needed', 'Just a request saying "please advise"', 'The agent\'s personal opinion on what should happen'),
    'b', 'Ledsone Customer Support Handbook, Chapter 50 ("Internal Escalation Framework — How to Escalate Correctly")'),
  question('cs-m7-q6', 'cs-m7-quiz',
    'The handbook refers to where case details are stored. What does this programme do with that reference?',
    opt('Names a specific external database system not mentioned in the source', 'Uses the generic term "case record," since the source does not name a specific system', 'Assumes it must be a spreadsheet', 'Leaves the evidence-storage question unanswered without any generic term'),
    'b', 'Ledsone Customer Support Handbook, Chapter 44 ("Audit Trail & Logging Standards") — the source does not name a specific technical system, and this programme does not invent one'),

  // ======================================================================
  // Module 8 — Canonical References and Golden Principles
  // ======================================================================
  question('cs-m8-q1', 'cs-m8-quiz',
    'Chapter 27 and Chapter 51 both discuss claim windows, and their content differs slightly in presentation. Which one is the canonical, authoritative source?',
    opt('Chapter 27, because it comes first', 'Chapter 51, because it is explicitly written as the single authoritative source that supersedes shorter earlier mentions', 'Both are equally authoritative, so either may be used', 'Neither — a new interpretation should be created'),
    'b', 'Ledsone Customer Support Handbook, Chapter 51 ("Claim Window Definitions — Start Date, Duration & Rules")'),
  question('cs-m8-q2', 'cs-m8-quiz',
    'Check 8 of the nine-point pre-send checklist (the safety check) fails for a specific message. What must happen?',
    opt('Send the message anyway and follow up on safety separately afterward', 'Stop entirely — do not send any message until the safety protocol has been completed', 'Skip check 8 if the other eight checks all passed', 'Ask the customer whether it is really a safety issue'),
    'b', 'Ledsone Customer Support Handbook, Chapter 52 ("Pre-Send Message Checklist — CS-042")'),
  question('cs-m8-q3', 'cs-m8-quiz',
    'The Chapter 56 template register names a template ID for a scenario, but no complete wording for it exists anywhere in the handbook. What is the correct action?',
    opt('Write a plausible version based on the scenario description and use it as if it were the approved template', 'Combine wording from two unrelated templates to fill the gap', 'Compose an original, checklist-compliant message instead, and log it as "ORIGINAL"', 'Refuse to reply to the customer at all'),
    'c', 'Ledsone Customer Support Handbook, Chapter 56 ("Canonical Template Register — CS-070")'),
  question('cs-m8-q4', 'cs-m8-quiz',
    'According to the Ten Golden Principles, what should an agent do when genuinely uncertain how to proceed?',
    opt('Make the most reasonable guess and move on quickly', 'Escalate — the handbook treats escalating as the correct action, not a failure', 'Wait for the customer to clarify their own request in more detail', 'Apply whichever rule seems closest, even if it does not quite fit'),
    'b', 'Ledsone Customer Support Handbook, Chapter 57 ("The Ten Golden Principles")'),
  question('cs-m8-q5', 'cs-m8-quiz',
    'The source governance chapters name specific individuals for roles such as Content Owner and Operations Manager. How does this programme refer to them?',
    opt('Using the real names exactly as they appear in the source', 'Using only generic role titles, with no real personal names displayed anywhere in learner-facing content', 'Using initials instead of full names', 'Omitting any reference to these roles at all'),
    'b', 'Programme-wide confidentiality rule — personal names genericised to role titles; see Ledsone Customer Support Handbook, Chapter 1 ("Handbook Governance Framework")'),
  question('cs-m8-q6', 'cs-m8-quiz',
    'A customer requests a formal VAT invoice with specific tax details. What does this programme teach?',
    opt('The agent should generate the invoice directly using the rules taught in this programme', 'Detailed invoice procedures are outside this programme\'s supported scope; the request routes to the Accounts/Admin Role, or the no-match protocol if no matching rule exists', 'The request should simply be declined', 'The agent should estimate the VAT amount themselves'),
    'b', 'Ledsone Customer Support Handbook, Chapter 3 ("Handbook Scope & Exclusion Matrix") and Chapter 8 ("Customer Support Team Structure") — detailed invoice procedures are excluded from this programme; see docs/customer-service-team-exclusions.md'),
];
