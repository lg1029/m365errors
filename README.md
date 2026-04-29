<img width="1623" height="675" alt="365errors" src="https://github.com/user-attachments/assets/f69c4cde-af7f-4620-a046-264b92ca1420" />

# M365ErrorFinder

A fast, searchable reference for Microsoft 365, Entra ID, Intune, Azure, and related error codes — built for helpdesk techs and IT admins who don't have time to dig through docs mid-ticket.

---

## What it does

- Search by error code or plain-English description across 12 categories
- Each error includes what it means, why it happens, and numbered steps to fix it
- Portal navigation paths for errors that require specific admin center steps
- Links to Microsoft Learn and relevant subreddits for each error
- Community submission form so others can contribute errors and fixes

## Categories covered

| Category | Example errors |
|---|---|
| Entra ID | AADSTS50011, AADSTS50105, AADSTS53003, AADSTS53000 |
| Intune | 0x87D1FDE8, 0x87D1041C, Device Not Compliant |
| Autopilot | 0x800705b4, 0x80070774 |
| Exchange Online | 550 5.1.1, 451 4.7.0 |
| SharePoint | Access Denied, List View Threshold, AADSTS50020 |
| OneDrive | 0x8004de40, Sync Conflict, Storage Quota Exceeded |
| Teams | caa20003, 80090016, 0xCAA82EE7 |
| M365 Apps | PRODUCT_DEACTIVATED, 0x8004FC12, 30015-11 |
| Azure | DeploymentFailed, QuotaExceeded, AllocationFailed, AuthorizationFailed |
| Graph API | 403 Forbidden |
| Purview | DLP_Policy_Tip_Block, Content Search Error 500 |
| Licensing | License_ForProductIsNotAvailable |

## Tech stack

- **Vite + React** — no TypeScript, no router, fully static
- **Tailwind CSS v3**
- **Google Fonts** — Inter + JetBrains Mono
- No backend, no database, no external API calls

## Running locally

```bash
npm install
npm run dev        # dev server at localhost:5173
npm run build      # production build → dist/
```

## Adding a new error

Edit one file: `src/data/errors.js`. Append an object to the `errors` array:

```js
{
  id: 'category_uniqueid',
  code: 'ERROR_CODE',
  category: 'entra',   // entra | intune | exchange | autopilot | purview | azure
                        // graph | licensing | sharepoint | onedrive | teams | m365apps
  title: 'Plain English title',
  summary: 'One-line summary.',
  whatItMeans: 'Full explanation for non-technical users.',
  whyItHappens: ['Reason 1', 'Reason 2'],
  whatToTry: ['Step 1', 'Step 2'],
  learnUrl: 'https://learn.microsoft.com/...',
}
```

Category tile counts update automatically. No other files need changing.

## Submit an error

Don't see a code listed? Use the **Submit an Error** button in the top right of the site to submit the code, a description, resolution steps, and an optional screenshot. Submissions are reviewed before being added.

## Contributing

Pull requests welcome. If you're adding errors, please include accurate `whatItMeans`, `whyItHappens`, and `whatToTry` fields — the goal is plain-English explanations that work for Tier 1 helpdesk staff, not just admins.
