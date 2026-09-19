# Travel Vacation Adventure — Journal Studio

Your complete Firebase blog and admin panel. The supplied Firebase project configuration is already connected in `admin/firebase.js`.

## What is included

- Email/password login and password reset using Firebase Authentication. No PIN, invitation code, or extra login password.
- Responsive dashboard with counts, search, category filters, and draft/published tabs.
- Create, edit, publish, unpublish, and delete articles.
- Rich-text editing with headings, bold/italic, lists, quotes, links, and inline images.
- Cover and inline image uploads from your computer, with upload progress (JPG, PNG, WebP, GIF under 10 MB).
- Draft previews, unsaved-change warnings, word count, reading time, and JSON backup export.
- SEO title, meta description, descriptive URL, image alt text, tags, and search preview.
- Server-rendered public articles, Open Graph tags, BlogPosting structured data, canonical links, sitemap, robots.txt, and actual 404 responses.
- All 12 original articles, including the standalone Italy article, imported automatically on first use. Later deployments never overwrite database edits or resurrect deleted posts.
- Original homepage design and photos; its latest stories update automatically.

## Important deployment information

This edition runs on **Firebase Hosting + Cloud Functions + Realtime Database + Cloud Storage**. It is not a GitHub Pages-only site. GitHub Pages cannot execute the backend needed for instant server-rendered publishing. The original static files are preserved as source, but the deployable website is the generated `public/` folder together with `functions/`.

Firebase **Blaze billing** is required for Cloud Functions and Cloud Storage. Usage-based charges may apply. See https://firebase.google.com/docs/hosting/functions and https://firebase.google.com/docs/storage/faqs-storage-changes-announced-sept-2024 .

The code is complete, but your Firebase resources must be enabled and deployed. No deployment or live Firebase account changes were performed in preparing this ZIP.

## 1. Enable Firebase services

Open https://console.firebase.google.com/project/travelvacationsadventure-1ec6d/overview .

1. Select project `travelvacationsadventure-1ec6d` and enable the Blaze plan.
2. Authentication → Sign-in method → enable **Email/Password**.
3. Authentication → Users → **Add user**. Enter your chosen email and password.
4. Authentication → Settings → Authorized domains: ensure `travelvacationsadventure-1ec6d.web.app` and any custom domain are listed.
5. Realtime Database: create/confirm the default database at `https://travelvacationsadventure-1ec6d-default-rtdb.firebaseio.com`. Use locked rules initially. This project uses the `travelJournal` node.
6. Storage: initialize the default bucket `travelvacationsadventure-1ec6d.firebasestorage.app`.

The supplied database rules deny direct browser reads/writes; the backend handles posts and keeps drafts private. Storage permits image uploads by administrator accounts. If your Firebase project also powers unrelated apps, merge their existing database/storage rules with these rules before deployment instead of replacing their rules blindly.

## 2. Install the project

Install Node.js **22 LTS** and Google Cloud CLI on your computer. Extract this ZIP, open a terminal inside `srilanka-main`, then run:

```sh
npm install
npm ci --prefix functions
npx firebase login
```

Use the Google account that owns or administers your Firebase project.

## 3. Grant your account administrator access once

This is a one-time account setup, not another code to enter at login. It prevents someone who creates an ordinary Firebase user from editing your website.

```sh
gcloud auth application-default login
gcloud auth application-default set-quota-project travelvacationsadventure-1ec6d
npm run admin -- your-email@example.com
```

Replace `your-email@example.com` with the user you created in Firebase Authentication. The script only adds an `admin` claim to that existing user and preserves other claims. You need Firebase Authentication administration permissions and permission to use the quota project. Use your project owner account if uncertain. No service-account JSON key needs to be copied into this website.

Create more users in Firebase and run the same command for each user you want to make an administrator. All admin users have full editorial access. If already signed in, sign out and back in after granting the role.

## 4. Deploy

```sh
npm test
npm run deploy
```

The deploy command builds the static assets and deploys the backend, Hosting, database rules, and Storage rules. Accept Firebase's required API provisioning prompts. If asked about artifact cleanup, choose a retention period appropriate for your project. Deployment may take several minutes.

After a successful deployment:

- Website: https://travelvacationsadventure-1ec6d.web.app/
- Journal: https://travelvacationsadventure-1ec6d.web.app/blog/
- Admin: https://travelvacationsadventure-1ec6d.web.app/admin/
- Sitemap: https://travelvacationsadventure-1ec6d.web.app/sitemap.xml

These are the expected deployment URLs, not a claim that they are live already.

## 5. Publish your first story

1. Open `/admin/` and sign in using only your email and password.
2. Choose **Create story**.
3. Add a title, short introduction, article text, category, author, and date.
4. Upload a cover image and describe it in the alt text field. The toolbar can upload inline images; these are appended to the article.
5. Review the SEO fields and preview.
6. Choose **Save draft** or **Publish story**. Drafts are not visible on the public site.
7. Use **Edit** to change existing articles. **Unpublish to draft** removes a live article from public pages. The delete action asks for confirmation and permanently removes the article.

Publication dates do not schedule future publishing: future-dated stories must remain drafts. The URL slug becomes fixed after the first save so existing links continue working. You may change the title without changing the URL. If another editor saves the same story first, reload it before saving your changes; conflicts are rejected rather than silently overwriting someone else's work.

For predictable formatting, pasted text is inserted as plain text. Format it using the toolbar. New images are publicly readable, including images uploaded for a draft; avoid uploading confidential media. Removing a cover or deleting a post does not delete its uploaded image because other posts may use it. Remove unused files in Firebase Storage when appropriate.

**Export posts** downloads a JSON backup. It does not export uploaded image bytes and is not a one-click restore/import feature. Keep copies of your original photos and use Firebase's backup facilities as needed.

## Custom domain and SEO

The default canonical origin is `https://travelvacationsadventure-1ec6d.web.app`.

For a custom domain:

1. Connect it in Firebase Hosting and authorize it in Authentication.
2. Create `functions/.env.travelvacationsadventure-1ec6d` containing `SITE_URL=https://yourdomain.com` (no trailing slash).
3. Update the origin replacement in `scripts/prepare.mjs` for the static About page.
4. Redeploy, then submit the sitemap through Google Search Console.

Legacy `/blog/article-slug.html`, `/blog/post.html?post=article-slug`, `/blog/index.html`, and `/blog.html` routes redirect to the current journal URLs on Firebase Hosting. Redirects from the old GitHub Pages domain require changes at that old host and have not been deployed here.

SEO fields and server-rendered content support crawling and sharing; indexing or ranking is not guaranteed. The homepage retains analytics with your supplied measurement ID. The admin does not collect Analytics events. Some browser features rely on external Firebase SDK and font CDNs; fonts have local fallbacks.

## Troubleshooting

- **Admin access is not enabled:** finish step 3, then sign out and back in.
- **Invalid credential:** use an email/password user from this Firebase project.
- **Operation not allowed:** enable the Email/Password provider.
- **Image upload denied:** check the admin claim, Storage rules, bucket initialization, and Blaze plan.
- **Server unavailable:** confirm Functions deployed successfully; inspect `npx firebase functions:log --only journal`.
- **Database permission error in backend:** confirm the runtime service account has access to this project's Realtime Database.
- **Old articles still showing:** deploy with `npm run deploy`; do not deploy the old static root files or run the original static-blog build commands.
- **SDK failed to load:** check your connection and any browser/CDN blockers.

## Project map

- `admin/`: complete admin UI, Firebase configuration, and browser logic.
- `functions/`: authenticated post API, HTML rendering, validation, original-post seed, and locked dependency manifest.
- `scripts/prepare.mjs`: builds Hosting assets and original article seed.
- `scripts/set-admin.cjs`: grants the admin role to a Firebase user you already created.
- `firebase.json`, `.firebaserc`, `database.rules.json`, `storage.rules`: Firebase deployment configuration.
- `tests/`: backend verification; see `VALIDATION.md` for tested scope and limitations.
- `public/`: generated Hosting assets. Do not edit directly; edit the source and rebuild.
- Existing `blog/`, `index.html`, `images/`, and `assets/`: preserved source material.

Firebase reference documentation: https://firebase.google.com/docs/auth/web/password-auth , https://firebase.google.com/docs/auth/admin/custom-claims , https://firebase.google.com/docs/storage/web/upload-files .
