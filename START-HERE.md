# Install this updated version

This archive contains the complete website because automatic publishing needs the root build files and GitHub workflow as well as the blog folder.

1. Back up your current repository.
2. DELETE the existing `blog/` folder in your repository, then add the replacement `blog/` from this package. Merging folders alone will leave the unwanted old posts behind.
3. Upload the other supplied files to the repository root, including `.github/workflows/deploy.yml`, `templates/`, `build.mjs`, `prepare-publish.mjs`, `index.html` and `site.config.json`. Do not upload the ZIP or its outer `updated-website` folder.
4. Use Settings > Pages > Source > GitHub Actions. Commit to `main` (or update the workflow branch setting). Run the workflow from Actions once after setup.

The blog now has nine articles: the two supplied Canada/Germany HTML articles and seven converted document articles. New articles are dated 2026-09-16; change their POST-META dates if needed. Equal dates sort alphabetically by filename.

Your Malaysia keyword links were added where the supplied phrases appear naturally in the new articles. The France article retains its original subject, with a separately labelled Malaysia resource paragraph. Article URLs are listed in ARTICLE-URLS.md. No live website was changed.

For future posts, copy `post-template.html` into `blog/your-title.html`, fill in its metadata and article text, and commit. There is no need to edit page 1, page 2, the homepage, or any listing file. Pagination is generated automatically.

---

# Automatic blog publishing

Your homepage displays the three newest published articles, sorted by the date in POST-META (newest first). All published articles, including those three, appear in Blog with six per page. Older articles keep the same URLs; nothing needs to move. Articles with the same date are sorted by filename.

## One-time GitHub setup

1. Back up your current repository. Extract this ZIP and upload the CONTENTS of updated-website to your existing srilanka repository's root. Do not upload the ZIP or nest the folder inside the repository.
2. Include `.github/workflows/deploy.yml`, `templates/home.html`, `build.mjs`, `prepare-publish.mjs`, and the other supplied website files. If a web upload leaves out `.github`, use GitHub's Add file > Create new file and enter `.github/workflows/deploy.yml`, then paste the included workflow contents.
3. In the repository, select Settings > Pages > Build and deployment > Source > GitHub Actions.
4. The workflow watches `main`. If your publishing branch has a different name, change `branches: [main]` in `.github/workflows/deploy.yml` to that name.
5. In Actions, open Build and publish website and choose Run workflow on your publishing branch. After initial setup, a commit to that branch runs it automatically. If you have another Pages deployment workflow, disable that competing workflow so only this one publishes.
6. Wait for the workflow to succeed, then visit https://travelvacationsadventure.github.io/srilanka/ .

The URL in site.config.json now matches your screenshot (/srilanka/). Change that setting if you deploy elsewhere. GitHub documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Each new post: add one file

1. Copy `post-template.html` to `blog/your-new-post.html`. No new folder is needed. In GitHub's editor you can instead create that filename and paste the template contents.
2. Change the POST-META title, description, category, author, date, image and imageAlt. Use a real YYYY-MM-DD publication date and keep `"draft": false`. Newest means newest publication date, not most recently uploaded. Dates in the future are not scheduled: a non-draft post publishes on the next build.
3. Write your HTML between ARTICLE-CONTENT-START and ARTICLE-CONTENT-END. Use paragraphs and h2/h3 headings. The title, navigation, article layout and related stories are generated for you.
4. Commit the file to your publishing branch. If using a new image, upload it to images/ in the same commit, or upload it before the article. You can reuse an existing image without uploading anything else.
5. Wait for the Actions workflow to finish. Your new post appears automatically; the homepage keeps only the latest three. All posts remain accessible in Blog.

You do not edit index.html or blog/index.html when publishing. GitHub runs the updater for you. Generated files are deployed directly; GitHub does not commit the rebuilt HTML back to your source branch. The website updates even though the source index.html can still show its previous cards.

## Editing and removing articles

Edit the metadata and content markers in the article file, then commit. Keep the filename stable to keep its URL. An optional `"updated": "YYYY-MM-DD"` field records revisions without changing the publication sort order. Delete an article file and commit to remove it from the next deployment. Pagination and sitemap rebuild automatically.

Set `"draft": true` to omit a post from the deployed site and listings. Files committed to a public repository are still visible in that repository. Use the root `post-template.html` for each new article.

## Local preview (optional)

With Node.js installed, run `node build.mjs` or double-click UPDATE-BLOG.cmd on Windows. Then open index.html. Local builds generate draft pages for preview. The GitHub deployment runs `node prepare-publish.mjs` after building, which excludes drafts, templates and build scripts from the published files.

## Design and settings

- `templates/home.html`: homepage design, hero, analytics and verification tag. Keep the LATEST_POSTS, DESTINATION_LINKS and SITE_URL placeholders intact. Edit this template for lasting homepage changes.
- `assets/site.css`: shared styling.
- `build.mjs`: shared article and Blog layout.
- `site.config.json`: site URL, name and postsPerPage (Blog page size; homepage stays at three).
- `post-template.html`: short template for the next article.

If Actions fails, read the failing build step. Missing images, malformed JSON or invalid dates stop publication; correct the article and commit again. This ZIP has been tested locally but has not been deployed to your GitHub account.
