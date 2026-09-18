SIMPLE BLOG — EDIT ONE FILE

SETUP
Replace your website's blog folder with this blog folder. Delete the old
page-2.html if your upload only overwrites files. Open /blog/ on your website.
Keep your existing assets/ and images/ folders alongside blog/.
These assets were not included in the uploaded ZIP; this folder uses them.
All 11 existing articles are included. There is no pagination.

ADD A POST
Open blog/posts.js. Paste this object immediately below window.BLOG_POSTS = [.
Replace the example text, save, and upload posts.js. The new story appears
in the blog listing and has its own reading page automatically.
No new folder, HTML page, or listing card is needed.

  {
    slug: "my-new-sri-lanka-story",
    title: "My New Sri Lanka Story",
    description: "A short introduction to the story.",
    category: "Travel planning",
    author: "Travel Vacation Adventure",
    date: "2026-09-18",
    image: "images/coast.jpg",
    imageAlt: "The Sri Lankan coast",
    draft: false,
    content: `
<p>Paste your opening paragraph here.</p>
<h2>Your first heading</h2>
<p>Paste the rest of your post here.</p>
`
  },

Use a unique slug for each post. Keep the comma after the closing brace.
The content field contains HTML paragraphs and headings, not a full HTML page.
Inside content, escape any backtick as \` and any literal ${ as \${.
Only add HTML you trust. Set draft: true to hide a post.
Change existing posts only in posts.js. The other files are automatic templates.

Post link: post.html?post=my-new-sri-lanka-story
The old article filenames still work for existing links.
Posts are sorted newest first; all appear on one blog listing.

This is a static, JavaScript-rendered blog and needs JavaScript enabled.
No PHP, database, installation, or build command is required.
Search engines/social preview services that do not run JavaScript may not
see the new article content or metadata. Use a static-site build if fully
pre-rendered article SEO is required.
The main website's homepage and sitemap are outside this uploaded folder
and are not automatically updated by this code.
