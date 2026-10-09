# Your Back Office — complete source bundle

Revised 9 October 2026 from the existing public website, the supplied original brief and Kimi review. This is the complete editable site, including posters and Vercel API handlers. It has not been deployed to the live domain.

## Preview and verify

Use Node.js 22 or newer. No package installation is needed.

```sh
npm run preview
# Open http://127.0.0.1:8766
npm test
```

For Vercel, use this folder as the project root with framework preset **Other**, no build command and no output-directory override. The HTML/assets are static; `/api` runs as Vercel functions. Keep `lib/server.js` with the handlers. `vercel.json` provides clean URLs and response headers. A static-file-only upload will not run the API functions.

## Included changes

- Navy branding, simplified audience landing page and shared animated source ticker/footer.
- Individual and agency navigation corrected; original animated case workspaces retained.
- Sticky word-by-word reveal follows the supplied CodeShack thresholds. Oversized mobile layouts and reduced-motion preferences use fully readable static text.
- Canada opens as the enlarged country. Country selection repositions cards; posters remain fully contained. Multi-poster cards crossfade, support passive wheel navigation and pause during hover/focus/touch. Global pause and keyboard controls are included.
- Individual pricing: 23 existing services with purpose, format, inclusions and working enquiry links; four visible cards on desktop, two on tablet, one on small screens; arrows, dots and native horizontal scrolling.
- Eligibility uses ₹199 consistently. The conflicting ₹499 CTA in the supplied notes was resolved to the stated service/hero price. DIY guidance is ₹499.
- Agency plans: Case Studio ₹12,000/file (up to 25/month), Case Practice ₹8,000/file (up to 50/month), Case Network ₹6,000/file (more than 100/month). All nine scoped deliverables are listed. 51–100 files goes to a custom quote.
- Date selection carries the requested date and service into the enquiry form. This is a date request, not an availability calendar or paid booking.
- Passwordless login/account foundation, referral enquiry page and server-side email delivery handlers. Unconfigured services clearly show unavailable states.
- Six-country, dependency-free intelligence widget with student/worker sections, keyboard tabs, asynchronous loading and primary/secondary/manual fallback.

## Connect production services

Use Vercel environment variables listed in `.env.example`; redeploy after setting them. No credentials are included. Authentication and email delivery were tested with mocked providers, not real accounts.

1. **Cloudflare Turnstile:** create a widget allowing your production hostname (and explicit preview hostname if needed). Set the site and secret keys. The server validates both the challenge and hostname. Provider keys remain server-side except the public site key.
2. **Supabase Auth:** set the project URL and public anon key; enable email sign-in/sign-up. Configure the email template to send the numeric `{{ .Token }}` for this OTP screen rather than only a magic link. Configure production SMTP and provider rate limits. Existing and new users use the same email-code flow. A one-hour maximum HttpOnly, Secure session cookie is set; the user signs in again when it expires. There is no case database, document upload or client-file history in this release.
3. **Resend:** verify your sending domain, create an API key, and set `ENQUIRY_FROM` to an authorised sender (for example `Back Office <requests@your-verified-domain>`). Set `ENQUIRY_TO` to the receiving inbox. Enquiries are delivered as plain-text email; this is not a CRM or durable case-storage system. The UI only confirms delivery when the provider returns an accepted message ID.
4. **SITE_URL:** set the exact production origin. Vercel's deployment URL is also recognised by the request-origin check. For API testing locally, use a localhost SITE_URL and appropriate Turnstile settings; secure login cookies should be tested on HTTPS.
5. Run a real sign-in and a consented test enquiry on a Vercel preview before production release. Confirm receipt, failure messaging and expiry behaviour.

Official setup references: [Supabase passwordless email](https://supabase.com/docs/guides/auth/auth-email-passwordless), [Resend email API](https://resend.com/docs/api-reference/emails/send-email), [Turnstile server validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).

## Immigration intelligence: current status

The UI and fallback engine are implemented. **Live data adapters and audited current-policy snapshots are not connected.** Included country JSON files are explicitly marked `pending`; the site shows official-source links and no invented live figures or verification claims. The ticker labels source coverage rather than presenting fabricated news.

To connect data, define `window.BO_INTELLIGENCE_CONFIG` before `assets/js/intelligence.js`, with country keys `canada`, `australia`, `united-kingdom`, `united-states`, `ireland`, `europe`. Each value can contain `primary` and `secondary` URLs returning normalized JSON. Use same-origin server adapters when government pages do not permit browser CORS; do not pass raw HTML into this widget. See `docs/intelligence-schema.md`.

## Editing

- Content: root HTML files; service cards in `assets/js/individual-plans.js`.
- Brand and responsive changes: `assets/css/upgrade.css`; original styles remain available.
- Posters and country sequencing: `assets/js/countries-support.js` and `assets/images/`.
- Contact details: `assets/js/config.js` and the static footer HTML. Existing supplied telephone and WhatsApp numbers were retained.
- Service integrations: `api/`, `lib/server.js`, `assets/js/upgrade.js`.

The reference animations were adapted to the existing plain HTML/CSS/JavaScript site rather than installing React, Vue or Tailwind. This is not a pixel-identical copy of each example: four readable pricing cards and uncropped artwork take priority over image-only demo proportions. Reference sources are listed in `docs/references.md`.
