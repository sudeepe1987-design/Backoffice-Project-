# Final consolidated website prompt

Update the existing Your Back Office website at https://yourbackoffice.app using the supplied complete source bundle. Preserve its identity, assets, case-workspace illustration and file-organisation demonstration. Implement the original brand brief and Kimi review together, applying the specific instructions below when they differ from older content. Complete the changes in code, verify the rendered result on desktop and mobile, and return the complete edited source with an honest implementation and deployment status.

## Identity and shared design

Back Office Solutions is an immigration documentation support centre. Describe services as documentation, checklist, organisation, case-preparation and quality-control support. Do not imply government affiliation, legal representation, guaranteed visa outcomes or unconditional 100% accuracy.

Use the established clean, premium design with a dark #0B1728 base, coordinated teal/blue and restrained lime accents. Keep the logo and existing case-workspace animation visually balanced with copy. Preserve the file-organisation demonstration; change its background only to suit the branding. Do not replace existing posters with generic stock images.

Use shared glass-toggle CTA styling. CTA controls must be real links/buttons with a decorative toggle treatment, not checkbox inputs pretending to navigate. Include visible keyboard focus, touch-friendly controls and reduced-motion support. All destinations must work and all forms must report the real result.

## Landing page and shared ticker

Remove the landing-page menu. Retain the logo, audience choice and premium landing treatment. Provide working Individual Client and Agency/Consultant links to their separate pages.

Use the same shared immigration ticker design on every page, including the landing page. Animate smoothly with a seamless repeat and provide pause controls, hover/focus pause and a static reduced-motion presentation. Never fabricate current updates or label unreviewed data as verified. Until a real feed is connected, use clearly labelled official-source coverage and review status.

## Individual page

Primary menu: COUNTRIES; PLANS & PRICING; REFER & EARN; LOG IN / SIGN UP.

Keep the existing premium hero styling and animated Immigration Case Workspace. The single primary hero CTA must be large and highlighted:

GET YOUR IMMIGRATION ELIGIBILITY AT ₹199 ONLY

Use the shared glass-toggle style and link to the Eligibility Check card, pricing section or a functioning enquiry/booking flow. Keep the Eligibility Check price and CTA consistent at ₹199. The earlier ₹499 eligibility CTA was contradictory; ₹499 belongs to Documentation Support – DIY unless the owner explicitly changes pricing.

Implement sticky word-by-word reveal from “Behind every successful…” through “Because every detail matters.” Follow https://codeshack.io/sticky-text-scroll-reveal-effect-js/: a roughly 200vh section, sticky viewport panel, words initially at 0.15 opacity, revealed progressively according to scroll progress and word thresholds, with a short opacity transition. Use requestAnimationFrame to coordinate scroll updates. Keep the entire text readable without clipping on short/mobile screens and show it fully under reduced-motion preferences.

## Global Opportunities / countries

Use the supplied MDJAmin expanded-card animation pattern, adapted to the existing country posters. Canada is enlarged by default. Selecting or hovering Australia smoothly enlarges Australia into the main position while Canada joins the smaller placeholders. Clicking, keyboard navigation and compact country arrows must work for every country.

Preserve the entire poster, including text, logos and borders. Use object-fit: contain and a matching dark frame; do not crop with cover. Keep all visible thumbnail cards inside the gallery. Crossfade/slide poster sequences smoothly without flashes, jump cuts or fast zooms. Pause automatic poster cycling on hover, focus and touch. Passive wheel interaction can advance a poster sequence but must not trap page scrolling. Only show poster arrows for countries with multiple images. Include a global pause control and respect reduced motion.

## Individual pricing

Retain all existing service offerings, with a consistent structure for each card: service name, price, short purpose, delivery method, included items and working glass-toggle CTA. Do not invent new prices or claim outcomes delivered by governments, regulators or financial providers.

Use https://codepen.io/vii120/pen/VYmmdMK as the carousel motion reference. Show four readable pricing cards at desktop widths, two on tablet and one on small screens. Remaining plans move horizontally through arrows, dots/slider and native scrolling. Include subtle perspective, smooth transitions, end states, keyboard support and reduced motion. Prioritise readable service details over the proportions of the image-only demo.

Eligibility Check:
- ₹199; 10-minute video or phone call.
- Purpose: a low-cost first check before spending substantially on a full immigration, visa or documentation process.
- Include target-country/pathway review, basic education and work-history discussion, available-document review, obvious documentation gaps, practical next steps, and guidance on whether full documentation support may suit the client.
- CTA: ELIGIBILITY CHECK — ₹199.

Documentation Support – DIY:
- ₹499; video or phone-call guidance with checklist and document-organisation support.
- For clients collecting, preparing and submitting their own documents who want process guidance.
- Plain-language inclusions: a checklist for your case; which documents belong together; file names and folder organisation; a video or phone consultation; guidance on supporting evidence; basic quality advice before proceeding.
- CTA: GET DOCUMENTATION SUPPORT – DIY.

Give every other existing pricing card equally clear, accurate details.

## Agency page

Primary menu: COUNTRIES WE SUPPORT; PLANS & PRICING. Highlight PARTNER WITH US using the shared glass-toggle CTA and link it to the agency enquiry/custom-offer section.

Keep the animated Immigration Case Workspace unchanged. Preserve this headline:

Your Clients.
Your Brand.
We’re the Back Office.

Use the same sticky word reveal from “Behind every successful…” to “Because every detail matters,” with the same dark styling and responsive/reduced-motion treatment as the Individual page.

Use three professional agency plans with the outlined-card structure referenced at https://freefrontend.com/tailwind-pricing-tables/:

1. Case Studio: up to 25 case files/month; ₹12,000 per case file. For agencies building a reliable documentation workflow with manageable monthly volume.
2. Case Practice: up to 50 case files/month; ₹8,000 per case file. For steady-volume agencies needing repeatable operations, coordination and quality control.
3. Case Network: more than 100 case files/month; ₹6,000 per case file. For high-volume white-label operations and a dedicated coordination structure.

Clearly label these as per-file prices, not monthly totals. Route 51–100 files/month to a custom quote instead of inventing an unapproved tier.

Each plan must include all scoped deliverables: client consultation; required-document checklist; document collection tracking; naming/indexing/folder organisation; forms and supporting-document preparation; evidence mapping; multi-point quality-control review; final corrections where required; submission-ready handover to the agency.

Use: “Multi-point quality control for complete, consistent and submission-ready documentation.” A conditional documentation-completeness target is acceptable, tied to the agreed checklist and valid information supplied by the client. Do not imply perfect accuracy or visa approval.

Place the agency workflow after the plans. Preserve the custom-offer form, agency audience categories and quality-control explanation. Required enquiries must validate and reach a real configured destination.

## Date selection and footer

Use https://codeshack.io/interactive-3d-event-calendar-js/ as the calendar reference: glass styling, gentle 3D treatment and selected-date panel. Disable past dates and carry the selected date/service into the enquiry. Clearly state that this is a preferred-date request requiring team confirmation unless an actual availability/booking provider is connected. Do not pretend payment or booking succeeded.

Adapt only the footer pattern from https://codepen.io/jakebogan01/pen/pvNWZWr: rounded top corners, centered navigation, clear brand wordmark, divider, contact links and legal row. Use Back Office branding and the dark palette. Do not copy Mugsy products, statistics, social URLs or demo content. Keep existing verified business contact information, privacy, cookies and terms links. Do not invent social profiles.

## Login, enquiries and referrals

Provide an honest functional login/sign-up flow using a configured authentication provider. The included implementation uses Supabase email OTP, server-side verification and an HttpOnly Secure cookie with a one-hour maximum session. It does not include a case database or document portal. Configure the numeric email-token template, SMTP and provider rate limits before live verification.

The included enquiry implementation uses Vercel functions, Resend delivery and Cloudflare Turnstile. Keep secrets in environment variables; validate origin, payload, email and challenge server-side. Confirm submission only after the delivery provider accepts it. Missing configuration must show an unavailable message and working direct-contact alternatives. Test failures as well as success. Never include secrets in browser files or the downloadable source.

REFER & EARN must lead to a real referral enquiry page. Do not invent reward amounts, payout guarantees or a referral tracking system. Explain that terms must be agreed before a referral proceeds. Avoid collecting another person's documents or private information through the public form.

## Immigration intelligence dashboard

Provide six country modules: Canada, Australia, United Kingdom, United States, Ireland and Europe. Separate international-student and foreign-worker topics. Use a self-contained, scoped, dependency-free JavaScript/CSS widget suitable for adaptation into WordPress.

Load asynchronously with loading, empty/error and refresh states. Try primary data, then secondary data, then a controlled manual snapshot. Use authoritative official sources, normalized JSON, safe text rendering and an allowlist for source links. Handle concurrent tab changes so old responses cannot overwrite the selected country.

Do not confuse successful fetching with verification. Only show verified labels/figures after an actual source audit with a valid timestamp. Expired/unreviewed snapshots must show a clear manual-review state and official-source links. The supplied bundle has pending snapshots and adapter hooks; live retrieval/parsing and current audited data remain to be connected. Do not claim these feeds are live until they are implemented and verified.

## Final verification and handover

Check desktop, tablet and narrow mobile layouts; landing audience links; menus; hero CTA; sticky reveal; Canada default and Australia selection; full poster framing; all pricing cards through the last item; calendar-to-form prefill; dashboard country tabs; login unavailable/error/success states as applicable; enquiry validation and provider failure handling; keyboard focus; reduced motion; missing images, links and console errors.

Run the supplied server tests. Distinguish mocked provider tests from real production sign-in/email verification. Preserve existing content/assets unless a specific change is required. Supply the entire edited source ZIP, setup notes, environment-variable template, checks performed and remaining integration work. State clearly whether the live domain was deployed. Never label the whole system production-ready while external connections remain incomplete.
