# Intelligence data contract

Each primary/secondary endpoint and manual snapshot must return:

```json
{
  "country": "canada",
  "auditStatus": "pending",
  "verifiedAt": null,
  "students": [{
    "title": "Study permits",
    "summary": "An audited factual summary goes here.",
    "scope": "Check current eligibility at the official source.",
    "source": "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html"
  }],
  "workers": [{
    "title": "Work permits",
    "summary": "An audited factual summary goes here.",
    "scope": "Check current permit requirements at the official source.",
    "source": "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html"
  }]
}
```

Both arrays must be nonempty. `value` is an optional short numeric/text metric. Source URLs must be HTTPS and match the allowlisted official domains in `intelligence.js`. Rendering uses textContent, not remote HTML.

Only an actual audit should set `auditStatus` to `verified` and `verifiedAt` to the audit's ISO timestamp. The widget hides summary/metric values once verification is more than seven days old, missing or future-dated. Refreshing the page does not establish verification.

Example configuration (replace with your own implemented endpoints):

```js
window.BO_INTELLIGENCE_CONFIG = {
  canada: {
    primary: '/api/intelligence-canada',
    secondary: '/api/intelligence-canada-backup'
  }
};
```

These example endpoints are not supplied. Scheduled retrieval, official-source parsing, audit ownership and monitoring must be provided by the data operator.

For WordPress, enqueue `intelligence.css` and `intelligence.js`, copy the `[data-intelligence]` block from `intelligence.html`, and host manual JSON at the path used by `loadCountry` (or adjust that path to the plugin asset URL). No React, Vue, Tailwind or third-party runtime is needed for this widget.
