import fs from 'node:fs';
import vm from 'node:vm';
const ctx = {window:{}};
vm.runInNewContext(fs.readFileSync('blog/posts.js','utf8'),ctx);
// Preserve the standalone article that was not included in the old posts array.
const italySlug='how-to-find-a-reliable-sri-lanka-travel-agency-in-italy-for-my-holiday';
const italy=fs.readFileSync('blog/'+italySlug+'.html','utf8');
const metadata=JSON.parse(italy.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]).find(x=>x['@type']==='BlogPosting');
if(!ctx.window.BLOG_POSTS.some(p=>p.slug===italySlug))ctx.window.BLOG_POSTS.push({slug:italySlug,title:metadata.headline,description:metadata.description,date:metadata.datePublished.slice(0,10),author:'Travel Vacation Adventure',category:'Travel planning',image:'images/coast.jpg',imageAlt:'Palm trees on the Sri Lankan coast',draft:false,content:italy.match(/<div class="post-content">([\s\S]*?)<\/div>\s*<\/article>/)[1]});
fs.writeFileSync('functions/seed.json',JSON.stringify(ctx.window.BLOG_POSTS.map(p=>({...p,status:p.draft?'draft':'published',revision:1,seoTitle:p.title,seoDescription:p.description,tags:[],updatedAt:p.date+'T12:00:00.000Z',image:'/'+p.image})),null,2));
fs.copyFileSync('index.html','functions/home.html');
fs.rmSync('public',{recursive:true,force:true});fs.mkdirSync('public');
for(const item of ['assets','images','admin','about.html','404.html','googleaface38e6420deef.html']) fs.cpSync(item,'public/'+item,{recursive:true});
// Dynamic routes must not have static files that shadow Hosting rewrites.
let about=fs.readFileSync('public/about.html','utf8').replaceAll('https://travelvacationsadventure.github.io/srilanka/','https://travelvacationsadventure-1ec6d.web.app/').replaceAll('G-798Z595DQE','G-RS0LR52536');
fs.writeFileSync('public/about.html',about);
console.log('Built Hosting files and preserved '+ctx.window.BLOG_POSTS.length+' original posts.');
