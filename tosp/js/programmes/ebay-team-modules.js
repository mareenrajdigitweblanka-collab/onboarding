// programmes/ebay-team-modules.js — eBay Team programme MODULES + LESSONS.
//
// SOURCE-OF-TRUTH STATUS: every Module and Lesson below is derived from one of
// the FINAL eBay Team source documents (see ebay-team-programme.js
// SOURCE_DOCUMENTS) and carries a `source` field citing the exact document/day/
// slide it comes from. Content status is FINAL_TRUTH. Learner progress
// recorded in this browser remains PROTOTYPE_ONLY and is not official
// onboarding evidence.
//
// SCOPE RULES APPLIED (see docs/ebay-team-source-map.md):
//  - No PH / Sales or Amazon curriculum, names, thresholds or sign-off rules
//    appear here.
//  - The Amazon-specific "A+ Content" slide found inside the EBAY BGCT deck is
//    source contamination (an unedited Amazon template slide) and is excluded
//    entirely — it is not an eBay rule.
//  - Confidential internal seller-account names (LEDSone/Sun/Electricalsone
//    accounts), live listing counts, and internal policy/profile IDs from the
//    EBAY BGCT deck are deliberately NOT reproduced. Only the general,
//    account-agnostic policy pattern they illustrate is taught.
//  - Modules 1–7 follow the source's explicit Day 1–7 sequence (7-Day eBay
//    Training Program PDF, the primary structural source). Module 8 is a
//    separate Listing Optimization Deep-Dive built from the EBAY BGCT deck.
//  - The 7-Day PDF is treated as authoritative over the Markdown export,
//    which lost structure in conversion (see source map); content the
//    Markdown dropped (e.g. the Day 2 knowledge-check items) is restored here
//    from the PDF.

const PROGRAMME_ID = 'prog-ebay-onboarding';

const module = (id, orderIndex, title, summary, estimatedMinutes, source, prerequisiteModuleIds) => ({
  id,
  programmeId: PROGRAMME_ID,
  orderIndex,
  title,
  summary,
  estimatedMinutes,
  prerequisiteModuleIds: prerequisiteModuleIds || [],
  // eBay Team requires NO team-leader sign-off (user-confirmed requirement).
  requiresSignoff: false,
  status: 'FINAL_TRUTH',
  source,
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
// MODULES — 8, strictly sequential: Modules 1–7 mirror the source's Day 1–7
// order; Module 8 is the Listing Optimization Deep-Dive.
// ---------------------------------------------------------------------------

export const MODULES = [
  module('eb-m1', 1, 'Introduction to eCommerce',
    'What eCommerce is, the B2B/B2C/C2C/D2C models, online vs offline selling, and where eBay and the Seller Hub fit in.',
    14, '7-Day eBay Training Program PDF — Day 1'),
  module('eb-m2', 2, 'eBay Account Basics & Seller Hub Navigation',
    'Seller Hub navigation across Listings, Orders, Messages, Performance and Settings, and the Day 2 knowledge checks that confirm it.',
    14, '7-Day eBay Training Program PDF — Day 2', ['eb-m1']),
  module('eb-m3', 3, 'Product Research & Listing Fundamentals',
    'Researching what to sell, and the basic building blocks of a quality listing — title, images, item specifics and description at an introductory level.',
    16, '7-Day eBay Training Program PDF — Day 3', ['eb-m2']),
  module('eb-m4', 4, 'Practical Listing Creation',
    'The end-to-end 8-step workflow for publishing a listing, plus the variation-listing rules that apply when a product comes in more than one option.',
    16, '7-Day eBay Training Program PDF — Day 4', ['eb-m3']),
  module('eb-m5', 5, 'Account Health & Customer Service',
    'The four account-health metrics that must stay within limit, and the customer-service standard expected on every buyer reply.',
    14, '7-Day eBay Training Program PDF — Day 5', ['eb-m4']),
  module('eb-m6', 6, 'Order Management & Daily Operations',
    'The daily order lifecycle from receipt to delivery, and the routine checks and issue-handling that keep operations on track.',
    14, '7-Day eBay Training Program PDF — Day 6', ['eb-m5']),
  module('eb-m7', 7, 'Advanced Optimization & Final Evaluation',
    'Post-launch optimization habits, the mistakes Day 7 flags as unacceptable, and the final checklist that closes out the 7-day programme.',
    16, '7-Day eBay Training Program PDF — Day 7', ['eb-m6']),
  module('eb-m8', 8, 'Listing Optimization Deep-Dive',
    'The exact, source-stated rules for titles, main and supporting images, item specifics, descriptions, postage & returns, and variation listings.',
    22, 'EBAY BGCT PDF — Create the Perfect Listing', ['eb-m7']),
];

// ---------------------------------------------------------------------------
// LESSONS
// ---------------------------------------------------------------------------

export const LESSONS = [
  // Module 1 — Introduction to eCommerce
  lesson('eb-m1-l1', 'eb-m1', 1, 'eCommerce, Marketplaces & Selling Models',
    'eCommerce means buying and selling through a digital marketplace instead of a physical shop, and it works at a global scale rather than a single local location. Sellers describe transactions by who is on each side of the sale: B2B (business to business), B2C (business to consumer), C2C (consumer to consumer), and D2C (direct to consumer, skipping a middleman). Online selling differs from offline selling in reach, speed, and the tools available to manage it — understanding that difference is the starting point before touching any platform.',
    7, '7-Day eBay Training Program PDF — Day 1, Slide 2 (Introduction to eCommerce)'),
  lesson('eb-m1-l2', 'eb-m1', 2, 'Where eBay Fits & the Seller Hub',
    "eBay is introduced as one of the major global eCommerce platforms, and the Seller Hub is the seller's home base inside it — the place every other Day 2 skill (listings, orders, messages, performance, settings) is built on top of. Building this eCommerce foundation on Day 1, before opening any tool, is what the programme expects before a learner starts hands-on work.",
    7, '7-Day eBay Training Program PDF — Day 1, Slide 2 (Popular Platforms / Introduction to eBay / eBay Seller Hub Overview)'),

  // Module 2 — eBay Account Basics & Seller Hub Navigation
  lesson('eb-m2-l1', 'eb-m2', 1, 'Finding Your Way Around the Seller Hub',
    "The Seller Hub is organised into distinct working areas: the Listings page for managing what's for sale, the Orders section for tracking what's been sold, Messages for buyer contact, a Performance tab for account-health numbers, and Account Settings alongside a Policies area for shipping/returns/payment rules. Day 2's hands-on goal is to open each of these areas at least once so their location becomes automatic before Day 3's heavier listing work.",
    7, '7-Day eBay Training Program PDF — Day 2, Slide 4 (eBay Account Basics & Navigation)'),
  lesson('eb-m2-l2', 'eb-m2', 2, 'Confirming You Can Navigate — Knowledge Check',
    'Before moving on, a learner should be able to do three things without help: explain what each Seller Hub section is for, find where performance metrics are displayed, and describe how an order moves from being placed through to being tracked and managed. These three checks are the actual Day 2 knowledge-check gate — navigating a section once is not the same as being able to explain and locate things independently.',
    7, '7-Day eBay Training Program PDF — Day 2, Slide 5 (Knowledge Check)'),

  // Module 3 — Product Research & Listing Fundamentals
  lesson('eb-m3-l1', 'eb-m3', 1, 'Researching a Product Before Listing It',
    'Before creating a listing, Day 3 asks a learner to work through demand analysis (is anyone searching for this), competition analysis (who else already sells it and how), profit margin basics (do the numbers still work after costs), and shipping feasibility (can it be shipped reasonably). Skipping this research step is what leads to listings that are technically correct but never actually sell.',
    6, '7-Day eBay Training Program PDF — Day 3, Slide 6 (Product Research)'),
  lesson('eb-m3-l2', 'eb-m3', 2, 'The Building Blocks of a Listing',
    'A listing is built from several fundamentals working together: title optimization, item specifics, the product description, and images paired with a pricing strategy. Day 3 introduces each of these at a foundational level — the full exact rules for each one (character limits, image resolution, description length) are covered in depth later, in the dedicated Listing Optimization Deep-Dive module.',
    6, '7-Day eBay Training Program PDF — Day 3, Slide 6 (Listing Fundamentals)'),
  lesson('eb-m3-l3', 'eb-m3', 3, 'What a Reviewer Checks For',
    'Two checklists define listing quality on Day 3: a competitor-analysis check (title, pricing, images, shipping setup and item specifics all reviewed against similar listings) and a listing-quality check (an SEO title added, the correct category selected, item specifics completed, the description properly structured, high-quality images uploaded, the price added correctly, and shipping configured). A listing only counts as "research complete" once both checklists are satisfied.',
    6, '7-Day eBay Training Program PDF — Day 3, Slide 7 (Research & Listing Quality Checklists)'),

  // Module 4 — Practical Listing Creation
  lesson('eb-m4-l1', 'eb-m4', 1, 'The 8-Step Listing Workflow',
    'Day 4 turns Day 3\'s fundamentals into a fixed build order: choose the category, add the title, add item specifics, upload images, add the description, set the price, configure shipping, then publish. The category is chosen first because the item-specifics fields that follow depend on it — starting elsewhere in the sequence causes rework.',
    7, '7-Day eBay Training Program PDF — Day 4, Slide 8 (Practical Listing Creation)'),
  lesson('eb-m4-l2', 'eb-m4', 2, 'Variation Listings & Knowing the Listing Is Complete',
    "When one listing covers several buying options (for example several colours of the same product), Day 4's variation rules require the correct variation type to be used, accurate images for each variation, stock entered for every variation, and correct pricing per variation. A listing is only \"done\" once the practical checklist is satisfied end to end: a draft listing created, an optimized title, all item specifics added, optimized images uploaded, a product description written, the correct price set, and both a shipping policy and a return policy configured.",
    7, '7-Day eBay Training Program PDF — Day 4, Slide 9 (Listing Creation Checklists / Variation Listing Rules)'),

  // Module 5 — Account Health & Customer Service
  lesson('eb-m5-l1', 'eb-m5', 1, 'The Four Account Health Metrics',
    'Four numbers are tracked to judge whether a seller account is healthy: Transaction Defect Rate must stay below 2%, Late Shipment Rate must stay below 10%, Cancellation Rate must stay below 2%, and Cases Closed Without Resolution must stay below 0.3%. Each measures a different failure mode — defects, lateness, cancelling on buyers, and unresolved disputes — so reviewing account health means checking all four, not just one.',
    7, '7-Day eBay Training Program PDF — Day 5, Slide 10 (Key Performance Metrics)'),
  lesson('eb-m5-l2', 'eb-m5', 2, 'Customer Service Standards',
    'On top of the four metrics, Day 5 sets a service standard for every buyer interaction: reply professionally, keep to a consistent response time, handle complaints properly rather than dismissing them, offer the correct resolution for the situation, and stay polite throughout. Reviewing the seller level and any open customer complaints alongside the four metrics is what turns "checking the numbers" into actually protecting the account.',
    7, '7-Day eBay Training Program PDF — Day 5, Slide 11 (Performance Monitoring & Customer Handling Checklists)'),

  // Module 6 — Order Management & Daily Operations
  lesson('eb-m6-l1', 'eb-m6', 1, 'The Order Lifecycle & Daily Checklist',
    'Every order moves through the same five stages: received, packed, shipped, tracking uploaded, and delivered. Day 6\'s daily routine wraps around that lifecycle — check new orders, check customer messages, upload tracking numbers, check account health, check stock availability, and review listing errors and cancellations — so nothing from the previous day is left unattended.',
    7, '7-Day eBay Training Program PDF — Day 6, Slide 12 (Order Management & Daily Operations)'),
  lesson('eb-m6-l2', 'eb-m6', 2, 'Handling the Day-to-Day Issues',
    'Beyond the routine checklist, Day 6 names the specific issues a seller must be ready to act on: an order cancellation handled, an out-of-stock issue handled, a late shipment updated, negative feedback replied to, and a buyer complaint resolved. Each ties back to the Module 5 account-health metrics — leaving a late shipment un-updated, for example, is exactly what pushes the Late Shipment Rate toward its 10% limit.',
    7, '7-Day eBay Training Program PDF — Day 6, Slide 13 (Issue Management Checklist)'),

  // Module 7 — Advanced Optimization & Final Evaluation
  lesson('eb-m7-l1', 'eb-m7', 1, 'Optimizing After Launch',
    'Once a listing is live, Day 7 shifts attention to keeping it competitive: improving title keywords over time, checking pricing against competitors, refreshing older listings, keeping inventory accurate, and monitoring performance on an ongoing basis rather than only at launch. This habit is what separates a listing that sells once from one that keeps selling.',
    8, '7-Day eBay Training Program PDF — Day 7, Slide 14 (Advanced Optimization & Final Evaluation)'),
  lesson('eb-m7-l2', 'eb-m7', 2, 'Mistakes to Avoid & Closing Out the Programme',
    'Day 7 names six mistakes as unacceptable at this stage: wrong category selection, delayed message response, incorrect item specifics, poor image quality, shipping delays, and policy violations. Closing out the 7-day programme means being able to create an eBay listing, optimize a title, understand account health, process orders, and handle customer messages — demonstrated through a completed final task set (an optimized listing created, a customer reply drafted, a workflow summary completed, and Seller Hub usage demonstrated). Completing this checklist marks learning progress in this prototype; it is not an employment decision or a certificate.',
    8, '7-Day eBay Training Program PDF — Day 7, Slides 15–16 (Common Mistakes, Final Skill Evaluation & Final Assessment Tasks)'),

  // Module 8 — Listing Optimization Deep-Dive
  lesson('eb-m8-l1', 'eb-m8', 1, 'Title Optimization',
    'An eBay title has an 80-character hard limit, and because mobile screens truncate long titles, the first 40 characters carry the priority keywords (product type, colour, size, fitting). Certain characters are forbidden in a title — ! ? { > ^ % / — and a strong title follows the formula [Main Keyword] + [Material/Style] + [Colour/Size] + [Fitting/Features]. eBay\'s own search engine, Cassini, is what matches a listing to buyer searches, reading keywords from the title together with the description and item specifics — so a strong title also feeds Cassini correctly.',
    8, 'EBAY BGCT PDF — Title Optimization section (Slides 2, 6)'),
  lesson('eb-m8-l2', 'eb-m8', 2, 'Main Image Rules',
    'The main image should be high-resolution — 2000×2000 pixels is the recommended size — and must show exactly the item being sold. No text, artwork, or logos may be added to the image, and watermarks of any kind are not allowed, including ones used only to mark ownership. The same main image must not be reused across more than one seller account.',
    7, 'EBAY BGCT PDF — Main Image section (Slide 7)'),
  lesson('eb-m8-l3', 'eb-m8', 3, 'Supporting Images',
    "Supporting images stay just as clean as the main image — no promotional text or badges — and their job is different: giving the buyer a sense of scale (for example next to a ruler or an everyday object, with accurate measurement images included) and showing the item in real-world use so the buyer isn't left guessing at size or context.",
    6, 'EBAY BGCT PDF — Sub Images section (Slide 9)'),
  lesson('eb-m8-l4', 'eb-m8', 4, 'Item Specifics',
    'Item specifics should be filled in completely — every required field and every recommended field, not just the required ones — because the more fields completed, the more search filters the listing can appear under. Specifics should be written the way a buyer would actually search (for example a room field for a light fitting), and a key feature is worth stating in both the item specifics and the description so it is found either way.',
    7, 'EBAY BGCT PDF — Item Specifics section (Slide 11)'),
  lesson('eb-m8-l5', 'eb-m8', 5, 'Writing the Description',
    'A description uses a base font size of 16 pixels and should never drop below 12 pixels, or the buyer has to zoom in to read it. Overall length should sit in the 1500–2000 character/word range, and because the first 250 characters are the most important, the strongest information belongs at the very start, not buried later. As with the main image, the same description text must not be reused across more than one seller account.',
    7, 'EBAY BGCT PDF — Description section (Slide 13)'),
  lesson('eb-m8-l6', 'eb-m8', 6, 'Postage & Returns',
    "Fulfilling an order correctly means shipping within the handling time stated on the listing, using the delivery service the buyer selected, and uploading accurate tracking. The return window referenced is 30 days, with the buyer paying return postage — unless an eBay-provided return label is used, in which case that postage cost is deducted from the refund instead. This sits alongside a separate legal right: under the Consumer Contract Regulations 2013, most buyers also have a 14-day right to cancel a purchase after receiving it, which is distinct from the 30-day return window.",
    8, 'EBAY BGCT PDF — Postage & Return Policy section (Slides 16–17)'),
  lesson('eb-m8-l7', 'eb-m8', 7, 'Variation Listing Rules',
    'A single eBay listing may use only one variation type — Colour or Size. If a product genuinely differs by more than one attribute, resist the urge to stack a second axis such as style, type, or pack quantity onto the same listing; that combination is the one thing this rule says not to do, even though it might feel like it keeps things tidy.',
    6, 'EBAY BGCT PDF — Common Rules For eBay section (Slide 20)'),
];
