import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(root, '_site');
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output);
const copy = file => fs.cpSync(path.join(root, file), path.join(output, file), { recursive: true });
for (const file of ['index.html', 'about.html', '404.html', 'blog.html', 'sitemap.xml', 'robots.txt', '.nojekyll', 'assets', 'images']) copy(file);
for (const file of fs.readdirSync(root)) {
  if (/^google[a-z0-9]+\.html$/.test(file)) copy(file);
}
fs.mkdirSync(path.join(output, 'blog'));
for (const file of fs.readdirSync(path.join(root, 'blog'))) {
  if (!file.endsWith('.html') || file === '_template.html') continue;
  const html = fs.readFileSync(path.join(root, 'blog', file), 'utf8');
  const meta = html.match(/<!-- POST-META\s*([\s\S]*?)-->/);
  if (meta && JSON.parse(meta[1]).draft === true) continue;
  copy('blog/' + file);
}
console.log('Website files ready in _site/.');
