# Verification record — 9 October 2026

- Static audit: 19 HTML pages; local referenced files present; JavaScript and inline script syntax valid; no Unicode replacement characters found.
- Server tests: 12 passed, 0 failed. Covered origin restrictions, missing configuration, invalid email, payload limits, failed/foreign-host challenges, delivery rejection/success, preferred-date preservation, anonymous account access, failed OTP, secure bounded session cookie and no secret exposure.
- Browser inspection: desktop four-card pricing layout; final carousel position “20–23 of 23” with next arrow disabled; Canada default and Australia selection; poster object-fit contain and complete loaded images; mobile agency menu and detailed plans; preferred date/service transferred to contact form; Australia dashboard tab and honest manual-review status; 320px landing with working audience URLs and no landing menu; 375px individual/agency/contact/dashboard layouts without horizontal page overflow.
- Mobile hero uses readable static text when the combined copy/workspace exceeds the available sticky viewport. Reduced-motion behaviour is implemented in CSS/JavaScript; no system reduced-motion emulation was performed during this verification.
- Original animated workspace remains in both audience pages. Existing branding/assets were preserved.

Limits: authentication/email tests mock the providers. Real Supabase, Resend and Turnstile connections have not been configured or tested. The calendar requests a date and does not reserve an appointment. Intelligence snapshots await a real policy audit; live adapters are not implemented. No production deployment was performed. This record is not a claim of full accessibility certification or exhaustive cross-browser testing.
