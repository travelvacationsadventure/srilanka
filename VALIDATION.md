# Validation — September 19, 2026

## Passed

- Built Firebase Hosting output with all 12 original posts, including the Italy article absent from the original posts array.
- JavaScript syntax checks and admin DOM reference checks.
- Six backend tests (`npm test`): content sanitization; validation; server-rendered article/SEO output; unauthenticated/non-admin access rejection; create/update/conflict/draft/delete lifecycle; deleted seed articles do not reappear.
- Chromium browser checks with Firebase SDKs and API responses mocked locally: email/password form, 12-post dashboard, search, new story, simulated upload, save draft, preview, publish, edit, delete, desktop and 390-pixel mobile layouts.
- Visually reviewed desktop login, dashboard, editor, and mobile editor screenshots. No document-level horizontal overflow on mobile.

## Not verified against the live Firebase project

Real credentials/login, live image upload, deployed Storage rules, live Realtime Database permissions/transactions, domain authorization, billing, and Firebase deployment. The provided Firebase config identifies the project but does not provide deployment credentials. Complete START-HERE.md, then verify one draft, one image upload, publishing, editing, unpublishing and deletion on your deployed site.

Backend tests use an in-memory Admin SDK substitute. They verify application behavior but do not replace Firebase Emulator or live integration tests. Browser image upload tests simulate completion, not network transfer.

The `previews/` screenshots show a locally tested interface with sample admin identity and a temporary test story. Those values are not seeded into your Firebase database. The actual seed contains only the original 12 posts.
